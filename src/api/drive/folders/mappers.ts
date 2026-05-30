import type Folder from "../../../models/folder";
import type {
    GetFolderResponseDTO
} from "./types";

export function toFolder(dto: GetFolderResponseDTO): Folder {
    return {
        id: dto.id,
        parentId: dto.parentId ?? null,
        type: dto.type,
        ownerId: dto.ownerId,
        name: dto.name,
        subFolders: dto.subFolders,
        files: dto.files,
        createdAt: dto.createdAt,
        updatedAt: dto.updatedAt,
    };
}