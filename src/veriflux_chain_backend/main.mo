// import Array "mo:base/Array";
// import Time "mo:base/Time";
// import Text "mo:base/Text";
// import Int "mo:base/Int";
// import Principal "mo:base/Principal";
// import CertifiedData "mo:base/CertifiedData";
// import HashMap "mo:base/HashMap";
// import Iter "mo:base/Iter";
// import Debug "mo:base/Debug";
// import Blob "mo:base/Blob";
// import Sha256 "mo:sha2/Sha256";
// import Nat8 "mo:base/Nat8";
// import Error "mo:base/Error";
// import CertTree "mo:ic-certification/CertTree";



// // Define the actor
// actor CertificateManager {

//     // ======== Certificate Types ========

//     // Old Certificate Type (used before upgrade)
//     type CertificateOld = {
//         issuer: Text;
//         recipient: Text;
//         program: Text;
//         issuedAt: Int;
//         hash: Text;
//     };

//     // New Certificate Type (includes status)
//     type Certificate = {
//         issuer: Text;
//         recipient: Text;
//         program: Text;
//         issuedAt: Int;
//         hash: Text;
//         status: Text;
//     };


//     // ======== Role-Based Access Control ========

//     // Role enum
//     public type Role = {
//         #Admin;
//         #Issuer;
//         #Viewer;
//         #Verifier;
//     };

    

//     // ======== Certificate Storage ========

//     // Old certificate entries list (if needed)
//     private var certificatesEntries: [(Text, CertificateOld)] = [];

//     // New certificate map
//     private var certificates = HashMap.HashMap<Text, Certificate>(10, Text.equal, Text.hash);


//     // ======== Certified Data ========

//     stable let cert_store : CertTree.Store = CertTree.newStore();
//     let ct = CertTree.Ops(cert_store);


//     private var roleMap = HashMap.HashMap<Principal, Role>(10, Principal.equal, Principal.hash);

//     private stable let defaultAdmin: Principal = Principal.fromText("yipb2-x4tqh-gorql-bfmzd-ci5ky-koed3-qodsq-y46q5-yq5mv-jtedc-nae");

//     private stable var userRoles : [(Principal, Role)] = [];

//     // Call this on canister start to restore roles from stable var to non-stable hashmap
//     private func restoreRoles() : async () {
//         for ((p, r) in userRoles.vals()) {
//             roleMap.put(p, r);
//         };
//         // Ensure defaultAdmin is assigned if no Admin exists
//         let roles : [Role] = Iter.toArray(roleMap.vals());
//         if (Array.find<Role>(roles, func(r : Role) : Bool { r == #Admin }) == null) {
//             roleMap.put(defaultAdmin, #Admin);
//             userRoles := Array.append(userRoles, [(defaultAdmin, #Admin)]);
//         };
//     };

//     public shared(msg) func init() : async () {
//         await restoreRoles();
//     };

//     private func assignRole(user: Principal, role: Role) {
//         roleMap.put(user, role);
//         // Update stable roles so they persist
//         var found = false;
//         userRoles := Array.map< (Principal, Role), (Principal, Role) >(userRoles, func(ur) {
//             if (ur.0 == user) {
//                 found := true;
//                 return (user, role);
//             } else {
//                 return ur;
//             }
//         });
//         if (not found) {
//             userRoles := Array.append(userRoles, [(user, role)]);
//         }
//     };

//     public shared(msg) func assignRoleToUser(user: Principal, role: Role): async () {
//         let caller = msg.caller;
//         if (not (await hasRole(caller, #Admin))) {
//             throw Error.reject("Unauthorized: Only Admin can assign roles");
//         };
//         assignRole(user, role);
//     };

//     public query func getRole(p: Principal): async ?Role {
//         roleMap.get(p)
//     };

//     public query func hasRole(p: Principal, role: Role): async Bool {
//         switch (roleMap.get(p)) {
//             case (?r) { r == role };
//             case null { false };
//         }
//     };


//     public shared(msg) func whoami(): async Principal {
//         return msg.caller;
//     };


//     // Preserve old certificates before upgrade
//     system func preupgrade() {
//         userRoles := Iter.toArray(roleMap.entries());
//         certificatesEntries := Iter.toArray(certificates.entries());
//     };

