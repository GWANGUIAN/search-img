import React from "react";
import "./SearchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function SearchBar({ searchWord, setSerachWord }) {
  return (
    <header className="search-bar-container">
      <h1 id="text-title">SearchImg</h1>
      <div className="box-input">
        <input
          className="input-search"
          value={searchWord}
          onChange={(e) => {
            setSerachWord(e.target.value);
          }}
        />
        <FontAwesomeIcon className="icon-search" icon={faSearch} />
      </div>
    </header>
  );
}

export default SearchBar;
