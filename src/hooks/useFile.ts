import { useEffect, useState } from "react";

import {
    downloadChunk,
    uploadChunk
} from "../api/storage/files/api";

import {
    createTransferChannel as createTransferChannelApi,
    getTransferChannel as getTransferChannelApi,
    getTransferChannelTokens as getTransferChannelTokensApi,
} from "../api/drive/transferchannels/api";

import {
    createFile as createFileApi,
} from "../api/drive/files/api";


import {
    calculateChecksum
} from "../service/checksum.service";

import type { File as FileModel } from "../models/file";
import type { TransferChannel as TransferChannelModel } from "../models/transferchannel";
import { upload } from "../service/upload.service";

export interface UploadState {
    file: File;
    active: boolean;
    transferChannel: TransferChannelModel;
}

// function hasUploadState(uploadStates: UploadState[], fileId: string): boolean {
//     return uploadStates.some(uploadState => uploadState.transferChannel.fileId === fileId);
// }

export function useFile() {

    const [uploadStates, setUploadStates] = useState<UploadState[]>([]);


    async function uploadFile(folderId: string, file: File) {

        const fileId = await createFileApi({
            parentFolderId: folderId,
            name: file.name + Date.now(), //TODO remover timeStamp depois de testar
            contentType: file.type,
            sizeInBytes: file.size,
            checksumValue: await calculateChecksum(file),
            checksumAlgorithm: "MD5"
        });

        const transferChannel = await createTransferChannelApi(fileId, "UPLOAD");

        setUploadStates(prevStates => [...prevStates, {
            file,
            transferChannel,
            active: true,
        }]);

        upload({ file, transferChannel });

        // const uploadState = await createTransferChannel(fileId, file);

    }


    const [file, setFile] = useState<FileModel | null>(null);
    const [loading, setLoading] = useState(false);

    async function downloadFileChunk(chunkToken: string): Promise<Blob> {

        setLoading(true);

        try {
            return await downloadChunk({ chunkToken });
        } finally {
            setLoading(false);
        }

    }

    async function uploadFileChunk(params: { chunkToken: string; checksumValue: string; checksumAlgorithm: string }, data: ArrayBuffer): Promise<void> {

        setLoading(true);

        try {
            // await uploadChunk(params, data);
        } finally {
            setLoading(false);
        }

    }

    return {
        uploadFile
        // file,
        // loading,
        // downloadFileChunk,
        // uploadFileChunk
    };

}