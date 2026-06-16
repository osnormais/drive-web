export interface Folder {
    id: string;
    parentId: string | null;
    type: "ROOT" | "NORMAL" | "INBOX";
    ownerId: string;
    name: string;
    subFolders: SubFolder[];
    files: FolderFile[];
    createdAt: string;
    updatedAt: string;
}

export interface SubFolder {
    id: string;
    name: string;
}

export interface FolderFile {
    id: string;
    name: string;
    sizeInBytes: number;
    contentType: string;
    createdAt: string;
}

export interface FolderPath {
    id: string;
    name: string;
}