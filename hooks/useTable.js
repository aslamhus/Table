import { useEffect, useState } from 'react';

/**
 *
 * @param {array} dataSource
 * dataSource must be an array of objects with a property named id of type int
 * whose values must be unique integers.
 */
export const useTable = ({ dataSource, onChangeOrder }) => {
  const [data, setData] = useState([]);
  const [orderOption, setOrderOption] = useState({});
  const [selectedRows, setSelectedRows] = useState({});

  const selectAll = (event) => {
    const allRows = isSelected()
      ? {}
      : data
          .map((value, index) => index)
          .reduce((acc, index) => {
            acc[index + 1] = true;
            return acc;
          }, {});
    setSelectedRows(allRows);
  };

  const isSelected = () => {
    return Object.keys(selectedRows).length > 0;
  };

  const handleSelect = (id) => {
    setSelectedRows((prev) => {
      /**
       * Toggle the selected state of a row
       */
      const newRows = { ...prev };
      if (newRows[id]) {
        delete newRows[id];
      } else {
        newRows[id] = true;
      }
      return newRows;
    });
  };

  const setOrder = (event) => {
    event.preventDefault();
    const {
      target,
      target: { name },
    } = event;
    // get column id
    const column = target.classList.contains('cell') ? target : target.closest('.cell');
    const columnId = column.dataset?.columnId;
    // reverse direction
    const direction = target.dataset?.direction == 'ASC' ? 'DESC' : 'ASC';
    if (onChangeOrder instanceof Function) {
      onChangeOrder({ name, direction, columnId });
    }
    setOrderOption({ name, direction, columnId });
  };

  /**
   * Remove rows
   *
   * Updates view.
   * Remove rows by id from the data array.
   * @param {array} selectedRows
   */
  const removeRows = (selectedRows) => {
    setData(data.filter((row) => !selectedRows.includes(String(row.id))));
    /**
     * After removing rows, clear all seleted rows
     */
    setSelectedRows({});
  };

  useEffect(() => {
    setData(
      dataSource.map((row, index) => {
        row.uuid = Date.now();
        return row;
      })
    );
  }, [dataSource]);

  return {
    isSelected,
    selectAll,
    handleSelect,
    removeRows,
    setOrder,
    state: { data, selectedRows, orderOption },
  };
};
