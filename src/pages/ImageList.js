import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./ImageList.css";
import ImgData from "../components/ImgData";
import Loading from "../components/Loading";
import getDataList from "../utils/getDataList";

function ImageList({ alertAuth }) {
  const [imgData, setImgData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingLike, setIsLoadingLike] = useState(false);

  const getData = async () => {
    setIsLoading(true);
    const data = await getDataList();
    setImgData(data);
    setIsLoading(false);
  };

  const getNewData = async () => {
    const data = await getDataList();
    setImgData(data);
    setIsLoadingLike(false);
  };

  const updateLike = (cancel, id) => {
    const token = localStorage.getItem("userAccessToken");
    try {
      if (token && !cancel) {
        setIsLoadingLike(true);
        axios
          .post(`https://api.unsplash.com/photos/${id}/like`, null, {
            headers: {
              Authorization:
                "Bearer " + localStorage.getItem("userAccessToken"),
            },
          })
          .then(() => {
            getNewData();
          });
      } else if (token && cancel) {
        setIsLoadingLike(true);
        axios
          .delete(`https://api.unsplash.com/photos/${id}/like`, {
            headers: {
              Authorization:
                "Bearer " + localStorage.getItem("userAccessToken"),
            },
          })
          .then(() => {
            getNewData();
          });
      } else {
        alertAuth();
      }
    } catch (err) {
      console.log(err);
      setIsLoadingLike(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <section className="image-list-container">
      {isLoading ? (
        <Loading transparency={false} />
      ) : (
        <div className="box-images">
          {imgData.map((el, id) => {
            return <ImgData updateLike={updateLike} data={el} key={id} />;
          })}
        </div>
      )}
      {isLoadingLike && <Loading transparency={true} />}
    </section>
  );
}

export default ImageList;
