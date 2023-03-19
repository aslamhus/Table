import React, { useReducer } from 'react';
import { reducer, initialState } from './reducer';
import { TableContext } from './context';

export default function TableProvider({ props, children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <TableContext.Provider value={[state, dispatch]}>{children}</TableContext.Provider>;
}
