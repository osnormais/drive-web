import { useEffect, useState } from "react";

import { getFolder, getRootFolder, createFolder as createFolderApi } from "../api/drive/folders";

import type Folder from "../models/folder";

export function useFolder() {

    const [folder, setFolder] = useState<Folder | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (folder !== null)
            return;

        getRootFolder()
            .then(setFolder)
            .finally(() => setLoading(false));

    }, []);

    async function openRootFolder() {

        setLoading(true);

        try {
            setFolder(await getRootFolder());
        } finally {
            setLoading(false);
        }

    }

    async function openFolder(id: string) {

        setLoading(true);

        try {
            const folder = await getFolder(id);
            setFolder(folder);
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
        loading,
        openRootFolder,
        openFolder,
        createFolder
    };

}