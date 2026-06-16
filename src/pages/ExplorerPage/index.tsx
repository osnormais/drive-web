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
          <Path loading={loading} pathElements={pathElements} openFolder={openFolder} />
        </div>

        <div>
          {loading || !folder ? (<LoadingIndicator />) : (<Folder folder={folder} />)}
        </div>



        {/* <p>Current folder: {loading ? "Loading..." : folder?.name}</p>
        <button onClick={() => openFolder("some-folder-id")}>Open Folder</button>
        <ul>
          {folder?.subFolders.map(subFolder => (
            <li key={subFolder.id}>
              {subFolder.name}
              <button onClick={() => openFolder(subFolder.id)}>Open Folder</button>
            </li>
          ))}
        </ul> */}
      </section>
    </>
  );
}

export default ExplorerPage;