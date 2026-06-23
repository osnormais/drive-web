import { calculateChecksum } from "./checksum.service";

import type { TransferChannel } from "../models/transferchannel";



import {
    createTransferChannel,
    getTransferChannel,
    getTransferChannelTokens,
} from "../api/drive/transferchannels/api";

import {
    uploadChunk
} from "../api/storage/files/api";



export interface UploadParams {
    file: File;
    // active: boolean;
    transferChannel: TransferChannel;
}


export async function upload(params: UploadParams) {

    const { file, transferChannel } = params;

    const initialRange = "0-" + (Math.min(transferChannel.maxParallelChunks, transferChannel.totalChunks) - 1);

    const { expiresAt, chunkTokens } = await getTransferChannelTokens(transferChannel.id, initialRange);

    const checksumAlgorithm = "MD5";

    for (const chunkToken of chunkTokens) {

        const { offset, size, token } = chunkToken;

        const chunk = file.slice(offset, offset + size);
        const checksumValue = await calculateChecksum(chunk);

        await uploadChunk({ checksumAlgorithm, checksumValue, chunkToken: token }, chunk);

    }



}

async function up() {

}



