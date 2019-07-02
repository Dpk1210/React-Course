import React from "react";
import propTypes from "prop-types";
import _ from "lodash";

const Pagination = props => {
  const { itemsCount, pageSize, currentPage, onPageChange } = props;
  //console.log(currentPage);

  const pagesCount = Math.ceil(itemsCount / pageSize);
  // const pagesCount = itemsCount / pageSize;
  //console.log(pagesCount, itemsCount);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);
  //console.log("pagesCount", pagesCount);
  return (
    <nav>
      <ul className="pagination">
        {pages.map(page => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: propTypes.number.isRequired,
  pageSize: propTypes.number.isRequired,
  currentPage: propTypes.number.isRequired,
  onPageChange: propTypes.func.isRequired
};

export default Pagination;
