import React, {useState, useEffect} from "react";
import "./ImageList.css";
import ImgBox from "../components/ImgBox";
import { getData } from '../utils/getData';

function ImageList({alertAuth}) {

  const [imgData, setImgData] = useState([])

  const getNewData = async() => {
    const data = await getData()
    setImgData(data)
  }

  useEffect(()=>{
    getNewData()
  },[])

  return (
    <section className="image-list-container">
      <div className="box-images">
        {imgData.map((el,id) => {
          return <ImgBox alertAuth={alertAuth} getNewData={getNewData} data={el} key={id}/>;
        })}
      </div>
    </section>
  );
}

export default ImageList;
