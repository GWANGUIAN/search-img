import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./SearchList.css";
import ImgBox from "../components/ImgBox";
import Paging from "../components/Paging";
import Loading from "../components/Loading";
import { getSerachData } from "../utils/getSearchData";

function SearchList() {
  const { word } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchData, setSearchData] = useState({ results: [] });

  useEffect(async () => {
    setPage(1);
    setIsLoading(true);
    const data = await getSerachData(word);
    setSearchData(data);
    setIsLoading(false);
  }, [word]);

  useEffect(async () => {
    setIsLoading(true);
    const data = await getSerachData(word, page);
    setSearchData(data);
    setIsLoading(false);
  }, [page]);

  return (
    <section className="search-list-container">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="box-images">
          {searchData.results.map((el, id) => {
            return <ImgBox data={el} key={id} />;
          })}
        </div>
      )}

      <Paging page={page} setPage={setPage} count={searchData.total} />
    </section>
  );
}

export default SearchList;
