import React from "react";
import "./Paging.css";
import Pagination from "react-js-pagination";

function Paging({page, setPage, count}) {
  return (
    <div className="paging-container">
      <Pagination
        activePage={page}
        itemsCountPerPage={10}
        totalItemsCount={count}
        pageRangeDisplayed={5}
        prevPageText={"‹"}
        nextPageText={"›"}
        onChange={setPage}
      />
    </div>
  );
}

export default Paging;
