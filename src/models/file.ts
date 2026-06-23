export type ChecksumAlgorithm = "CRC_32" | "MD5" | "SHA_256";

export interface File {
    id: string;
    name: string;
    sizeInBytes: number;
    contentType: string;
    checksumValue?: string;
    checksumAlgorithm?: ChecksumAlgorithm;
    folderId: string;
    ownerId: string;
    creatorId: string;
    createdAt: string;
    updatedAt: string;
}
