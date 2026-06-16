
import type { Folder as FolderModel } from "../../../models/folder";

type Props = {
  folder: FolderModel
}

export default function Folder({ folder }: Props) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Size</th>
        </tr>
      </thead>
      <tbody>
        {folder.subFolders.map(subFolder => (
          <tr key={subFolder.id}>
            <td>{subFolder.name}</td>
            <td>Folder</td>
            <td>-</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}