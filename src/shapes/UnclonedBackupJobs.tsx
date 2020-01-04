import { cx, css } from 'emotion';
import { h } from 'preact';

import { Box } from './core/Box';
import { BaseShape } from './core/Shape';


const titleFill = '#EBD397';
const bodyFill = '#EAEAEA';

export function UnclonedBackupJobs(props: BaseShape) {

  const { x, y, width, height } = props;

  const text = 'Uncloned Backup Jobs';

  return (
    <Box x={x} y={y} xAspect={300} yAspect={100}
      width={width} height={height}
      body={text} bodyFill={bodyFill}
      title={text} titleFill={titleFill} />
  );
}

