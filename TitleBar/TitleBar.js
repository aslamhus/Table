import React, { useCallback, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { useTable } from '../hooks/useTable';
import './title-bar.css';

export default function TitleBar({ title, onFilterChange, onDelete, children }) {
  const {
    isSelected,
    removeRows,
    state: { data, selectedRows },
  } = useTable({});

  const [filterInputValue, setFilterInputValue] = useState('');
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async (event) => {
    if (onDelete instanceof Function) {
      /**
       * calls client defined onDelete method with
       * an array of ids of the selected rows
       */
      setDeleting(true);
      console.log('selectedRows', selectedRows);
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

  const debounceSetFilterOption = useCallback(
    debounce(function (value) {
      if (onFilterChange instanceof Function) {
        onFilterChange(value);
      }
    }, 1000),
    []
  );

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setFilterInputValue(value);
    debounceSetFilterOption(value);
  };

  return (
    <div className="title-bar">
      {title && <h3>{title}</h3>}
      <div className="table-sticky-buttons">
        {onFilterChange && (
          <div className="filter">
            <label htmlFor="filter">Filter</label>
            <input
              type="text"
              name="filter"
              value={filterInputValue}
              onChange={handleChange}
            ></input>
          </div>
        )}
        {children}
        {isSelected && isSelected() ? (
          <>
            <Button
              title="delete feedbac"
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
