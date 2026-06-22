
import type { Folder as FolderModel } from "../../../models/folder";
import "./index.css";

type Props = {
  folder: FolderModel
}

export default function Folder({ folder }: Props) {
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

  return (
    <div className="folder-container">
      <div className="folder-header">
        <h1 className="folder-name">{folder.name}</h1>
        <p className="folder-type">{folder.type}</p>
      </div>

      {folder.subFolders.length > 0 && (
        <section className="section">
          <h2 className="section-title">Pastas</h2>
          <div className="items-grid">
            {folder.subFolders.map((subFolder) => (
              <div key={subFolder.id} className="item item-folder">
                <div className="item-icon">📁</div>
                <div className="item-details">
                  <p className="item-name">{subFolder.name}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {folder.files.length > 0 && (
        <section className="section">
          <h2 className="section-title">Arquivos</h2>
          <div className="files-list">
            <div className="files-header">
              <div className="col-name">Nome</div>
              <div className="col-type">Tipo</div>
              <div className="col-size">Tamanho</div>
              <div className="col-date">Data de Criação</div>
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
      )}

      {folder.subFolders.length === 0 && folder.files.length === 0 && (
        <div className="empty-state">
          <p>Esta pasta está vazia</p>
        </div>
      )}
    </div>
  );
}