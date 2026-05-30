import client from "../client";

import type {
    CreateFolderRequestDTO,
    GetFolderResponseDTO,
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

export async function getFolder(id: string): Promise<GetFolderResponseDTO> {
    const { data } = await client.get(`/folders/${id}`);
    return data;
}

export async function getRootFolder(): Promise<GetFolderResponseDTO> {
    const { data } = await client.get("/folders/root");
    return data;
}

export async function getInboxFolder(): Promise<GetFolderResponseDTO> {
    const { data } = await client.get("/folders/inbox");
    return data;
}
