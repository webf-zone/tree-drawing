import { css } from 'emotion';
import { h } from 'preact';

import { Box } from './core/Box';
import { ShapeInstance } from './core/BaseShape';


export interface AddFieldProps extends ShapeInstance {
};


const shapeStyle = css`
  --title-fill: lightsteelblue;
  --body-fill: #FFFFFF;
`;


export function AddField(props: AddFieldProps) {

  const text = 'Add Field';

  return (
    <Box class={shapeStyle} body={text} title={text} minWidth={200} minHeight={60} {...props} />
  );
}
