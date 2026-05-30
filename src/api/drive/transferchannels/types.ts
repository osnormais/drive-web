export interface CreateTransferChannelResponseDTO {
    id: string;
    type: string;
    totalChunks: number;
    userId: string;
    fileId: string;
    maxParallelChunks: number;
    throughputLimit: number;
    expiresAt: string;
}

export interface GetTransferChannelResponseDTO {
    id: string;
    type: string;
    totalChunks: number;
    userId: string;
    fileId: string;
    maxParallelChunks: number;
    throughputLimit: number;
    expiresAt: string;
}

export interface ChunkTokenDTO {
    index: number;
    token: string;
}

export interface GetTransferChannelTokensResponseDTO {
    fileId: string;
    expiresAt: string;
    chunkTokens: ChunkTokenDTO[];
}