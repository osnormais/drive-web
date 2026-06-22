import client from "../client";
import type { CreateFileRequestDTO, GetFileResponseDTO, PageListFileItemResponseDTO, SearchFilesParamsDTO } from "./types";

export async function searchFiles(params: SearchFilesParamsDTO = {}): Promise<PageListFileItemResponseDTO> {
    const { data } = await client.get("/files", { params });
    return data;
}

export async function createFile(body: CreateFileRequestDTO): Promise<string> {
    const { headers } = await client.post("/files", body);
    const location: string = headers["location"];
    return location.split("/").at(-1)!;
}

export async function getFile(id: string): Promise<GetFileResponseDTO> {
    const { data } = await client.get(`/files/${id}`);
    return data;
}