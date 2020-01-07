import { cx, css } from 'emotion';
import { h } from 'preact';

import { Box } from './core/Box';
import { ShapeInstance } from './core/BaseShape';


export interface UnclonedBackupJobsProps extends ShapeInstance {
};


const shapeStyle = css`
  --title-fill: #EBD397;
  --body-fill: #FFFFFF;
`;


export function UnclonedBackupJobs(props: UnclonedBackupJobsProps) {

  const text = 'Uncloned Backup Jobs';

  return (
    <Box class={shapeStyle} body={text} title={text} minWidth={300} minHeight={100} {...props} />
  );
}
