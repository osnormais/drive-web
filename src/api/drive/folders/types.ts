export type FolderOrderField =
    | "ID" | "CREATOR_ID" | "OWNER_ID" | "PARENT_FOLDER_ID"
    | "NAME" | "CREATED_AT" | "UPDATED_AT";

export interface SearchFoldersParamsDTO {
    page?: number;
    perPage?: number;
    orderField?: FolderOrderField;
    orderDirection?: "ASC" | "DESC";
    filterOperator?: "AND" | "OR";
    filterGroups?: string[];
}

export interface CreateFolderRequestDTO {
    parentFolderId?: string;
    name?: string;
}

export interface ShareFolderRequestDTO {
    userId?: string;
    permission?: "OWNER" | "MANAGE" | "WRITE" | "READ";
    expiresAt?: string;
}

export interface ListFolderItemResponseDTO {
    id: string;
    name: string;
    type: "ROOT" | "NORMAL" | "INBOX";
    parentId: string;
    ownerId: string;
    createdAt: string;
    updatedAtt: string;
}

export interface PageListFolderItemResponseDTO {
    currentPage: number;
    perPage: number;
    totalPages: number;
    total: number;
    items: ListFolderItemResponseDTO[];
}

export interface SubFolderDTO {
    id: string;
    name: string;
}

export interface FolderFileDTO {
    id: string;
    name: string;
    sizeInBytes: number;
    contentType: string;
    createdAt: string;
}

export interface GetFolderResponseDTO {
    id: string;
    parentId: string;
    type: "ROOT" | "NORMAL" | "INBOX";
    ownerId: string;
    name: string;
    subFolders: SubFolderDTO[];
    files: FolderFileDTO[];
    createdAt: string;
    updatedAt: string;
}