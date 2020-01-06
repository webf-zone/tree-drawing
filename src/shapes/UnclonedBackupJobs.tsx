import { cx, css } from 'emotion';
import { h } from 'preact';

import { Box } from './core/Box';
import { BaseShape, ShapeInstance } from './core/BaseShape';


export interface UnclonedBackupJobsProps extends ShapeInstance {
};


const shapeStyle = css`
  --title-fill: #EBD397;
  --body-fill: #EAEAEA;
`;


export function UnclonedBackupJobs(props: UnclonedBackupJobsProps) {

  const text = 'Uncloned Backup Jobs';

  return (
    <Box class={shapeStyle} body={text} title={text} minWidth={300} minHeight={100} {...props} />
  );
}
