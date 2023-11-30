import React from 'react';

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

export default PageButton;
