import { useEffect, useState } from "react";

import { getFolder, getRootFolder, createFolder as createFolderApi } from "../api/drive/folders/api";

import type { Folder, FolderPath } from "../models/folder";

export function useFolder() {

    const [folder, setFolder] = useState<Folder | null>(null);
    const [loading, setLoading] = useState(true);
    const [pathElements, setPathElements] = useState<FolderPath[]>([]);

    useEffect(() => {

        if (folder !== null)
            return;

        getRootFolder()
            .then(rootFolder => {
                setFolder(rootFolder);
                setPathElements([{ id: rootFolder.id, name: "/" }]);

                setPathElements([
                    { id: rootFolder.id, name: "/" },
                    { id: rootFolder.id + "1", name: "pasta 1" },
                    { id: rootFolder.id + "2", name: "pasta 2" },
                    { id: rootFolder.id + "3", name: "pasta 3" },
                    { id: rootFolder.id + "4", name: "pasta 4" },
                ]);

            })
            .finally(() => setLoading(false));

    }, []);

    async function openFolder(id: string) {

        setLoading(true);

        try {
            const parentFolder = folder!;
            const newFolder = await getFolder(id);
            setFolder(newFolder);

            //TODO Buscar do endpoint /folders/{id}/path para obter o caminho completo do folder
            if (newFolder.type === "ROOT")
                setPathElements([{ id: newFolder.id, name: "/" }]);
            else
                setPathElements([{ id: parentFolder.id, name: parentFolder.name }, { id: newFolder.id, name: newFolder.name }]);


            setPathElements([
                { id: newFolder.id, name: "/" },
                { id: newFolder.id + "1", name: "pasta 1" },
                { id: newFolder.id + "2", name: "pasta 2" },
                { id: newFolder.id + "3", name: "pasta 3" },
                { id: newFolder.id + "4", name: "pasta 4" },
            ]);

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