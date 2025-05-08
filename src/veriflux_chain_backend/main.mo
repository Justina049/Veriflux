import Array "mo:base/Array";
import Time "mo:base/Time";
import Text "mo:base/Text";
import Int "mo:base/Int";
import Principal "mo:base/Principal";
import CertifiedData "mo:base/CertifiedData";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Debug "mo:base/Debug";
import Blob "mo:base/Blob";
import Sha256 "mo:sha2/Sha256";
import Nat8 "mo:base/Nat8";
import Error "mo:base/Error";
import CertTree "mo:ic-certification/CertTree";



// Define the actor
actor CertificateManager {
    private stable var authorizedIssuers: [Principal] = [
        Principal.fromText("4sxcy-uffsq-raca2-u5fdh-6u5tg-yz6bl-jgtns-eoctr-u6wen-svor7-xae")
    ];
    private stable var adminPrincipal: Principal = Principal.fromText("4sxcy-uffsq-raca2-u5fdh-6u5tg-yz6bl-jgtns-eoctr-u6wen-svor7-xae");
    
    private var certificatesEntries: [(Text, CertificateOld)] = [];
    private var certificates = HashMap.HashMap<Text, Certificate>(10, Text.equal, Text.hash);
    
    // Add certified data store
    stable let cert_store : CertTree.Store = CertTree.newStore();
    let ct = CertTree.Ops(cert_store);
    
    // Old Certificate Type (used before upgrade)
    type CertificateOld = {
        issuer: Text;
        recipient: Text;
        program: Text;
        issuedAt: Int;
        hash: Text;
    };

    // New Certificate Type (includes status)
    type Certificate = {
        issuer: Text;
        recipient: Text;
        program: Text;
        issuedAt: Int;
        hash: Text;
        status: Text;
    };
    

    // Preserve old certificates before upgrade
    system func preupgrade() {
        certificatesEntries := Iter.toArray(certificates.entries());
    };

    // Migrate old certificates to the new format after upgrade
    system func postupgrade() {
        let migratedCerts = HashMap.HashMap<Text, Certificate>(10, Text.equal, Text.hash);
    
        for ((key, oldCert) in certificatesEntries.vals()) {
            let newCert: Certificate = {
                issuer = oldCert.issuer;
                recipient = oldCert.recipient;
                program = oldCert.program;
                issuedAt = oldCert.issuedAt;
                hash = oldCert.hash;
                status = "Valid"; // New field added in migration
            };
            migratedCerts.put(key, newCert);
        };
        
        certificates := migratedCerts;
        certificatesEntries := [];
        
        // Also add to certification tree
        for ((key, cert) in migratedCerts.entries()) {
            let path : [Blob] = [Text.encodeUtf8("certificates"), Text.encodeUtf8(key)];
            let certBlob = to_candid(cert);
            ct.put(path, certBlob);
        };

        // Update certified data after migration
        ct.setCertifiedData();
    };

    public query func getAdminStats(): async {
        totalCertificates: Nat;
        totalIssuers: Nat;
        certificatesByStatus: [(Text, Nat)];
    } {
        let totalCertificates = certificates.size();
        let totalIssuers = Array.size(authorizedIssuers);
        
        let statusCount = HashMap.HashMap<Text, Nat>(3, Text.equal, Text.hash);
        
        for ((_, cert) in certificates.entries()) {
            let count = switch (statusCount.get(cert.status)) {
                case (?existing) { existing + 1 };
                case (null) { 1 };
            };
            statusCount.put(cert.status, count);
        };
        
        let certificatesByStatus = Iter.toArray(statusCount.entries());
        
        return {
            totalCertificates = totalCertificates;
            totalIssuers = totalIssuers;
            certificatesByStatus = certificatesByStatus;
        };
    };
    
    // Add an authorized issuer (Admin Only)
    public shared (msg) func addAuthorizedIssuer(issuer: Principal): async Text {
        // Input Validation
        if (Principal.isAnonymous(issuer)) {
            throw Error.reject("Error: Invalid issuer principal");
        };

        // check if the caller is the admin
        if (msg.caller != adminPrincipal) {
            return "Error: Only admin can add authorized issuers";
        };

        // check if the issuer already exist
        if (Array.find(authorizedIssuers, func(p: Principal): Bool { p == issuer }) != null) {
            return "Error: Issuer already exists";
        };

        // Add the new issuer
        authorizedIssuers := Array.append(authorizedIssuers, [issuer]);

        //  Log the action
        Debug.print("New authorized issuer added: " # Principal.toText(issuer));
        return "New authorized issuer added successfully";
    };

    // Add a new admin (Admin Only)
    public shared (msg) func addAdmin(newAdmin: Principal): async Text {
        if (msg.caller != adminPrincipal and Array.find(authorizedIssuers, func(p: Principal): Bool { p == msg.caller }) == null) {
            return "Error: Only admin or authorized issuers can add new admins";
        };
        authorizedIssuers := Array.append(authorizedIssuers, [newAdmin]);
        Debug.print("New admin added: " # Principal.toText(newAdmin));
        return "New admin added successfully";
    };

    // Old Function (kept for backward compatibility)
    public func createCertificate(issuer: Text, recipient: Text, course: Text): async CertificateOld {
    // Input Validation 
    if (Text.size(issuer) == 0 or Text.size(recipient) == 0 or Text.size(course) == 0) {
        throw Error.reject("Error: All fields must be non-empty");
    };

    let issuedAt = Time.now();
    
    let hashInput = issuer # recipient # course # Int.toText(issuedAt);
    let hashBlob = Text.encodeUtf8(hashInput);
    let hash = Sha256.fromBlob(#sha256, hashBlob);
    let hashHex = blobToHex(hash);

    let certOld: CertificateOld = {
        issuer = issuer;
        recipient = recipient;
        program = course;
        issuedAt = issuedAt;
        hash = hashHex;
    };

    // Store as the new certificate format internally
    let certNew: Certificate = {
        issuer = issuer;
        recipient = recipient;
        program = course;
        issuedAt = issuedAt;
        hash = hashHex;
        status = "Valid"; // New field added
    };

    certificates.put(hashHex, certNew);

    // Add to certified tree for seecure verification
    let path : [Blob] = [Text.encodeUtf8("certificates"), Text.encodeUtf8(hashHex)];
    let certBlob = to_candid(certNew);
    ct.put(path, certBlob);
    ct.setCertifiedData();

    return certOld;  // Returning old type to prevent breaking frontend
    };




    // New Function (Future usage)
    public func issueCertificate(issuer: Text, recipient: Text, program: Text, issuedAt: Int): async Certificate {
        // Input Validation
        if (Text.size(issuer) == 0 or Text.size(recipient) == 0 or Text.size(program) == 0) {
            throw Error.reject("Error: All text fields must be non-empty");
        };
        if (issuedAt <=0) {
            throw Error.reject("Error: Invalid issueAt timestamp");
        };

        let hashInput = issuer # recipient # program # Int.toText(issuedAt);
        let hashBlob = Text.encodeUtf8(hashInput);
        let hash = Sha256.fromBlob(#sha256, hashBlob);
        let hashHex = blobToHex(hash);

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

    // Helper function to convert Blob to Hex String
    private func blobToHex(blob: Blob): Text {
        let hex = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
        var result = "";
        for (byte in Blob.toArray(blob).vals()) {
            result #= hex[Nat8.toNat(byte) / 16] # hex[Nat8.toNat(byte) % 16];
        }; 
        result
    };

   
    // Verify a certificate by hash
    public query func verifyCertificate(hash: Text): async {
        certificate: ?Certificate;
        certified: Bool;
        certificate_blob: Blob;
        witness : Blob;
        valid: Bool;
        status: Text;
        
    } {
        if (Text.size(hash) == 0) {
            throw Error.reject("Error: Hash cannot be empty");
        };

        let certificate = certificates.get(hash);
        let path : [Blob] = [Text.encodeUtf8("certificates"), Text.encodeUtf8(hash)];
        

        let certificate_blob = switch (ct.lookup(path)) {
            case (null) { 
                // If not in tree, try to serialize from HashMap
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

    return {
        certificate = certificate; // now of type ?Certificate as expected
        certified = certified;
        certificate_blob = certificate_blob;
        witness = witness;
        valid = valid;
        status = switch (certificate) {
            case (null) { "Invalid" };
            case (?cert) { cert.status };
        };
    };
 
    };

    // List all certificates
    public query func listCertificates(): async [Certificate] {
        return Iter.toArray(certificates.vals());
    };
};




