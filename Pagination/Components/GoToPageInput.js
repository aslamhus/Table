import React, { useState } from 'react';

/**
 * Go to page input
 *
 *
 * @component
 */
const GoToPageInput = ({ totalPages, currentPage, handlePageChange }) => {
  const [value, setValue] = useState(1);

  const handleInputChange = (event) => {
    const {
      target: { value },
    } = event;
    // do nothing if value is the same as the current page
    if (value === currentPage) return;
    // if value is greater than total pages, set value to total pages
    if (value > totalPages) {
      setValue(totalPages);
      return;
    }
    setValue(value);
  };

  const handleGoToPage = () => {
    console.log('go to page', value);
    handlePageChange(parseInt(value));
  };
  return (
    <div className="go-to-page-container">
      Go to page{' '}
      <input type="number" min={1} max={totalPages} value={value} onChange={handleInputChange} />
      <button type="button" aria-label="go to page button" onClick={handleGoToPage}>
        {'Go >'}
      </button>
    </div>
  );
};

export default GoToPageInput;
