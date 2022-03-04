import React, { useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Authorization.css";

function Authorization() {
  const location = useLocation();
  const navigate = useNavigate();

//   const getToken = useCallback(() => {
//     const code = location.search.split("=")[1];
//     axios
//       .post(`https://unsplash.com/oauth/token`, "", {
//         params: {
//           client_id: process.env.REACT_APP_ACCESS_KEY,
//           client_secret: process.env.REACT_APP_SECRET_KEY,
//           redirect_uri: process.env.REACT_APP_CLIENT_URI,
//           code,
//           grant_type: "authorization_code",
//         },
//       })
//       .then((res) => {
//         localStorage.setItem('userAccessToken', res.data.access_token);
//         navigate("/")
//       })
//       .catch((err) => console.log(err));
//   }, [location]);

//   useEffect(() => {
//     getToken();
//   }, [getToken]);

  return (
    <div className="authorization-container">
      <img src="img/loading.svg" alt="img-loading" />
    </div>
  );
}

export default Authorization;
