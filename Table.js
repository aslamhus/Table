import React, { useEffect } from 'react';
import Head from './Head';
import Body from './Body';
import TitleBar from './TitleBar';
import Pagination from './Pagination';
import { renderSubComponent } from './utils/render';
import { useTable } from './hooks/useTable';
import './table.css';

const Table = ({
  dataSource,
  className,
  style,
  onChangeOrder,
  onFilterChange,
  onDelete,
  enableCheckbox = true,
  children,
}) => {
  const {
    setData,
    setCallbacks,
    setEnableCheckbox,
    state: { data, callbacks, selectedRows },
  } = useTable({});

  useEffect(() => {
    setEnableCheckbox(enableCheckbox);
  }, [enableCheckbox]);

  useEffect(() => {
    setCallbacks({
      onChangeOrder: onChangeOrder ?? callbacks?.onChangeOrder,
    });
  }, [onChangeOrder]);

  useEffect(() => {
    if (!dataSource) return;

    setData(
      dataSource.map((row, index) => {
        row.uuid = Date.now();
        return row;
      })
    );
  }, [dataSource]);

  useEffect(() => {}, []);

  /**
   * To do:
   *
   * Find way to automatically set header sizes
   */
  return (
    <div>
      <div className={`table ${className}`} style={{ ...style }}>
        {/* TitleBar */}
        {renderSubComponent(TitleBar, children, { onFilterChange, onDelete })}
        {/* Pagination */}
        {renderSubComponent(Pagination, children)}
        {/* Head */}
        {renderSubComponent(Head, children)}
        {/* Body/Rows */}
        {renderSubComponent(Body, children, { data, selectedRows })}
      </div>
    </div>
  );
};

export default Table;
