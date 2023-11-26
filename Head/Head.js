import React, { useEffect } from 'react';
import Cell from '../Cell';
import { findByType } from '../utils/utils';
import { CaretDown, CaretDownFill, CaretUp, CaretUpFill, Plus } from 'react-bootstrap-icons';
import { useTable } from '../hooks/useTable';

export default function Head({ children }) {
  const {
    isSelected,
    selectAll,
    setOrder,
    setHeaders,
    state: { orderOption, enableCheckbox },
  } = useTable();
  let headers = [];

  const renderHeaderCells = () => {
    const headerCells = findByType(children, Cell);
    if (headerCells && headerCells.length > 0) {
      const childrenToRender = React.Children.map(headerCells, (child, index) => {
        const size = child.props?.size || 'm';
        const name = child.props?.name || child.props?.title;
        headers.push({ name, size });
        return (
          <Cell
            className={`
              header-cell 
              ${child.props.className || ''}
              ${child.props?.orderName == orderOption?.name ? 'order-by' : ''}
            `}
            size={size}
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

  useEffect(() => {
    const headersMap = new Map();
    headers.forEach((header) => {
      headersMap.set(header.name, header);
    }, {});
    setHeaders(headersMap);
  }, []);

  return (
    <div className="th">
      <div className={`th-container `}>
        {renderHeaderCells()}
        {enableCheckbox && (
          <div className="cell-xxs cell-center header-cell">
            <input onChange={selectAll} type="checkbox" id="check-all" checked={isSelected()} />
          </div>
        )}
      </div>
    </div>
  );
}
