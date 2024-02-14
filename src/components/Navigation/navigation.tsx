import { useCallback, useState } from "react";
import FileExplorer from "../FileExplorer/fileExplorer";
import { files } from "../../data/data";
import "./navigation.css";
import { useDebounce } from "../../useHooks/useDebounce";

const Navigation = () => {
  const [query, setQuery] = useState("");
  const debouncedSearchKey = useDebounce(query, 500);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);

  return (
    <main className="wrapper">
      <section>
        <input
          className="search-input"
          value={query}
          placeholder="Search here..."
          onChange={handleChange}
        />
        <FileExplorer files={files} search={debouncedSearchKey} />
      </section>
    </main>
  );
};
export default Navigation;
