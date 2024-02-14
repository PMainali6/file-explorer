import { useEffect, useState } from "react";
import { Folder, File } from "../../data/data";
import folderClose from "../../assets/folderClosed.svg";
import folderOpen from "../../assets/folderOpen.svg";
import "./fileExplorer.css";

interface IFileExplorer {
  files: Folder | File;
  search: string;
}

const FileExplorer = ({ files, search }: IFileExplorer) => {
  const [expand, setExpand] = useState(false);
  const [rightClicked, setRightClicked] = useState(false);
  const [active, setActive] = useState(false);

  const handleClick = (
    e: React.MouseEvent<HTMLUListElement>,
    filename: string
  ) => {
    console.log("Event: ", e.target);
    console.log("Filename: ", filename);
    setRightClicked(false);
  };

  useEffect(() => {
    if (search.length > 3) {
      const active = files.name.includes(search);
      setActive(active);
      setExpand(true);
    }
  }, [search]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const key = e.key;

    if (key === "Enter") {
    } else if (key === "ArrowDown") {
      console.log("ArrowDonw: ", e.key);
    } else if (key === "ArrowUp") {
      console.log("Arrow up: ", key);
    }
  };

  if (files.type === "folder") {
    return (
      <div>
        <div
          tabIndex={0}
          onKeyDown={handleKeyDown}
          className={active ? "folder active" : "folder"}
          onClick={() => setExpand(!expand)}
        >
          <img
            className="folder-img"
            src={expand ? folderOpen : folderClose}
            alt="folder icon"
          />
          {files.name}
        </div>

        <div
          className="children"
          style={{ display: expand ? "block" : "none" }}
        >
          {files.data.map((child) => {
            return (
              <FileExplorer key={child.name} files={child} search={search} />
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div
        tabIndex={0}
        className={active ? "active" : ""}
        onContextMenu={(e) => {
          e.preventDefault();
          setRightClicked(true);

          console.log("Right Click: ", e);
        }}
      >
        {files.name}
        {rightClicked && (
          <div className="context-menu">
            <ul onClick={(e) => handleClick(e, files.name)}>
              <li id="edit">Edit</li>
              <li id="copy">Copy</li>
              <li id="delete">Delete</li>
            </ul>
          </div>
        )}
      </div>
    );
  }
};
export default FileExplorer;
