import React, { useState, useRef, useEffect } from "react";
import "./SearchBar.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";
import useAutoComplete from "../hooks/useAutoComplete";

function SearchBar({ searchWord, setSerachWord }) {
  const navigate = useNavigate();
  const [autoCompleteData, setData, deleteData] = useAutoComplete();
  const [focus, setFocus] = useState(false);
  const inputRef = useRef();

  const handleSearch = () => {
    if (searchWord === "") {
      navigate(`/`);
    } else {
      setData(searchWord);
      setSerachWord(searchWord);
      setFocus(false);
      document.activeElement.blur()
      navigate(`/search/${searchWord}`, { replace: true });
    }
  };

  const handleClickOutside = ({ target }) => {
    if (!inputRef.current.contains(target)) setFocus(false);
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <header className="search-bar-container">
      <h1 id="text-title">SearchImg</h1>
      <div className="box-position">
        <div className="box-input" ref={inputRef}>
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
                    <span onMouseDown={() => {
                      setSerachWord(el)
                      navigate(`/search/${el}`, { replace: true });
                      setFocus(false)
                    }}>{el}</span>
                    <FontAwesomeIcon
                      className="icon-delete"
                      icon={faXmark}
                      onMouseDown={() => {
                        deleteData(id);
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
