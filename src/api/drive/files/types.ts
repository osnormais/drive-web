export interface CreateFileRequestDTO {
    parentFolderId: string;
    name: string;
    contentType: string;
    sizeInBytes: number;
    checksumValue: string;
    checksumAlgorithm: "CRC_32" | "MD5" | "SHA_256";
}

export interface ListFileItemResponseDTO {
    id: string;
    name: string;
    sizeInBytes: number;
    contentType: string;
    folderId: string;
    ownerId: string;
    creatorId: string;
    createdAt: string;
    updatedAt: string;
}

export interface PageListFileItemResponseDTO {
    currentPage: number;
    perPage: number;
    totalPages: number;
    total: number;
    items: ListFileItemResponseDTO[];
}

export interface GetFileResponseDTO {
    id: string;
    name: string;
    sizeInBytes: number;
    contentType: string;
    checksumValue: string;
    checksumAlgorithm: "CRC_32" | "MD5" | "SHA_256";
    folderId: string;
    ownerId: string;
    creatorId: string;
    createdAt: string;
    updatedAt: string;
}

export type FileOrderFieldDTO =
    | "ID" | "NAME" | "OWNER_ID" | "CREATOR_ID"
    | "FOLDER_ID" | "TYPE" | "SIZE" | "CREATED_AT" | "UPDATED_AT";

export interface SearchFilesParamsDTO {
    page?: number;
    perPage?: number;
    orderField?: FileOrderFieldDTO;
    orderDirection?: "ASC" | "DESC";
    filterOperator?: "AND" | "OR";
    filterGroups?: string[];
}