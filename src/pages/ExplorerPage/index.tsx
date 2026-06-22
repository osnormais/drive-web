import LoadingIndicator from "../../components/LoadingIndicator";
import { useFolder } from "../../hooks/useFolder";
import Folder from "./Folder";
import Path from "./Path";


function ExplorerPage() {

  const { loading, folder, pathElements, openFolder } = useFolder();


  return (
    <>
      <section>

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