import React from "react";
import "./Loading.css";

function Loading() {
  return (
    <div className="loading-container">
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

export default Loading;
