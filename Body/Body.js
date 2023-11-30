import React from 'react';
import { renderRow } from '../utils/render';

/**
 *
 * @component
 * Table Body accepts any children, but expects them to be a component
 * that behaves like Table Row. It passes the props handleSelect and selectedRows
 * to the child.
 *
 * Table Body will render the first descendant as many times as there are rows in the data.
 *
 *
 * Sometimes you may want to encapsulate the logic of a table row in another component
 *
 * @example
 *
 * // in this example, CustomTableRow inherits the props usually reserved for TableRow
 * <Table.Body>
 *        <CustomTableRow key={rowData.id}>
 *            ....
 *        </CustomTableRow>
 *
 * }}
 * </Table.Body>
 *
 * const CustomTableRow = ({ handleSelect, selectedRows }) => {
 *  return (
 *      <Table.Row>
 *          <Table.Row.Cells>
 *              .....
 *          </Table.Row.Cells>
 *      </Table.Row>
 *  )
 * }
 */
export default function Body({ data, children, selectedRows }) {
  return (
    <div className="table-body">
      {data.map((rowData, index) => {
        const rowId = index + 1;
        return renderRow(children, {
          rowData,
          rowId,
          selected: selectedRows?.[rowId],
        });
      })}
    </div>
  );
}
