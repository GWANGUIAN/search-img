import React from "react";
import axios from "axios";
import "./ImgBox.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as like } from "@fortawesome/free-solid-svg-icons";
import { faHeart as unLike } from "@fortawesome/free-regular-svg-icons";

function ImgBox({ data, getNewData, alertAuth, setIsLoadingLike }) {
  const submitLike = () => {
    const token = localStorage.getItem("userAccessToken");
    if (token) {
      setIsLoadingLike(true)
      axios
        .post(`https://api.unsplash.com/photos/${data.id}/like`, null, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("userAccessToken"),
          },
        })
        .then(() => {
          getNewData();
        })
    } else {
      alertAuth();
    }
  };

  const cancelLike = () => {
    const token = localStorage.getItem("userAccessToken");
    if (token) {
      setIsLoadingLike(true)
      axios
        .delete(`https://api.unsplash.com/photos/${data.id}/like`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("userAccessToken"),
          },
        })
        .then(() => {
          getNewData();
        });
    } else {
      alertAuth();
    }
  };

  return (
    <div className="img-box-container">
      <a href={data.links.html} target="_blank" rel="noopener noreferrer">
        <img src={data.urls.thumb} alt="img-thumb" />
      </a>
      <div className="info-img">
        {data.liked_by_user ? (
          <FontAwesomeIcon
            className="icon-like"
            icon={like}
            onClick={cancelLike}
          />
        ) : (
          <FontAwesomeIcon
            className="icon-unlike"
            icon={unLike}
            onClick={submitLike}
          />
        )}
        <span className="num-likes">{data.likes}</span>
      </div>
    </div>
  );
}

export default ImgBox;
