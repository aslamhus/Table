import React from 'react';
import { findByType } from './utils';

export const renderSubComponent = (ComponentType, children, additionalProps) => {
  const [component] = findByType(children, ComponentType);
  if (component) {
    return (
      <ComponentType {...component.props} {...additionalProps}>
        {component.props.children}
      </ComponentType>
    );
  }
  return null;
};

export const renderRow = (children, additionalProps) => {
  return React.Children.map(children, (Component, index) => {
    const Type = Component?.type;
    return <Type {...Component.props} {...additionalProps} columnId={index} />;
  });
};
