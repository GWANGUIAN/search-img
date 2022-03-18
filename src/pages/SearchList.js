import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router";
import "./SearchList.css";
import ImgData from "../components/ImgData";
import Paging from "../components/Paging";
import Loading from "../components/Loading";
import getSerachData from "../utils/getSearchData";

function SearchList({ alertAuth }) {
  const { word } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingLike, setIsLoadingLike] = useState(false);
  const [page, setPage] = useState(1);
  const [searchData, setSearchData] = useState({ results: [] });

  const getData = async () => {
    setPage(1);
    setIsLoading(true);
    const data = await getSerachData(word);
    setSearchData(data);
    setIsLoading(false);
  };

  const getDataPage = async () => {
    setIsLoading(true);
    const data = await getSerachData(word, page);
    setSearchData(data);
    setIsLoading(false);
  };

  const getNewData = async () => {
    const data = await getSerachData(word, page, true);
    setSearchData(data);
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
      setIsLoadingLike(false)
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, [word]);

  useEffect(() => {
    getDataPage();
  }, [page]);

  return (
    <section className="search-list-container">
      {isLoading ? (
        <Loading transparency={false} />
      ) : searchData.results.length === 0 ? (
        <div id="text-none">일치하는 이미지가 없습니다.</div>
      ) : (
        <div className="box-images">
          {searchData.results.map((el, id) => {
            return <ImgData updateLike={updateLike} data={el} key={id} />;
          })}
        </div>
      )}

      <Paging page={page} setPage={setPage} count={searchData.total} />
      {isLoadingLike && <Loading transparency={true} />}
    </section>
  );
}

export default SearchList;
