import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { createArrayOfLength } from './utils';
import './pagination.css';

/**
 * Pagination
 * v2.0.0
 *
 * TODO:
 * - add prop types
 * - add comments
 * - add context so that user doesn't have to pass pagination, dropdownList, onDropdownChange, onPageChange
 *
 * @component
 * @returns
 */
export default function Pagination({
  pagination: { page, pageLimit, totalItems },
  dropdownList,
  onDropdownChange,
  onPageChange,
}) {
  if (!totalItems || totalItems === 0) return null;
  const totalPages = Math.ceil(totalItems / pageLimit);
  return (
    <div className="pagination" aria-label="pagination container">
      <PageList currentPage={page} totalPages={totalPages} onPageChange={onPageChange} />
      <PageStats
        currentPage={page}
        totalPages={totalPages}
        pageLimit={pageLimit}
        totalItems={totalItems}
        dropdownList={dropdownList}
        onDropdownChange={onDropdownChange}
      />
    </div>
  );
}

const PageList = ({ currentPage, totalPages, onPageChange }) => {
  const shortPaginationLimit = 10;
  const handlePageChange = (page) => {
    if (page != currentPage) {
      onPageChange(page);
    }
  };
  return (
    <div className="pagination-page-list" aria-label="all pages">
      {/* Pages less than or equal to 5 */}
      {totalPages > 1 && totalPages <= shortPaginationLimit && (
        <ShortPagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      )}
      {/* Pages greater than 5 */}
      {totalPages > shortPaginationLimit && (
        <LongPagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      )}
    </div>
  );
};

/**
 * Short pagination
 *
 * For total pages less than 10
 * @component
 * @returns
 */
const ShortPagination = ({ currentPage, totalPages, handlePageChange }) =>
  createArrayOfLength(totalPages).map((key) => {
    const page = key + 1;
    return (
      <PageButton
        key={`index-${page}`}
        currentPage={currentPage}
        page={page}
        handlePageChange={handlePageChange}
      />
    );
  });

/**
 * Long Pagination
 *
 * Note that currentPage is not zero indexed (i.e. it starts at 1)
 * @component
 * @returns
 */
const LongPagination = ({ currentPage, totalPages, handlePageChange }) => {
  /**
   * range limit should be odd number, so that the current page is centred evenly
   * i.e. rangeLimit = 5 => firstPage, ... page, page, [current], page, page ... lastpage
   *  */
  const rangeLimit = 5;

  /**
   * Render page button
   *
   * @param {number} page - the page number
   * @returns
   */
  const renderPageButton = (page, styles = {}) => (
    <PageButton
      key={`index-${page}`}
      style={styles}
      currentPage={currentPage}
      page={page}
      handlePageChange={handlePageChange}
    />
  );

  const Ellipsis = () => (
    <span className="pagination-ellipsis" aria-describedby="many pages">
      ...
    </span>
  );

  return (
    <>
      {/* First pages */}
      {currentPage < rangeLimit && (
        <>
          {/* Left pages [1] and 1,[2] and 1,2, [3] */}
          {createArrayOfLength(currentPage).map((index) => renderPageButton(index + 1))}
          {/* Right pages [1],2,3 and [2],3, */}
          {createArrayOfLength(rangeLimit - currentPage).map((index) =>
            renderPageButton(index + 1 + currentPage)
          )}
        </>
      )}
      {/* First page ...  */}
      {currentPage >= rangeLimit && (
        <>
          {renderPageButton(1)}
          <Ellipsis />
        </>
      )}
      {/* 
         In between pages
         firstPage ... -1, [currentPage], + 1 ... lastPage
       */}
      {currentPage >= rangeLimit && currentPage <= totalPages - rangeLimit + 1 && (
        <>
          {createArrayOfLength(3).map((index) => {
            const page = index + currentPage - 1;
            return renderPageButton(page);
          })}
        </>
      )}
      {/* Last page ...0  */}
      {currentPage <= totalPages - rangeLimit + 1 && (
        <>
          <Ellipsis />
          {renderPageButton(totalPages)}
        </>
      )}
      {/* Last pages */}
      {currentPage > totalPages - rangeLimit + 1 && (
        <>
          {/* 
            Left pages
            Sequence of pages to the left: 2, 1, 0
            For example:
            19, 18, [20]
            19, [20]
            [20]
          
            */}
          {createArrayOfLength(currentPage - totalPages + rangeLimit - 1)
            .reverse()
            .map((index) => {
              // page on the right
              const page = currentPage - (index + 1);
              return renderPageButton(page);
            })}
          {/* 
           Right pages
           Sequence of pages to the right: 0, 1, 2
           For example:
            [20]
            [19],20
            [18],19,20
          */}
          {createArrayOfLength(totalPages - (currentPage - 1)).map((index) => {
            // page on the right
            const page = currentPage + index;
            return renderPageButton(page);
          })}
        </>
      )}
    </>
  );
};

const PageButton = ({ currentPage, page, handlePageChange, style }) => {
  return (
    <button
      key={`pagination-btn-${page}`}
      style={style}
      aria-label={`Go to page ${page}`}
      className={`pagination-btn  ${currentPage === page ? 'current-page' : ''} `}
      onClick={(event) => {
        event.preventDefault();
        handlePageChange(page);
      }}
    >
      {page}
    </button>
  );
};

const PageStats = ({
  currentPage,
  totalPages,
  pageLimit,
  totalItems,
  dropdownList,
  onDropdownChange,
}) => {
  let hi = currentPage * pageLimit;
  const lo = hi - pageLimit + 1;
  if (hi > totalItems) hi = totalItems;

  const handleDropDownChange = (item) => {
    if (onDropdownChange instanceof Function) {
      onDropdownChange(item);
    }
  };

  const displayNumberOfItems = () => {
    if (totalPages === 1) {
      return `Displaying ${totalItems} results`;
    }
    return `Displaying ${lo} to ${hi} of ${totalItems} results`;
  };

  return (
    <div className="pagination-page-stats">
      <em>{displayNumberOfItems()}</em>
      <Dropdown>
        <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
          Results per page
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {dropdownList.map((item) => {
            return (
              <Dropdown.Item
                key={`dropdown-key-${item}`}
                onClick={(event) => handleDropDownChange(item)}
              >
                {item}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};
