import React, { useState, useEffect } from "react";
import "./NavBar.css";

function NavBar() {
  const [isAuthorized, setIsAuthorized] = useState(0);
  const localToken = localStorage.getItem("userAccessToken") || false;

  useEffect(() => {
    if (localToken) {
      setIsAuthorized(1);
    } else {
      setIsAuthorized(2);
    }
  }, [localToken]);

  return (
    <nav className="navbar-container">
      {isAuthorized === 2 ? (
        <a
          href={`https://unsplash.com/oauth/authorize?client_id=${process.env.REACT_APP_ACCESS_KEY}&redirect_uri=${process.env.REACT_APP_CLIENT_URI}&response_type=code&scope=public+write_likes`}
          id="btn-token"
        >
          유저 인증
        </a>
      ) : isAuthorized === 1 ? (
        <div id="complete-token">인증 완료</div>
      ) : (
        ""
      )}
    </nav>
  );
}

export default NavBar;
