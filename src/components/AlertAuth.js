import React from "react";
import "./AlertAuth.css";

function AlertAuth({ alert }) {
  return (
    <div className={alert ? "box-alert" : "box-alert-hidden"}>
      토큰 발급이 필요합니다.
    </div>
  );
}

export default AlertAuth;
