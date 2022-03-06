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
          인증 하기
        </a>
      ) : isAuthorized === 1 ? (
        <div
          id="btn-delete-token"
          onClick={() => {
            localStorage.removeItem("userAccessToken");
            caches
              .keys()
              .then((c) => {
                for (const i of c) {
                  caches.delete(i);
                }
              })
              .then(() => {
                window.location.reload(true);
              });
          }}
        >
          인증 취소
        </div>
      ) : (
        ""
      )}
    </nav>
  );
}

export default NavBar;
