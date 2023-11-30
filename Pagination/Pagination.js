import React from 'react';
import PageList from './Components/PageList';
import PageStats from './Components/PageStats';
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
