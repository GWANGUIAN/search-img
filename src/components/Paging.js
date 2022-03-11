import React from "react";
import "./Paging.css";
import Pagination from "react-js-pagination";

// TODO: 화살표 함수로 변경, itemsCountPerPage 값을 10으로 고정할 경우 모바일 화면에서는 적합하지 않으므로 무한스크롤 등으로 변경
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
