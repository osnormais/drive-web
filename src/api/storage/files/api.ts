import client from "../client";
import type {
    DownloadChunkParams,
    UploadChunkParams,
} from "./types";


export async function downloadChunk(params: DownloadChunkParams): Promise<Blob> {
    const { data } = await client.get("/files/chunks", {
        headers: {
            "X-Chunk-Token": params.chunkToken,
        },
        responseType: "blob",
    });
    return data;
}


export async function uploadChunk(
    params: UploadChunkParams,
    data: ArrayBuffer
): Promise<void> {
    await client.post("/files/chunks", data, {
        headers: {
            "X-Chunk-Token": params.chunkToken,
            "X-Checksum-Value": params.checksumValue,
            "X-Checksum-Algorithm": params.checksumAlgorithm,
            "Content-Type": "application/octet-stream",
        },
    });
}
