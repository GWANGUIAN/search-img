import React from "react";
import "./AlertAuth.css";

// TODO: arrow function 으로 변경
function AlertAuth({ alert }) {
  return (
    <div className={alert ? "box-alert" : "box-alert-hidden"}>
      토큰 발급이 필요합니다.
    </div>
  );
}

export default AlertAuth;
