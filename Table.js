import React from 'react';
import Head from './Head';
import Cell from './Cell';
import Body from './Body';
import TitleBar from './TitleBar';
import Pagination from './Pagination';
import Row from './Row';
import { renderSubComponent } from './utils/render';
import { useTable } from './hooks/useTable';
import './table.css';

const Table = ({
  children,
  className,
  style,
  dataSource,
  onChangeOrder,
  onFilterChange,
  onDelete,
}) => {
  const {
    isSelected,
    selectAll,
    handleSelect,
    removeRows,
    setOrder,
    state: { data, selectedRows, orderOption },
  } = useTable({ dataSource, onChangeOrder });

  return (
    <div>
      <div className={`table ${className}`} style={{ ...style }}>
        {/* TitleBar */}
        {renderSubComponent(TitleBar, children, {
          data,
          isSelected,
          onFilterChange,
          onDelete,
          selectedRows,
          removeRows,
        })}
        {/* Pagination */}
        {renderSubComponent(Pagination, children)}
        {/* Head */}
        {renderSubComponent(Head, children, {
          isSelected,
          selectAll,
          setOrder,
          orderOption,
        })}
        {/* Body/Rows */}
        {renderSubComponent(Body, children, {
          data,
          handleSelect,
          isSelected,
          selectedRows,
          orderOption,
        })}
      </div>
    </div>
  );
};

Table.TitleBar = TitleBar;
Table.Head = Head;
Table.Body = Body;
Table.Row = Row;
Table.Cell = Cell;
Table.Pagination = Pagination;

export default Table;
