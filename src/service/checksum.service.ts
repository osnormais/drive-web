import { createMD5 } from 'hash-wasm';

export interface ProcessingStatusManager {

    setProgress: (progress: number) => void;
    setHash: (hash: string) => void;
    setIsProcessing: (isProcessing: boolean) => void;

}

export async function calculateChecksum(data: Blob, statusManager?: ProcessingStatusManager): Promise<string> {

    const CHUNK_SIZE = 5 * 1024 * 1024;
    let offset = 0;

    statusManager?.setIsProcessing(true);
    statusManager?.setHash("");
    statusManager?.setProgress(0);

    try {

        const hasher = await createMD5();
        hasher.init();

        while (offset < data.size) {
            const chunk = data.slice(offset, offset + CHUNK_SIZE);

            const buffer = await chunk.arrayBuffer();
            hasher.update(new Uint8Array(buffer));

            offset += CHUNK_SIZE;

            const currentProgress = Math.min(Math.round((offset / data.size) * 100), 100);
            statusManager?.setProgress(currentProgress);

            await new Promise((resolve) => setTimeout(resolve, 0));
        }

        const finalHash = hasher.digest('hex');
        statusManager?.setHash(finalHash);
        return finalHash;

    } catch (error) {
        console.error('Error:', error);
        throw error;
    } finally {
        statusManager?.setIsProcessing(false);
    }
};