import React, { useState } from "react";
import "./SearchBar.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";
import useAutoComplete from "../hooks/useAutoComplete";

function SearchBar({ searchWord, setSerachWord }) {
  const navigate = useNavigate();
  const [autoCompleteData, setData, deleteData] = useAutoComplete();
  const [focus, setFocus] = useState(false);

  const handleSearch = () => {
    if (searchWord === "") {
      navigate(`/`);
    } else {
      setData(searchWord);
      navigate(`/search/${searchWord}`, { replace: true });
    }
  };

  return (
    <header className="search-bar-container">
      <h1 id="text-title">SearchImg</h1>
      <div className="box-position">
        <div className="box-input">
          <div className={focus ? "inner-box-input focus" : "inner-box-input"}>
            <input
              className="input-search"
              value={searchWord}
              onChange={(e) => {
                setSerachWord(e.target.value);
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              onFocus={() => {
                setFocus(true);
              }}
              onBlur={() => {
                setFocus(false);
              }}
            />

            <FontAwesomeIcon
              className="icon-search"
              icon={faSearch}
              onClick={handleSearch}
            />
          </div>
          {focus && (
            <ul className="box-auto">
              {autoCompleteData.map((el, id) => {
                return (
                  <li className="list-auto" key={id}>
                    <span>{el}</span>
                    <FontAwesomeIcon
                      className="icon-delete"
                      icon={faXmark}
                      onMouseDown={async () => {
                        await deleteData(id);
                        await setFocus(true);
                      }}
                    />
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </header>
  );
}

export default SearchBar;
