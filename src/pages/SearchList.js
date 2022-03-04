import React, { useState } from "react";
import "./SearchList.css";
import { search } from "../dummyData";
import ImgBox from "../components/ImgBox";
import Paging from "../components/Paging";

function SearchList() {
  const [page, setPage] = useState(1);

  return (
    <section className="search-list-container">
      <div className="box-images">
        {search.results.map((el, id) => {
          return <ImgBox data={el} key={id} />;
        })}
      </div>
      <Paging page={page} setPage={setPage} count={search.total} />
    </section>
  );
}

export default SearchList;