//     // Migrate old certificates to the new format after upgrade
//     system func postupgrade() {
//         // Restore User roles
//         for ((p, r) in userRoles.vals()) {
//             roleMap.put(p, r);
//         };

//         // Migrate old certificates to new format
//         let migratedCerts = HashMap.HashMap<Text, Certificate>(10, Text.equal, Text.hash);
    
//         for ((key, oldCert) in certificatesEntries.vals()) {
//             let newCert: Certificate = {
//                 issuer = oldCert.issuer;
//                 recipient = oldCert.recipient;
//                 program = oldCert.program;
//                 issuedAt = oldCert.issuedAt;
//                 hash = oldCert.hash;
//                 status = "Valid"; // New field added in migration
//             };
//             migratedCerts.put(key, newCert);
//         };
        
//         certificates := migratedCerts;
//         certificatesEntries := [];
        
//         // Also add to certification tree
//         for ((key, cert) in migratedCerts.entries()) {
//             let path : [Blob] = [Text.encodeUtf8("certificates"), Text.encodeUtf8(key)];
//             let certBlob = to_candid(cert);
//             ct.put(path, certBlob);
//         };

//         // Update certified data after migration
//         ct.setCertifiedData();
//     };

//     public query func getAdminStats(): async {
//         totalCertificates: Nat;
//         totalIssuers: Nat;
//         certificatesByStatus: [(Text, Nat)];
//     } {
//         let totalCertificates = certificates.size();

//         let issuerIter : Iter.Iter<(Principal, Role)> = 
//             Iter.filter<(Principal, Role)>(roleMap.entries(), func ((p, r)) { r == #Issuer });

//         let totalIssuers = Iter.size(issuerIter);
        
        
//         let statusCount = HashMap.HashMap<Text, Nat>(3, Text.equal, Text.hash);
        
//         for ((_, cert) in certificates.entries()) {
//             let count = switch (statusCount.get(cert.status)) {
//                 case (?existing) { existing + 1 };
//                 case (null) { 1 };
//             };
//             statusCount.put(cert.status, count);
//         };
        
//         let certificatesByStatus = Iter.toArray(statusCount.entries());
        
//         return {
//             totalCertificates = totalCertificates;
//             totalIssuers = totalIssuers;
//             certificatesByStatus = certificatesByStatus;
//         };
//     };
    







//     // Old Function (kept for backward compatibility)
//     public shared(msg)func createCertificate(issuer: Text, recipient: Text, course: Text): async CertificateOld {
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

//     // Add to certified tree for seecure verification
//     let path : [Blob] = [Text.encodeUtf8("certificates"), Text.encodeUtf8(hashHex)];
//     let certBlob = to_candid(certNew);
//     ct.put(path, certBlob);
//     ct.setCertifiedData();

//     return certOld;  // Returning old type to prevent breaking frontend
//     };




//     // New Function (Future usage)
//     public shared(msg) func issueCertificate(issuer: Text, recipient: Text, program: Text, issuedAt: Int): async Certificate {
//         // // Enforce role-based access control
//         // let caller = msg.caller;

//         // // Role-based access control: Admin is treated as a super-role
//         // // let isAdmin = await hasRole(caller, #Admin);
//         // // let isIssuer = await hasRole(caller, #Issuer);

//         // let isIssuer = await hasRole(caller, #Issuer);
//         // let isAdmin = await hasRole(caller, #Admin);
        
//         // Debug.print("Caller: " # Principal.toText(caller));
//         // Debug.print("isAdmin: " # (if (isAdmin) { "true" } else { "false" }));
//         // Debug.print("isIssuer: " # (if (isIssuer) { "true" } else { "false" }));

//         // if (not (isIssuer or isAdmin)) {
//         // // if (not (await hasRole(caller, #Issuer))) {
//         //     throw Error.reject("Error: Unauthorized access");
//         // };
    
//         // Input Validation
//         if (Text.size(issuer) == 0 or Text.size(recipient) == 0 or Text.size(program) == 0) {
//             throw Error.reject("Error: All text fields must be non-empty");
//         };
        
//         let issuedAt = Time.now();

//         let hashInput = issuer # recipient # program # Int.toText(issuedAt);
//         let hashBlob = Text.encodeUtf8(hashInput);
//         let hash = Sha256.fromBlob(#sha256, hashBlob);
//         let hashHex = blobToHex(hash);

