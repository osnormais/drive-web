import client from "../client";
import type {
    CreateTransferChannelResponseDTO,
    GetTransferChannelResponseDTO,
    GetTransferChannelTokensResponseDTO,
} from "./types";

export async function createTransferChannel(
    fileId: string,
    type: "UPLOAD" | "DOWNLOAD"
): Promise<CreateTransferChannelResponseDTO> {
    const { data } = await client.post("/transfer-channels", null, {
        headers: {
            "X-File-Id": fileId,
            "X-Type": type,
        },
    });
    return data;
}

export async function getTransferChannel(id: string): Promise<GetTransferChannelResponseDTO> {
    const { data } = await client.get(`/transfer-channels/${id}`);
    return data;
}

export async function getTransferChannelTokens(
    id: string,
    ranges: string
): Promise<GetTransferChannelTokensResponseDTO> {
    const { data } = await client.get(`/transfer-channels/${id}/chunks/permissions/tokens`, {
        headers: { "X-Ranges": ranges },
    });
    return data;
}