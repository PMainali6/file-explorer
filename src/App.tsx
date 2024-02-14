import { useEffect, useRef, useState } from "react";
import FileExplorer from "./components/FileExplorer/fileExplorer";
import { files } from "./data/data";

import "./App.css";
import { useDebounce } from "./useHooks/useDebounce";
const App = () => {
  const rootRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const debouncedSearchKey = useDebounce(query, 500);

  useEffect(() => {
    rootRef?.current?.focus();
  }, []);

  useEffect(() => {
    console.log(debouncedSearchKey);
  }, [debouncedSearchKey]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <main>
      <h3>File Explorer</h3>
      <div>
        <input
          className="search-input"
          value={query}
          placeholder="Search here..."
          onChange={handleChange}
          ref={rootRef}
          // onKeyDown={handleKeyDown}
        />
        <FileExplorer files={files} search={debouncedSearchKey} />
      </div>
    </main>
  );
};
export default App;
