import React, { useEffect, useRef } from 'react';
import { findByType } from '../utils/utils';
import { useTable } from '../hooks/useTable';
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
function Row({ rowId, rowData, as, className, children, selected, onClick }) {
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
    return <Cells {...props} />;
  };

  return (
    <TagName
      id={`row-${rowId}`}
      className={`
        table-row 
        ${className ? className : ''}
         ${selected ? 'selected' : ''}`}
    >
      <div className="table-row-btn-wrapper" onClick={(event) => onClick(event, rowData)}>
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
