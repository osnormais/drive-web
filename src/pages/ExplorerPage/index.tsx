import LoadingIndicator from "../../components/LoadingIndicator";
import UploadFileModal from "../../components/UploadFileModal";
import { useFile } from "../../hooks/useFile";
import { useFolder } from "../../hooks/useFolder";
import Folder from "./Folder";


function ExplorerPage() {

  const { loading, folder, pathElements, openFolder } = useFolder();
  const { uploadFile } = useFile();

  return (
    <>
      <section>

        <UploadFileModal
          isOpen={true}
          onClose={() => { }}
          handleUpload={async (file) => { await uploadFile(folder!.id, file) }}
        />

        <div>
          {
            loading || !folder ?
              (<LoadingIndicator />)
              :
              (<Folder
                folder={folder}
                loading={loading}
                pathElements={pathElements}
                openFolder={openFolder}
              />)
          }
        </div>

      </section>
    </>
  );
}

export default ExplorerPage;