import React from "react";
import "./ImgBox.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as like } from "@fortawesome/free-solid-svg-icons";
import { faHeart as unLike } from "@fortawesome/free-regular-svg-icons";

function ImgBox({ data }) {
  return (
    <div className="img-box-container">
      <a href={data.links.html} target="_blank" rel="noopener noreferrer">
        <img src={data.urls.thumb} alt="img-thumb" />
      </a>
      <div className="info-img">
        {data.liked_by_user ? (
          <FontAwesomeIcon className="icon-like" icon={like} />
        ) : (
          <FontAwesomeIcon className="icon-like" icon={unLike} />
        )}
        <span className="num-likes">{data.likes}</span>
      </div>
    </div>
  );
}

export default ImgBox;
