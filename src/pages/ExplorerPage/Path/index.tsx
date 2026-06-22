import "./index.css";

import LoadingIndicator from "../../../components/LoadingIndicator";
import type { FolderPath } from "../../../models/folder";

type Props = {
  loading: boolean;
  openFolder: (id: string) => void;
  pathElements: FolderPath[]
}

function PathElement(element: FolderPath, openFolder: (id: string) => void) {
  return (
    <a key={"path-element_" + element.id} className="path-element" onClick={() => openFolder(element.id)}>{element.name}</a>
  );
}

export default function Path({ loading, pathElements, openFolder }: Props) {
  return (
    <>
      {loading ?
        (<LoadingIndicator />) : (<section className="path">{pathElements.map((e) => PathElement(e, openFolder))}</section>)}
    </>
  );
}