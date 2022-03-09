import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./SearchList.css";
import ImgBox from "../components/ImgBox";
import Paging from "../components/Paging";
import { Loading, LoadingLike } from "../components/Loading";
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

  useEffect(() => {
    getData();
  }, [word]);

  useEffect(() => {
    getDataPage();
  }, [page]);

  return (
    <section className="search-list-container">
      {isLoading ? (
        <Loading />
      ) : searchData.results.length === 0 ? (
        <div id="text-none">일치하는 이미지가 없습니다.</div>
      ) : (
        <div className="box-images">
          {searchData.results.map((el, id) => {
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

      <Paging page={page} setPage={setPage} count={searchData.total} />
      {isLoadingLike && <LoadingLike />}
    </section>
  );
}

export default SearchList;
