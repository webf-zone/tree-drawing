import { cx, css } from 'emotion';
import { h } from 'preact';

import { BaseShape } from './core/BaseShape';
import { Circle } from './core/Box';



export function Merge(props: BaseShape) {

  return (
    <Circle title='Merge' iconName='merge' minWidth={150} minHeight={150} {...props} />
  );
}

