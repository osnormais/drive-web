import type { Folder } from "../../../models/folder";
import client from "../client";
import { toFolder } from "./mappers";

import type {
    CreateFolderRequestDTO,
    PageListFolderItemResponseDTO,
    SearchFoldersParamsDTO,
    ShareFolderRequestDTO,
} from "./types";

export async function searchFolders(params: SearchFoldersParamsDTO = {}): Promise<PageListFolderItemResponseDTO> {
    const { data } = await client.get("/folders", { params });
    return data;
}

export async function createFolder(body: CreateFolderRequestDTO): Promise<string> {
    const { headers } = await client.post("/folders", body);
    return headers["location"].split("/").at(-1)!;
}

export async function shareFolder(id: string, body: ShareFolderRequestDTO): Promise<void> {
    await client.post(`/folders/${id}/sharings`, body);
}

export async function getFolder(id: string): Promise<Folder> {
    const { data } = await client.get(`/folders/${id}`);
    return toFolder(data);
}

export async function getRootFolder(): Promise<Folder> {
    const { data } = await client.get("/folders/root");
    return toFolder(data);
}

export async function getInboxFolder(): Promise<Folder> {
    const { data } = await client.get("/folders/inbox");
    return toFolder(data);
}