//         let cert: Certificate = {
//             issuer = issuer;
//             recipient = recipient;
//             program = program;
//             issuedAt = issuedAt;
//             hash = hashHex;
//             status = "Valid";
//         };

//         certificates.put(hashHex, cert);

//         // Add to certified tree for secure verification
//         let path : [Blob] = [Text.encodeUtf8("certificates"), Text.encodeUtf8(hashHex)];
//         let certBlob = to_candid(cert);
//         ct.put(path, certBlob);
//         ct.setCertifiedData();

//         return cert;
//     };

// //     public query func getLastCaller() : async ?Principal {
// //       return lastCaller;
// //   };

//     // Helper function to convert Blob to Hex String
//     private func blobToHex(blob: Blob): Text {
//         let hex = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
//         var result = "";
//         for (byte in Blob.toArray(blob).vals()) {
//             result #= hex[Nat8.toNat(byte) / 16] # hex[Nat8.toNat(byte) % 16];
//         }; 
//         result
//     };

   
//     // Verify a certificate by hash
//     public query func verifyCertificate(hash: Text) : async {
//         certificate: ?Certificate;
//         certified: Bool;
//         certificate_blob: Blob;
//         witness: Blob;
//         valid: Bool;
//         status: Text;
//     } {
//         if (Text.size(hash) == 0) {
//             throw Error.reject("Error: Hash cannot be empty");
//         };

//         let certificate = certificates.get(hash);
//         let path: [Blob] = [Text.encodeUtf8("certificates"), Text.encodeUtf8(hash)];

//         let certificate_blob = switch (ct.lookup(path)) {
//             case (null) {
//                 switch (certificate) {
//                     case (null) { Blob.fromArray([]) };
//                     case (?cert) { to_candid(cert) };
//                 }
//             };
//             case (?blob) { blob };
//         };

//         let witness = ct.encodeWitness(ct.reveal(path));
//         let certified = CertifiedData.getCertificate() != null;

//         let valid = switch (certificate) {
//             case (null) { false };
//             case (?cert) {
//                 certified and cert.status == "Valid"
//             };
//         };

//         let status = switch (certificate) {
//             case (null) { "Invalid" };
//             case (?cert) { cert.status };
//         };

//         return {
//             certificate = certificate;
//             certified = certified;
//             certificate_blob = certificate_blob;
//             witness = witness;
//             valid = valid;
//             status = status;
//         };
//     };


//     // List all certificates
//     public query func listCertificates(): async [Certificate] {
//         return Iter.toArray(certificates.vals());
//     };





// // ***************FOR PAYMENT OF PLAN***********************88***
// //     type Plan = {
// //   #Free;
// //   #Pro;
// //   #Enterprise;
// // };

// // public type User = {
// //   username: Text;
// //   email: Text;
// //   plan: Plan;
// // };

// // var users: TrieMap<Principal, User> = TrieMap();

// // public func upgradeUser(p: Principal, newPlan: Plan) : async () {
// //   switch (users.get(p)) {
// //     case (?user) {
// //       users.put(p, { user with plan = newPlan });
// //     };
// //     case null {};
// //   };
// // };


// // And in the frontend, use the user plan to restrict or enable features:

// // if (user.plan === 'Pro') {
// //   // show Verify Certificate
// // }

// };




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

    // Old Function (kept for backward compatibility)
    public shared(msg) func createCertificate(issuer: Text, recipient: Text, course: Text): async CertificateOld {
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

        // Add to certified tree for secure verification
        let path : [Blob] = [Text.encodeUtf8("certificates"), Text.encodeUtf8(hashHex)];
        let certBlob = to_candid(certNew);
        ct.put(path, certBlob);
        ct.setCertifiedData();

        return certOld;  // Returning old type to prevent breaking frontend
    };

    // New Function (Future usage)
    public shared(msg) func issueCertificate(issuer: Text, recipient: Text, program: Text, issuedAt: Int): async Certificate {
        // Input Validation
        if (Text.size(issuer) == 0 or Text.size(recipient) == 0 or Text.size(program) == 0) {
            throw Error.reject("Error: All text fields must be non-empty");
        };

        let issuedAt = Time.now();
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