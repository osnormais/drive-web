import { useState } from "react";
import { Modal } from "./Modal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  handleUpload: (file: File) => Promise<void>;
};

export default function UploadFileModal({ isOpen, onClose, handleUpload }: Props) {

  const [file, setFile] = useState<File | null>(null);

  return (
    <Modal isOpen={isOpen} >
      <h2>File Upload</h2>

      <input
        type="file"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
          }
        }}
      />

      <button disabled={!file} onClick={() => { handleUpload(file!); onClose() }}  >
        Send
      </button>
    </Modal >
  );

}
