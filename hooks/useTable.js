import { useContext, useEffect, useState } from 'react';
import { TableContext } from '../Context/context';
import { actions } from '../Context/reducer';
/**
 *
 * @param {array} dataSource
 * dataSource must be an array of objects with a property named id of type int
 * whose values must be unique integers.
 */
export const useTable = () => {
  const [state, dispatch] = useContext(TableContext);
  const { data, selectedRows, enableCheckbox, callbacks, headers, orderOption, filter } = state;

  const selectRows = (rows) => dispatch({ type: actions.selectRows, payload: rows });

  const setData = (data) => dispatch({ type: actions.setData, payload: data });

  const setCallbacks = (callbacksObject) =>
    dispatch({ type: actions.setCallbacks, payload: callbacksObject });

  const setEnableCheckbox = (bool) => dispatch({ type: actions.setEnableCheckbox, payload: bool });

  /**
   * Sets the table header cells
   * @returns
   */
  const setHeaders = (headers) => dispatch({ type: actions.setHeaders, payload: headers });

  const setFilterValue = (value) => dispatch({ type: actions.setFilterValue, payload: value });

  const setOrderOption = ({ name, direction, columnId }) =>
    dispatch({ type: actions.setOrderOption, payload: { name, direction, columnId } });

  const selectAll = (event) => {
    const allRows = isSelected()
      ? {}
      : data
          .map((value, index) => index)
          .reduce((acc, index) => {
            acc[index + 1] = true;
            return acc;
          }, {});
    selectRows(allRows);
  };

  const isSelected = () => Object.keys(selectedRows).length > 0;

  /**
   * Toggle the selected state of a row
   */
  const handleSelect = (id) => {
    const newRows = { ...selectedRows };
    if (newRows[id]) {
      delete newRows[id];
    } else {
      newRows[id] = true;
    }
    selectRows(newRows);
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
    if (callbacks.onChangeOrder instanceof Function) {
      callbacks.onChangeOrder({ name, direction, columnId });
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
    selectRows({});
  };

  return {
    isSelected,
    selectAll,
    handleSelect,
    removeRows,
    setOrder,
    setData,
    setCallbacks,
    setHeaders,
    setEnableCheckbox,
    setFilterValue,
    state: {
      data,
      selectedRows,
      orderOption,
      headers,
      enableCheckbox,
      filter,
    },
  };
};
