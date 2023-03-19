import React, { useEffect, useRef } from 'react';
import SelectCheckbox from './SelectCheckbox';
import Cell from '../Cell/Cell';
import { useTable } from '../hooks/useTable';
import './cells.css';

const Cells = ({ rowData, rowId, children, selected }) => {
  const {
    handleSelect,
    state: { orderOption, enableCheckbox, headers },
  } = useTable();
  const cellsContainerRef = useRef();

  const renderEachCell = () => {
    // custom Cells
    if (children) return children;
    // default Cells
    // console.log('rowData', rowData);
    console.log('header keys', headers.keys());
    const cells = [];
    headers.forEach((value, key) => cells.push(key));
    console.log('cells', cells);
    return cells.map((key, index) => {
      //   if (key == 'uuid') return null;
      const header = headers.get(key);
      const value = rowData[key];
      console.log('header', header, value);
      return (
        <Cell key={`cell-${key}-${index}-rowId`} size={header.size}>
          <p>{value}</p>
        </Cell>
      );
    });
  };

  /**
   * Add column id to any children of row component that are cells.
   */
  useEffect(() => {
    if (cellsContainerRef.current) {
      const cells = cellsContainerRef.current.querySelectorAll('.cell');
      Array.from(cells).forEach((cell, index) => {
        const id = index + 1;
        cell.dataset.columnId = id;
        if (orderOption?.columnId == id) {
          cell.classList.add('cell-highlight');
        } else {
          cell.classList.remove('cell-highlight');
        }
      });
    }
  }, [children]);

  return (
    <div ref={cellsContainerRef} className="table-row-cells">
      {renderEachCell()}
      {/* {children} */}
      {enableCheckbox && (
        <SelectCheckbox
          isSelected={selected}
          handleSelect={() => {
            if (rowId) {
              handleSelect(rowId);
            } else {
              console.error("couldn't select SelectCheckbox, no id found");
            }
          }}
        />
      )}
    </div>
  );
};

export default Cells;
