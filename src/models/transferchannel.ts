export interface TransferChannel {
    id: string,
    type: "UPLOAD" | "DOWNLOAD",
    totalChunks: number,
    chunkSize: number,
    userId: string,
    fileId: string,
    maxParallelChunks: number,
    throughputLimit: number,
    expiresAt: Date,
}

export interface Tokens {
    fileId: string,
    expiresAt: Date,
    tokens: Token[],
}

export interface Token {
    index: number,
    offset: number,
    size: number,
    token: string,
}