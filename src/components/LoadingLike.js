import React from "react";
import "./LoadingLike.css";

function LoadingLike({isLoadingLike}) {
  return (
    <div className="loading-like-container" style={{display : isLoadingLike ? '' : 'none'}}>
      <img
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
