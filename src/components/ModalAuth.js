import React from "react";
import "./ModalAuth.css";

function ModalAuth({ modal }) {
  return (
    <div className={modal ? "box-modal" : "box-modal hidden"}>
      유저 인증이 필요합니다.
    </div>
  );
}

export default ModalAuth;
