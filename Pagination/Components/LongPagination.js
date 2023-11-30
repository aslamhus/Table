import React from 'react';
import PageButton from './PageButton';
import GoToPageInput from './GoToPageInput';
import { createArrayOfLength } from '../utils';

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
  const rangeLimit = 3;
  if (rangeLimit % 2 === 0) {
    throw new Error('pagination rangeLimit should be an odd number');
  }

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
          {createArrayOfLength(rangeLimit).map((index) => {
            const page = index + currentPage - Math.floor(rangeLimit / 2);
            // to center the current page, we need to subtract half of the rangeLimit (Math.ceil(5 / 2) = 3))
            // for range limit 5 on page 5
            // 0 + 5 - 1 = 4
            // 1 + 5 - 1 = 5 (current page)
            // 2 + 5 - 1 = 6
            // 3 + 5 - 1 = 7
            // 4 + 5 - 1 = 8

            return renderPageButton(page);
          })}
        </>
      )}
      {/* Last page ... 10  */}
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
      {/* Go to page input */}
      <GoToPageInput
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
    </>
  );
};

export default LongPagination;
