import React from "react";
import "./ImageList.css";
import {defalut} from "../dummyData";
import ImgBox from "../components/ImgBox";

function ImageList() {
  return (
    <section className="image-list-container">
      <div className="box-images">
        {defalut.map((el,id) => {
          return <ImgBox data={el} key={id}/>;
        })}
      </div>
    </section>
  );
}

export default ImageList;
