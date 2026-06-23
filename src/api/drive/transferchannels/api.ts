import type { TransferChannel } from "../../../models/transferchannel";
import client from "../client";
import { toTransferChannel } from "./mappers";
import type {
    GetTransferChannelTokensResponseDTO,
} from "./types";

export async function createTransferChannel(
    fileId: string,
    type: "UPLOAD" | "DOWNLOAD"
): Promise<TransferChannel> {
    const { data } = await client.post("/transfer-channels", null, {
        headers: {
            "X-File-Id": fileId,
            "X-Type": type,
        },
    });
    return toTransferChannel(data);
}

export async function getTransferChannel(id: string): Promise<TransferChannel> {
    const { data } = await client.get(`/transfer-channels/${id}`);
    return toTransferChannel(data);
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