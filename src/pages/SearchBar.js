import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router";
import "./SearchBar.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";
import useAutoComplete from "../hooks/useAutoComplete";

function SearchBar({ searchWord, setSearchWord }) {
  const navigate = useNavigate();
  const { word } = useParams();
  const [autoCompleteData, addData, deleteData] = useAutoComplete();
  const [focus, setFocus] = useState(false);
  const inputRef = useRef();

  const handleSearch = () => {
    if (searchWord === "") {
      navigate(`/`);
    } else {
      addData(searchWord);
      setSearchWord(searchWord);
      setFocus(false);
      document.activeElement.blur()
      navigate(`/search/${searchWord}`, { replace: true });
    }
  };

  const handleClickOutside = ({ target }) => {
    if (!inputRef.current.contains(target)) setFocus(false);
  };

  useEffect(() => {
    if(word) {
      setSearchWord(word)
    }
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <header className="search-bar-container">
      <h1 id="text-title" onClick={()=>{window.location.replace('/')}}>SearchImg</h1>
      <div className="box-position">
        <div className="box-input" ref={inputRef}>
          <div className={focus&& autoCompleteData.length!==0 ? "inner-box-input focus" : "inner-box-input"}>
            <input
              className="input-search"
              value={searchWord}
              onChange={(e) => {
                setSearchWord(e.target.value);
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
          {focus && autoCompleteData.length!==0&& (
            <ul className="box-auto">
              {autoCompleteData.map((el, id) => {
                return (
                  <li className="list-auto" key={id}>
                    <span onMouseDown={() => {
                      setSearchWord(el)
                      navigate(`/search/${el}`, { replace: true });
                      setFocus(false)
                    }}>{el}</span>
                    <FontAwesomeIcon
                      className="icon-delete"
                      icon={faXmark}
                      onMouseDown={() => {
                        deleteData(el);
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
