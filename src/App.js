import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import SearchBar from "./pages/SearchBar";
import ImageList from "./pages/ImageList";
import SearchList from "./pages/SearchList";
import NavBar from "./pages/NavBar";
import Authorization from "./pages/Authorization";

function App() {
  const [searchWord, setSerachWord] = useState('');

  return (
    <div className="App">
      <NavBar />
      <SearchBar searchWord={searchWord} setSerachWord={setSerachWord} />
      <Routes>
        <Route path="/" element={<ImageList />} />
        <Route path="/search/:word" element={<SearchList />}/>
        <Route path="/authorization" element={<Authorization />} />
      </Routes>
    </div>
  );
}

export default App;
