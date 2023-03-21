import React from 'react';
import Cell from '../Cell';

export default function SelectCheckbox({ isSelected, handleSelect }) {
  return (
    <Cell size="xxs" center className="table-cell-checkbox">
      <input type="checkbox" checked={isSelected || false} onChange={handleSelect} />
    </Cell>
  );
}
