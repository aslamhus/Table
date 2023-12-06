import React, { useCallback, useEffect, useState, useMemo } from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { useTable } from '../hooks/useTable';
import './title-bar.css';

export default function TitleBar({
  title,
  onFilterChange,
  initialFilterValue = '',
  filterTitle = 'Filter',
  onDelete,
  children,
}) {
  const {
    isSelected,
    removeRows,
    setFilterValue,
    state: { data, selectedRows, filter },
  } = useTable();

  const [deleting, setDeleting] = useState(false);

  const handleDelete = async (event) => {
    if (onDelete instanceof Function) {
      /**
       * calls client defined onDelete method with
       * an array of ids of the selected rows
       */
      setDeleting(true);
      const selectedRowsArray = Object.keys(selectedRows);
      await Promise.resolve(onDelete(getSelectedRowData(selectedRowsArray)))
        .catch((error) => {
          console.error('there was an error thrown from onDelete');
        })
        .then(() => {
          removeRows(selectedRowsArray);
        });
      setDeleting(false);
    }
  };

  const getSelectedRowData = (selectedRowsArray) => {
    return selectedRowsArray.reduce((acc, rowId) => {
      const index = rowId - 1;
      acc.push(data[index]);
      return acc;
    }, []);
  };

  const debounce = (fn, delay) => {
    let timeout;

    return (...args) => {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        fn.call(this, ...args);
      }, delay);
    };
  };

  const handleFilterCallback = (value) => {
    if (onFilterChange instanceof Function) {
      onFilterChange(value);
    }
  };

  const debounceFilterCallback = useCallback(debounce(handleFilterCallback, 2000), []);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setFilterValue(value);
    debounceFilterCallback(value);
  };

  useEffect(() => {
    if (initialFilterValue) {
      setFilterValue(initialFilterValue);
    }
  }, []);

  return (
    <div className="title-bar">
      {title && <h3>{title}</h3>}
      <div className="table-sticky-buttons">
        {/* Filter input (only display if onFilterChange set) */}
        {onFilterChange && (
          <div className="filter">
            <label htmlFor="filter">{filterTitle}</label>
            <input type="text" name="filter" value={filter} onChange={handleChange}></input>
          </div>
        )}
        {children}
        {isSelected && isSelected() ? (
          <>
            <Button
              title="delete selected rows"
              onClick={handleDelete}
              className="danger"
              disabled={deleting}
            >
              Delete <i className="fas fa-trash" />{' '}
              {deleting && <Spinner animation="border" outline="none" size="sm" />}
            </Button>
          </>
        ) : null}
      </div>
    </div>
  );
}
