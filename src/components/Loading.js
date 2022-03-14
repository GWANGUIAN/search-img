import React from "react";
import "./Loading.css";

// TODO: 화살표 함수로 변경
// TODO: Loading, LoadingLike 는 className 프라퍼티만 다르므로 하나의 메서드로 통합하고 className 은 프라퍼티로 전달
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

// TODO: 화살표 함수로 변경
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