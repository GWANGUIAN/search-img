import React, { useState, useEffect, useCallback } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import "./App.css";
import SearchBar from "./pages/SearchBar";
import ImageList from "./pages/ImageList";
import SearchList from "./pages/SearchList";
import NavBar from "./pages/NavBar";
import Authorization from "./pages/Authorization";
import ModalAuth from './components/ModalAuth';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)
  const [modal, setModal] = useState(false)

  const getToken = useCallback(async() => {
    const code = location.search.split("=")[1];
    if(code) {
      await setIsLoading(true)
      await axios
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
        localStorage.setItem('userAccessToken', res.data.access_token);
        navigate("/")
        
      })
      .catch((err) => console.log(err));
      await setIsLoading(false)
    }
  }, [location]);

  const alertAuth = () => {
    setModal(true);
    setTimeout(() => {
      setModal(false);
    }, 1000);
  };

  useEffect(() => {
    getToken();
  }, [getToken]);
  const [searchWord, setSerachWord] = useState('');

  return (
    <div className="App">
      {isLoading&&<Authorization/>}
      <NavBar />
      <SearchBar searchWord={searchWord} setSerachWord={setSerachWord} />
      <Routes>
        <Route path="/" element={<ImageList alertAuth={alertAuth}/>} />
        <Route path="/search/:word" element={<SearchList alertAuth={alertAuth}/>}/>
        <Route path="/authorization" element={<Authorization/>} />
      </Routes>
      {modal&&<ModalAuth modal={modal}/>}
    </div>
  );
}

export default App;
