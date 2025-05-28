import Array "mo:base/Array";
import Time "mo:base/Time";
import Text "mo:base/Text";
import Int "mo:base/Int";
import Principal "mo:base/Principal";
import CertifiedData "mo:base/CertifiedData";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
// import Debug "mo:base/Debug";
import Blob "mo:base/Blob";
import Sha256 "mo:sha2/Sha256";
import Nat8 "mo:base/Nat8";
import Error "mo:base/Error";
import CertTree "mo:ic-certification/CertTree";

// Define the actor as an actor class to capture the initializer
shared({ caller = owner }) actor class CertificateManager() {
    let admin = owner;

    // ======== Certificate Types ========
    type CertificateOld = {
        issuer: Text;
        recipient: Text;
        program: Text;
        issuedAt: Int;
        hash: Text;
    };

    type Certificate = {
        issuer: Text;
        recipient: Text;
        program: Text;
        issuedAt: Int;
        hash: Text;
        status: Text;
    };

    // --- User Types ---
    type Role = { #issuer; #verifier; #admin; #viewer };
    type Plan = { #free; #basic; #standard; #premium };
    type Status = { #pending; #approved; #rejected };

    type User = {
        principal: Principal;
        role: ?Role;
        plan: ?Plan;
        status: ?Status;
    };

    // --- Stable storage for upgrade ---
    stable var userEntries : [(Principal, User)] = [];
    stable var certificatesEntries: [(Text, CertificateOld)] = [];

    // --- In-memory HashMaps ---
    let users = HashMap.HashMap<Principal, User>(10, Principal.equal, Principal.hash);
    var certificates = HashMap.HashMap<Text, Certificate>(10, Text.equal, Text.hash);

    // --- Auto-register the owner as admin on canister init ---
    users.put(admin, {
        principal = admin;
        role = ?#admin;
        plan = null;
        status = null;
    });

    // --- Upgrade hooks ---
    system func preupgrade() {
        userEntries := Iter.toArray(users.entries());
        certificatesEntries := Iter.toArray(certificates.entries());
    };

    system func postupgrade() {
        // Restore users
        for ((p, u) in userEntries.vals()) {
            users.put(p, u);
        };
        userEntries := [];

        // Migrate old certificates to new format
        var migratedCerts = HashMap.HashMap<Text, Certificate>(10, Text.equal, Text.hash);
        for ((key, oldCert) in certificatesEntries.vals()) {
            let newCert: Certificate = {
                issuer = oldCert.issuer;
                recipient = oldCert.recipient;
                program = oldCert.program;
                issuedAt = oldCert.issuedAt;
                hash = oldCert.hash;
                status = "Valid";
            };
            migratedCerts.put(key, newCert);
        };
        certificates := migratedCerts;
        certificatesEntries := [];
        // Optionally, update the certification tree here as well
    };

    // --- Register a New User ---
    public shared (msg) func registerUser(): async Text {
        let p = msg.caller;
        if (users.get(p) != null) {
            return "User already registered";
        };
        let newUser: User = {
            principal = p;
            role = null;
            plan = null;
            status = null;
        };
        users.put(p, newUser);
        return "User registered";
    };

    // --- Get a User's Details ---
    public query func getUser(p: Principal): async ?User {
        return users.get(p);
    };

    // --- Update Role (auto-set status) ---
    // Only the user themselves or the admin can update the role
    public shared (msg) func updateUserRole(p: Principal, r: Role): async Text {
        switch (users.get(p)) {
            case null { return "User not found"; };
            case (?user) {
                // Only allow the user or the admin to update
                if (msg.caller != p and not isAdmin(msg.caller)) {
                    return "Unauthorized";
                };
                // Only the owner can be admin
                if (r == #admin and p != admin) {
                    return "Only the owner can be admin";
                };
                let newStatus : Status = switch r {
                    case (#issuer) #pending;
                    case (#verifier) #approved;
                    case (#admin) switch (user.status) { case null #pending; case (?s) s; };
                    case (#viewer) #approved;
                };





                users.put(p, {
                    principal = user.principal;
                    role = ?r;
                    plan = user.plan;
                    status = ?newStatus;
                });
                return "Role updated";
            };
        };
    };

    // --- Update Plan ---
    // Only the user themselves or the admin can update the plan
    public shared (msg) func updateUserPlan(p: Principal, plan: Plan): async Text {
        switch (users.get(p)) {
            case null { return "User not found"; };
            case (?user) {
                if (msg.caller != p and not isAdmin(msg.caller)) {
                    return "Unauthorized";
                };
                users.put(p, {
                    principal = user.principal;
                    role = user.role;
                    plan = ?plan;
                    status = user.status;
                });
                return "Plan updated";
            };
        };
    };

    // --- Approve Issuer ---
    // Only the admin can approve an issuer
    public shared (msg) func approveIssuer(p: Principal): async Text {
        switch (users.get(p)) {
            case null { return "User not found"; };
            case (?user) {
                if (not isAdmin(msg.caller)) {
                    return "Unauthorized";
                };
                if (user.role == ?#issuer) {
                    users.put(p, {
                        principal = user.principal;
                        role = user.role;
                        plan = user.plan;
                        status = ?#approved;
                    });
                    return "Issuer approved";
                } else return "Not an issuer";
            };
        };
    };

    // --- Helper: Check if a principal is the admin (owner) ---
    func isAdmin(p: Principal): Bool {
        p == admin
    };

    // ======== Certificate Storage ========

    // ======== Certified Data ========
    stable let cert_store : CertTree.Store = CertTree.newStore();
    let ct = CertTree.Ops(cert_store);

    // // Old Function (kept for backward compatibility)
    // public shared(msg) func createCertificate(issuer: Text, recipient: Text, course: Text): async CertificateOld {
    //     // Input Validation
    //     if (Text.size(issuer) == 0 or Text.size(recipient) == 0 or Text.size(course) == 0) {
    //         throw Error.reject("Error: All fields must be non-empty");
    //     };

    //     let issuedAt = Time.now();
    //     let hashInput = issuer # recipient # course # Int.toText(issuedAt);
    //     let hashBlob = Text.encodeUtf8(hashInput);
    //     let hash = Sha256.fromBlob(#sha256, hashBlob);
    //     let hashHex = blobToHex(hash);

    //     let certOld: CertificateOld = {
    //         issuer = issuer;
    //         recipient = recipient;
    //         program = course;
    //         issuedAt = issuedAt;
    //         hash = hashHex;
    //     };

    //     // Store as the new certificate format internally
    //     let certNew: Certificate = {
    //         issuer = issuer;
    //         recipient = recipient;
    //         program = course;
    //         issuedAt = issuedAt;
    //         hash = hashHex;
    //         status = "Valid"; // New field added
    //     };

    //     certificates.put(hashHex, certNew);

    //     // Add to certified tree for secure verification
    //     let path : [Blob] = [Text.encodeUtf8("certificates"), Text.encodeUtf8(hashHex)];
    //     let certBlob = to_candid(certNew);
    //     ct.put(path, certBlob);
    //     ct.setCertifiedData();

    //     return certOld;  // Returning old type to prevent breaking frontend
    // };


        func normalize(text: Text): Text {
        Text.toLowercase(Text.trim(text, #char ' '))
    };

    // Helper function to convert Blob to Hex String
    private func blobToHex(blob: Blob): Text {
        let hex = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
        var result = "";
        for (byte in Blob.toArray(blob).vals()) {
            result #= hex[Nat8.toNat(byte) / 16] # hex[Nat8.toNat(byte) % 16];
        };
        result
    };

    // New Function (Future usage)
    public shared(msg) func issueCertificate(issuer: Text, recipient: Text, program: Text): async Certificate {
        // Normalize inputs
        let normIssuer = normalize(issuer);
        let normRecipient = normalize(recipient);
        let normProgram = normalize(program);

        // Input Validation
        if (Text.size(normIssuer) == 0 or Text.size(normRecipient) == 0 or Text.size(normProgram) == 0) {
            throw Error.reject("Error: All text fields must be non-empty");
        };

        let dedupInput = normIssuer # normRecipient # normProgram;
        let hashBlob = Text.encodeUtf8(dedupInput);
        let hash = Sha256.fromBlob(#sha256, hashBlob);
        let hashHex = blobToHex(hash);

        if (certificates.get(hashHex) != null) {
        throw Error.reject("Duplicate certificate: A certificate with these details already exists.");
        };

        let issuedAt = Time.now();

        // let hashInput = issuer # recipient # program # Int.toText(issuedAt);
        // let hashBlob = Text.encodeUtf8(hashInput);
        // let hash = Sha256.fromBlob(#sha256, hashBlob);
        // let hashHex = blobToHex(hash);

        
        let cert: Certificate = {
            issuer = issuer;   
            recipient = recipient;
            program = program;
            issuedAt = issuedAt;
            hash = hashHex;
            status = "Valid";
        };

        certificates.put(hashHex, cert);

        // Add to certified tree for secure verification
        let path : [Blob] = [Text.encodeUtf8("certificates"), Text.encodeUtf8(hashHex)];
        let certBlob = to_candid(cert);
        ct.put(path, certBlob);
        ct.setCertifiedData();

        return cert;
    };

    

    // Verify a certificate by hash
    public query func verifyCertificate(hash: Text) : async {
        certificate: ?Certificate;
        certified: Bool;
        certificate_blob: Blob;
        witness: Blob;
        valid: Bool;
        status: Text;
    } {
        if (Text.size(hash) == 0) {
            throw Error.reject("Error: Hash cannot be empty");
        };

        let certificate = certificates.get(hash);
        let path: [Blob] = [Text.encodeUtf8("certificates"), Text.encodeUtf8(hash)];

        let certificate_blob = switch (ct.lookup(path)) {
            case (null) {
                switch (certificate) {
                    case (null) { Blob.fromArray([]) };
                    case (?cert) { to_candid(cert) };
                }
            };
            case (?blob) { blob };
        };

        let witness = ct.encodeWitness(ct.reveal(path));
        let certified = CertifiedData.getCertificate() != null;

        let valid = switch (certificate) {
            case (null) { false };
            case (?cert) {
                certified and cert.status == "Valid"
            };
        };

        let status = switch (certificate) {
            case (null) { "Invalid" };
            case (?cert) { cert.status };
        };

        return {
            certificate = certificate;
            certified = certified;
            certificate_blob = certificate_blob;
            witness = witness;
            valid = valid;
            status = status;
        };
    };

    // List all certificates
    public query func listCertificates(): async [Certificate] {
        return Iter.toArray(certificates.vals());
    }; 
}