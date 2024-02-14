import { ContextData } from "../../data/data";

interface IContextMenu {
  handleContextClick: (e: React.MouseEvent<HTMLLIElement>) => void;
  filename: string;
}

const ContextMenu = ({ handleContextClick, filename }: IContextMenu) => {
  return (
    <ul>
      {ContextData.map((data) => {
        return (
          <li
            key={data.id}
            id={data.label}
            onClick={handleContextClick}
            data-filename={filename}
          >
            {data.label}
          </li>
        );
      })}
    </ul>
  );
};
export default ContextMenu;
