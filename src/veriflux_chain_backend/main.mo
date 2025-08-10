// import Array "mo:base/Array";
// import Time "mo:base/Time";
import Text "mo:base/Text";
import Int "mo:base/Int";
import Principal "mo:base/Principal";
import CertifiedData "mo:base/CertifiedData";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Blob "mo:base/Blob";
// import Sha256 "mo:sha2/Sha256";
// import Nat8 "mo:base/Nat8";
import Error "mo:base/Error";
import CertTree "mo:ic-certification/CertTree";

// Define the actor as an actor class to capture the initializer
persistent actor CertificateManager {

    transient var admin : Principal = Principal.fromActor(CertificateManager); // ✅ Works

    // ======== Certificate Types ========
      type CertificateOld = {
        issuer: Text;
        recipient: Text;
        program: Text;
        issuedAt: Int;
        hash: Text;
    };
  // other restoration logic...

    type Certificate = {
        issuer: Text;
        recipient: Text;
        email: Text; 
        program: Text;
        issuedAt: Int;
        hash: Text;
        status: Text;
        nft: ?Blob; // Added field for NFT representation
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
    transient let users = HashMap.HashMap<Principal, User>(10, Principal.equal, Principal.hash);
    transient var certificates = HashMap.HashMap<Text, Certificate>(10, Text.equal, Text.hash);
    
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
                email = "";
                nft = null; // Initialize NFT field
            };
            migratedCerts.put(key, newCert);
        };
        certificates := migratedCerts;
        certificatesEntries := [];
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
    public shared (msg) func updateUserRole(p: Principal, r: Role): async Text {
        switch (users.get(p)) {
            case null { return "User not found"; };
            case (?user) {
                if (msg.caller != p and not isAdmin(msg.caller)) {
                    return "Unauthorized";
                };
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
    transient let ct = CertTree.Ops(cert_store);

    // New Function to upload a scanned copy of a certificate and mint it as an NFT
    public shared (msg) func uploadCertificateNFT(hash: Text, scannedCopy: Blob): async Text {
        let p = msg.caller;

        // Check if the user is an issuer or admin
        switch (users.get(p)) {
            case null { return "User not found"; };
            case (?user) {
                if (user.role != ?#issuer and not isAdmin(p)) {
                    return "Unauthorized: Only issuers or admins can upload certificates";
                };
            };
        };

        // Check if the certificate exists
        switch (certificates.get(hash)) {
            case null { return "Certificate not found"; };
            case (?cert) {
                // Update the certificate with the scanned copy as NFT
                certificates.put(hash, {
                    issuer = cert.issuer;
                    recipient = cert.recipient;
                    email = cert.email;
                    program = cert.program;
                    issuedAt = cert.issuedAt;
                    hash = cert.hash;
                    status = cert.status;
                    nft = ?scannedCopy; // Store the scanned copy as NFT
                });
                return "NFT minted successfully";
            };
        };
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