import { useEffect, useState } from "react";

import {
    getFolder as getFolderApi,
    getRootFolder as getRootFolderApi,
    createFolder as createFolderApi,
    getFolderPath as getFolderPathApi
} from "../api/drive/folders/api";

import type { Folder, FolderPath } from "../models/folder";

export function useFolder() {

    const [folder, setFolder] = useState<Folder | null>(null);
    const [loading, setLoading] = useState(true);
    const [pathElements, setPathElements] = useState<FolderPath[]>([]);

    useEffect(() => {

        if (folder !== null)
            return;

        getRootFolderApi()
            .then(async rootFolder => {
                setFolder(rootFolder);
                setPathElements(await getFolderPathApi(rootFolder.id));
            })
            .finally(() => setLoading(false));

    }, []);

    async function openFolder(id: string) {

        setLoading(true);

        try {
            const newFolder = await getFolderApi(id);
            setFolder(newFolder);
            setPathElements(await getFolderPathApi(newFolder.id));
        } finally {
            setLoading(false);
        }

    }

    async function createFolder(name: string) {

        try {

            setLoading(true);

            if (folder == null)
                return;

            await createFolderApi({ name, parentFolderId: folder!.id });
            await openFolder(folder!.id);

        } finally {
            setLoading(false);
        }

    }


    return {
        folder,
        pathElements,
        loading,
        openFolder,
        createFolder
    };

}