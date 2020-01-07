import { cx, css } from 'emotion';
import { h } from 'preact';

import { Box } from './core/Box';
import { BaseShape, ShapeInstance } from './core/BaseShape';


export interface ReportTypeProps extends ShapeInstance {
};


const shapeStyle = css`
  --title-fill: teal;
  --body-fill: #FFFFFF;
`;


export function ReportType(props: ReportTypeProps) {

  const text = 'Report';

  return (
    <Box class={shapeStyle} body={''} title={text} minWidth={400} minHeight={150} {...props} />
  );
}
