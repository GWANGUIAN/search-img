import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import axios from "axios";
import "./App.css";
import SearchBar from "./pages/SearchBar";
import ImageList from "./pages/ImageList";
import SearchList from "./pages/SearchList";
import NavBar from "./pages/NavBar";
import Authorization from "./pages/Authorization";
import ModalAuth from "./components/ModalAuth";
import NotFound from "./pages/NotFound";

function App() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState(false);

  const getToken = (code) => {
    setIsLoading(true);
    axios
      .post(`https://unsplash.com/oauth/token`, null, {
        params: {
          client_id: process.env.REACT_APP_ACCESS_KEY,
          client_secret: process.env.REACT_APP_SECRET_KEY,
          redirect_uri: process.env.REACT_APP_CLIENT_URI,
          code,
          grant_type: "authorization_code",
        },
      })
      .then((res) => {
        localStorage.setItem("userAccessToken", res.data.access_token);
        caches
          .keys()
          .then((c) => {
            for (const i of c) {
              caches.delete(i);
            }
          })
          .then(() => {
            window.location.replace("/");
          });
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const alertAuth = () => {
    setModal(true);
    setTimeout(() => {
      setModal(false);
    }, 1000);
  };

  useEffect(() => {
    const code = location.search.split("=")[1];
    if (code) {
      getToken(code);
    }
  }, []);
  const [searchWord, setSearchWord] = useState("");

  return (
    <div className="App">
      {isLoading && <Authorization />}
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <SearchBar searchWord={searchWord} setSearchWord={setSearchWord} />
          }
        />
        <Route
          path="/search/:word"
          element={
            <SearchBar searchWord={searchWord} setSearchWord={setSearchWord} />
          }
        />
                <Route
          path="*"
          element={
            <SearchBar searchWord={searchWord} setSearchWord={setSearchWord} />
          }
        />
      </Routes>
      <Routes>
        <Route path="/" element={<ImageList alertAuth={alertAuth} />} />
        <Route
          path="/search/:word"
          element={<SearchList alertAuth={alertAuth} />}
        />
        <Route path="/authorization" element={<Authorization />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {modal && <ModalAuth modal={modal} />}
    </div>
  );
}

export default App;
