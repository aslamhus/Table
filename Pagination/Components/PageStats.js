import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

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

export default PageStats;
