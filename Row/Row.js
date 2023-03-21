import React, { useEffect, useRef } from 'react';
import { findByType } from '../utils/utils';
import Cells from '../Cells';
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
 *  {myrowData.map((rowData) => {
        return (
          <Table.Row key={rowData.id} rowId={rowData.id}>
            <p>I'm a table row</p>
          </Table.Row>
        );
      })}
 */
function Row(props) {
  const { rowId, rowData, as, className, onClick, selected, children } = props;
  if (!rowId) {
    throw new Error(
      'Table row id was null. If you are implementing a custom Row, making sure you pass all props from your custom component to Table.Row. For example:const MyComponent = (props) =>  <Table.Row {...props}/>'
    );
  }
  const TagName = as || 'div';

  /**
   * Handle row click
   *
   * Clicking on a row prevented if click target cell is a checkbox
   * @param {*} event
   * @returns
   */
  const handleClick = (event) => {
    const { target } = event;
    if (target.closest('.table-cell-checkbox')) return;
    if (onClick instanceof Function) {
      onClick(rowId, rowData, selected);
    }
  };

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
    return <Cells {...props} />;
  };

  return (
    <TagName
      id={`row-${rowId}`}
      className={`
        table-row 
        ${className ? className : ''}
         ${selected ? 'selected' : ''}`}
      onClick={handleClick}
    >
      <div className="table-row-btn-wrapper">
        <div className="table-left-btns-container">{render(LeadingButtons)}</div>
        {renderCells({
          rowId,
          rowData,
          selected,
        })}

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

const Footer = ({ children }) => {
  return <div className="table-row-footer">{children}</div>;
};

Row.LeadingButtons = LeadingButtons;
Row.TrailingButtons = TrailingButtons;
Row.Cells = Cells;
Row.Footer = Footer;

export default Row;
