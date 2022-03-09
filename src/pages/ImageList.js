import React, { useState, useEffect } from "react";
import "./ImageList.css";
import ImgBox from "../components/ImgBox";
import { Loading, LoadingLike } from "../components/Loading";
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
    setIsLoadingLike(false)
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <section className="image-list-container">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="box-images">
          {imgData.map((el, id) => {
            return (
              <ImgBox
                alertAuth={alertAuth}
                getNewData={getNewData}
                setIsLoadingLike={setIsLoadingLike}
                data={el}
                key={id}
              />
            );
          })}
        </div>
      )}
      {isLoadingLike && <LoadingLike />}
    </section>
  );
}

export default ImageList;
