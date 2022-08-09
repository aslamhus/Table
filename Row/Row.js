import React, { useEffect, useRef } from 'react';
import { findByType } from '../utils/utils';
import SelectCheckbox from './SelectCheckbox';
/**
 * 
 * Table Row
 * 
 * requires rowId prop for selecting and deleting rows
 * Accepts children only within subcomponents LeadingButtons, TrailingButtons
 * and Cells.
 * 
 * The Cells subcomponent will append the row checkbox 
 * 
 * @component
 * @example
 * 
 * 
 *  {myData.map((data) => {
        return (
          <Table.Row key={data.id} rowId={data.id}>
            <p>I'm a table row</p>
          </Table.Row>
        );
      })}
 */
function Row({ rowId, className, handleSelect, selectedRows, children, as, orderOption }) {
  const selected = selectedRows?.[rowId];
  const TagName = as || 'div';

  const render = (ComponentType, props) => {
    let [child] = findByType(children, ComponentType);
    if (child) {
      return <ComponentType {...props}>{child.props.children}</ComponentType>;
    }
    return null;
  };

  const renderCells = (props) => {
    let [child] = findByType(children, Cells);
    if (child) {
      return <Cells {...props}>{child.props.children}</Cells>;
    }
    return null;
  };

  return (
    <TagName
      id={`row-${rowId}`}
      className={`
        table-row 
        ${className ? className : ''}
         ${selected ? 'selected' : ''}`}
    >
      <div className="table-row-btn-wrapper">
        <div className="table-left-btns-container">{render(LeadingButtons)}</div>
        {renderCells({ rowId, selected, handleSelect, orderOption })}

        <div className="table-right-btns-container">{render(TrailingButtons)}</div>
      </div>
      {render(Footer)}
    </TagName>
  );
}

const LeadingButtons = ({ children }) => {
  return children;
};

const TrailingButtons = ({ children }) => {
  return children;
};

const Cells = ({ rowId, children, selected, handleSelect, orderOption }) => {
  const cellsContainerRef = useRef();

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
      {children}
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
    </div>
  );
};

const Footer = ({ children }) => {
  return <div className="table-row-footer">{children}</div>;
};

Row.LeadingButtons = LeadingButtons;
Row.TrailingButtons = TrailingButtons;
Row.Cells = Cells;
Row.Footer = Footer;

export default Row;
