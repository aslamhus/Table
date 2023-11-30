import React from 'react';
import ShortPagination from './ShortPagination';
import LongPagination from './LongPagination';

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

export default PageList;
