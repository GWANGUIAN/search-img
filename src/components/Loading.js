import React from "react";
import "./Loading.css";

const Loading = ({ transparency }) => {
  return (
    <div
      className={transparency ? "loading-like-container" : "loading-container"}
    >
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

export default Loading