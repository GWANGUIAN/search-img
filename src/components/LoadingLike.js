import React from "react";
import "./LoadingLike.css";

function LoadingLike() {
  return (
    <div className="loading-like-container">
      <img
      className='loading'
        src="img/loading.svg"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "../img/loading.svg";
        }}
        alt="img-loading"
      />
    </div>
  );
}

export default LoadingLike;
