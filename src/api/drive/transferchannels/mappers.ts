import type { TransferChannel } from "../../../models/transferchannel";

import type { CreateTransferChannelResponseDTO, GetTransferChannelResponseDTO } from "./types";

export function toTransferChannel(dto: CreateTransferChannelResponseDTO | GetTransferChannelResponseDTO): TransferChannel {
    return {
        id: dto.id,
        type: dto.type as "UPLOAD" | "DOWNLOAD",
        totalChunks: dto.totalChunks,
        chunkSize: dto.chunkSize,
        userId: dto.userId,
        fileId: dto.fileId,
        maxParallelChunks: dto.maxParallelChunks,
        throughputLimit: dto.throughputLimit,
        expiresAt: new Date(dto.expiresAt),
    };
}
