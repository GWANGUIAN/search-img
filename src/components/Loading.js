import React from "react";
import "./Loading.css";

export function Loading() {
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

export function LoadingLike() {
  return (
    <div className="loading-like-container">
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