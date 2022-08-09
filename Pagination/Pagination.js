import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import './pagination.css';

export default function Pagination({ pagination, dropdownList, onPageChange, onDropdownChange }) {
  const { page, pageLimit, totalItems } = pagination;
  if (!totalItems || totalItems == 0) return null;
  const totalPages = Math.ceil(totalItems / pageLimit);
  return (
    <div className="pagination">
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
  const handlePageChange = (page) => {
    if (page != currentPage) {
      onPageChange(page);
    }
  };
  return (
    <div className="pagination-page-list">
      {totalPages > 1 &&
        Array.from(Array.from(Array(totalPages).keys())).map((key) => {
          const page = key + 1;
          return (
            <button
              key={`pagination-btn-${page}`}
              className={`
                pagination-btn
                ${currentPage == page ? 'current-page' : ''}
            `}
              onClick={(event) => {
                event.preventDefault();
                handlePageChange(page);
              }}
            >
              {page}
            </button>
          );
        })}
    </div>
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
    if (totalPages == 1) {
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
