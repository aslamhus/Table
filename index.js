import React from 'react';
import TableProvider from './Context/TableContextProvider';
import _Table from './Table';
import Head from './Head';
import Cell from './Cell';
import Body from './Body';
import TitleBar from './TitleBar';
import Pagination from './Pagination';
import Row from './Row';

function Table({ children, ...props }) {
  return (
    <TableProvider>
      <_Table {...props}>{children}</_Table>
    </TableProvider>
  );
}

Table.TitleBar = TitleBar;
Table.Head = Head;
Table.Body = Body;
Table.Row = Row;
Table.Cell = Cell;
Table.Pagination = Pagination;

export default Table;
