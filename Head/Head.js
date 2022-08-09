import React, { useEffect } from 'react';
import Cell from '../Cell';
import { findByType } from '../utils/utils';
import { CaretDown, CaretDownFill, CaretUp, CaretUpFill, Plus } from 'react-bootstrap-icons';

export default function Head({ children, isSelected, selectAll, orderOption, setOrder }) {
  const renderHeaderCells = () => {
    const headerCells = findByType(children, Cell);
    if (headerCells && headerCells.length > 0) {
      const childrenToRender = React.Children.map(headerCells, (child, index) => {
        return (
          <Cell
            className={`
              header-cell 
              ${child.props.className || ''}
              ${child.props?.orderName == orderOption?.name ? 'order-by' : ''}
            `}
            size={child.props?.size || 'm'}
            data-column-id={index + 1}
          >
            <button
              name={child.props?.orderName || child.props?.title || `order-${Date.now()}`}
              data-direction={orderOption?.direction == 'ASC' ? 'ASC' : 'DESC'}
              disabled={child.props?.disabled || false}
              onClick={setOrder}
            >
              {child.props.title}
            </button>
            <div className="caret-container">
              {child.props.orderName == orderOption?.name && orderOption?.direction == 'DESC' && (
                <CaretDownFill />
              )}
              {child.props.orderName == orderOption?.name && orderOption?.direction == 'ASC' && (
                <CaretUpFill />
              )}
            </div>
            {/* {child.props.children} */}
          </Cell>
        );
      });
      return childrenToRender;
    }
  };

  return (
    <div className="th">
      <div className={`th-container `}>
        {renderHeaderCells()}
        <div className="cell-xxs cell-center">
          <input onChange={selectAll} type="checkbox" id="check-all" checked={isSelected()} />
        </div>
      </div>
    </div>
  );
}
