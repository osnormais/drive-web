import { calculateChecksum } from "./checksum.service";
import {
    createTransferChannel,
    getTransferChannel,
    getTransferChannelTokens,
} from "../api/drive/transferchannels/api";
import { uploadChunk } from "../api/storage/files/api";
import RangeManager from "./util/RangeManager";

export interface UploadParams {
    file: File;
    fileId: string;
}

export async function upload(params: UploadParams) {
    const { file, fileId } = params;

    let transferChannel = await createTransferChannel(fileId, "UPLOAD");
    const rangeManager = new RangeManager(transferChannel.totalChunks);

    while (rangeManager.hasPending()) {

        if (new Date(transferChannel.expiresAt).getTime() < (Date.now() + (1 * 60 * 1000))) {
            transferChannel = await getTransferChannel(transferChannel.id);
        }

        const batch = rangeManager.getNextBatch(transferChannel.maxParallelChunks);
        const rangeString = batch.map(range => range.toString()).join(";");

        const { chunkTokens } = await getTransferChannelTokens(transferChannel.id, rangeString);


        await processWithLimit(chunkTokens, transferChannel.maxParallelChunks, async (chunkToken) => {
            const { index, offset, size, token } = chunkToken;

            const chunk = file.slice(offset, offset + size);
            const checksumValue = await calculateChecksum(chunk);

            await uploadChunk({ checksumAlgorithm: "MD5", checksumValue, chunkToken: token }, chunk);

            rangeManager.markAsCompleted(index, index);
        });
    }
}

async function processWithLimit<T>(
    items: T[],
    limit: number,
    processor: (item: T) => Promise<void>
): Promise<void> {
    const executing = new Set<Promise<void>>();

    for (const item of items) {
        const task = processor(item).finally(() => {
            executing.delete(task);
        });

        executing.add(task);

        if (executing.size >= limit) {
            await Promise.race(executing);
        }
    }

    await Promise.all(executing);
}