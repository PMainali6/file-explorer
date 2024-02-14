import { useCallback, useEffect, useState } from "react";
import { Folder, File } from "../../data/data";
import folderClose from "../../assets/folderClosed.svg";
import folderOpen from "../../assets/folderOpen.svg";
import fileIcon from "../../assets/file.svg";
import "./fileExplorer.css";
import ContextMenu from "../ContextMenu/ContextMenu";

interface IFileExplorer {
  files: Folder | File;
  search: string;
}

const FileExplorer = ({ files, search }: IFileExplorer) => {
  const [expand, setExpand] = useState(false);
  const [rightClicked, setRightClicked] = useState(false);
  const [active, setActive] = useState(false);

  const handleContextClick = useCallback(
    (e: React.MouseEvent<HTMLLIElement>) => {
      console.log("Event: ", e.currentTarget.id);
      console.log("Filename: ", e.currentTarget.dataset.filename);
      setRightClicked(false);
    },
    []
  );

  useEffect(() => {
    if (search.length === 0) {
      setExpand(false);
      setActive(false);
    }
    if (search.length > 1) {
      const active = files.name.includes(search);
      setActive(active);
      setExpand(true);
    }
  }, [search]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const key = e.key;

      if (key === "Enter") {
        setExpand((prev) => !prev);
      } else if (key === "ArrowDown") {
        console.log("ArrowDonw: ", e.key);
      } else if (key === "ArrowUp") {
        console.log("Arrow up: ", key);
      }
    },
    []
  );

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
            className="icon"
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
        className={active ? "file active" : "file"}
        onContextMenu={(e) => {
          e.preventDefault();
          setRightClicked(true);

          console.log("Right Click: ", e);
        }}
      >
        <img className="icon" src={fileIcon} alt="file icon" />
        {files.name}
        {rightClicked && (
          <div className="context-menu">
            <ContextMenu
              handleContextClick={handleContextClick}
              filename={files.name}
            />
          </div>
        )}
      </div>
    );
  }
};
export default FileExplorer;
