import React from 'react';
import PageButton from './PageButton';
import { createArrayOfLength } from '../utils';

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

export default ShortPagination;
