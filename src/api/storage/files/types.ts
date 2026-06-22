export type ChecksumAlgorithm = "CRC_32" | "MD5" | "SHA_256";

export interface DownloadChunkParams {
    chunkToken: string;
}

export interface UploadChunkParams {
    chunkToken: string;
    checksumValue: string;
    checksumAlgorithm: ChecksumAlgorithm;
}
