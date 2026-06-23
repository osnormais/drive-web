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
    fileId: string;
    active: boolean;
}

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

        setUploadStates(prevStates => [...prevStates, { fileId, active: true, }]);

        upload({ file, fileId });


    }



    return {
        uploadFile
    };

}