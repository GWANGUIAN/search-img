import React, { useState, useEffect } from "react";
import "./Paging.css";
import Pagination from "react-js-pagination";

const Paging = ({ page, setPage, count }) => {
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowSize(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="paging-container">
      <Pagination
        activePage={page}
        itemsCountPerPage={10}
        totalItemsCount={count}
        pageRangeDisplayed={windowSize>=400 ? 5 : 3}
        prevPageText={"‹"}
        nextPageText={"›"}
        onChange={setPage}
      />
    </div>
  );
};

export default Paging;
