
import type { Folder as FolderModel, FolderPath } from "../../../models/folder";
import Path from "../Path";
import "./index.css";

type Props = {
  folder: FolderModel,
  loading: boolean,
  pathElements: FolderPath[],
  openFolder: (folderId: string) => void
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export default function Folder({ folder, loading, pathElements, openFolder }: Props) {

  return (
    <div className="folder-container">

      <Path loading={loading} pathElements={pathElements} openFolder={openFolder} />

      {folder.subFolders.length > 0 && (
        <section className="section">
          <h2 className="section-title">Folders</h2>
          <div className="items-grid">
            {folder.subFolders.map((subFolder) => (
              <a onClick={() => openFolder(subFolder.id)} key={subFolder.id}>
                <div className="item item-folder" >
                  <div className="item-icon">📁</div>
                  <div className="item-details">
                    <p className="item-name">{subFolder.name}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      )
      }

      {
        folder.files.length > 0 && (
          <section className="section">
            <h2 className="section-title">Files</h2>
            <div className="files-list">
              <div className="files-header">
                <div className="col-name">Name</div>
                <div className="col-type">Type</div>
                <div className="col-size">Size</div>
                <div className="col-date">Creation Date</div>
              </div>
              {folder.files.map((file) => (
                <div key={file.id} className="item item-file">
                  <div className="col-name">
                    <span className="file-icon">📄</span>
                    {file.name}
                  </div>
                  <div className="col-type">{file.contentType}</div>
                  <div className="col-size">{formatFileSize(file.sizeInBytes)}</div>
                  <div className="col-date">{formatDate(file.createdAt)}</div>
                </div>
              ))}
            </div>
          </section>
        )
      }

      {
        folder.subFolders.length === 0 && folder.files.length === 0 && (
          <div className="empty-state">
            <p>This folder is empty</p>
          </div>
        )
      }
    </div >
  );
}