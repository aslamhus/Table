import React from 'react';

export default function Cell({ children, size, center, className, hidden, ...props }) {
  const getSizeClassname = () => {
    if (!size) return '';
    switch (size) {
      case 'l':
      case 'm':
      case 'sm':
      case 'xs':
      case 'xxs':
        return `cell-${size}`;
      default:
        console.warn(`invalid cell size: ${size}`);
        return '';
    }
  };
  return (
    <div
      {...props}
      className={`
          cell 
          ${className ? className : ''}
          ${getSizeClassname()}
          ${center === true ? 'cell-center' : ''}
          ${hidden ? 'cell-hidden' : ''}
      `}
    >
      {children}
    </div>
  );
}
