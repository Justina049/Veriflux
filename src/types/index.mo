// This file defines types and interfaces used throughout the project.

type ScannedCertificate = {
    hash: Text;
    uploader: Principal;
    uploadDate: Int;
    fileBlob: Blob; // The scanned copy of the certificate as a Blob
};

type NFT = {
    id: Text;
    owner: Principal;
    metadata: Text; // Metadata related to the NFT
    certificateHash: Text; // Link to the associated certificate
};