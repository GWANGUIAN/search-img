import React from "react";
import "./ImgData.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as like } from "@fortawesome/free-solid-svg-icons";
import { faHeart as unLike } from "@fortawesome/free-regular-svg-icons";

const ImgData = ({ data, updateLike }) => {

  return (
    <div className="img-data-container">
      <a href={data.links.html} target="_blank" rel="noopener noreferrer">
        <img src={data.urls.thumb} alt="img-thumb" />
      </a>
      <div className="info-img">
        {data.liked_by_user ? (
          <FontAwesomeIcon
            className="icon-like"
            icon={like}
            onClick={() => {
              updateLike(data.liked_by_user, data.id);
            }}
          />
        ) : (
          <FontAwesomeIcon
            className="icon-unlike"
            icon={unLike}
            onClick={() => {
              updateLike(data.liked_by_user, data.id);
            }}
          />
        )}
        <span className="num-likes">{data.likes}</span>
      </div>
    </div>
  );
};

export default ImgData;
