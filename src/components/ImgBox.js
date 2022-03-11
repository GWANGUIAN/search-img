import React from "react";
import axios from "axios";
import "./ImgBox.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as like } from "@fortawesome/free-solid-svg-icons";
import { faHeart as unLike } from "@fortawesome/free-regular-svg-icons";

// TODO: 화살표 함수로 변경, data 등 용도를 파악할수 없는 프라퍼티 이름 변경
function ImgBox({ data, getNewData, alertAuth, setIsLoadingLike }) {

  // TODO: submitLike, cancelLike 두 메서드 내용은 post, delete 호출 부분만 다르므로 updateLike 등의 이름으로 변경하여 하나의 메서드로 통합
  // TODO: submitLike, cancelLike 를 부모 컴포넌트에서 prop 으로 내려주고 ImgBox 는 렌더링만 담당하는 것이 보다 직관적
  const submitLike = () => {
    const token = localStorage.getItem("userAccessToken");
    if (token) {
      setIsLoadingLike(true);
      // TODO: catch 적용, 오류 발생 시 loading flag 를 false 로 변경
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
      {/* 버튼 기능은 button tag 를 사용 */}
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
