import React from 'react';
import Row from '../Row';
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
  // if there are no customized rows render default rows(i.e. Children of Table.Body)
  if (!children) {
    return <Row key={Date.now() + Math.random() * 99999} {...additionalProps} columnId={0} />;
  }
  return React.Children.map(children, (Component, index) => {
    const Type = Component?.type;
    if (!Type) return null;
    const ComponentProps = Component?.props || {};
    return <Type {...ComponentProps} {...additionalProps} data-my-test={2} columnId={index} />;
  });
};
