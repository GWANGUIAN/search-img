import React from "react";
import "./ModalAuth.css";

function ModalAuth({ modal }) {
  return (
    <div className={modal ? "box-modal" : "box-modal hidden"}>
      토큰 발급이 필요합니다.
    </div>
  );
}

export default ModalAuth;
