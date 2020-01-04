import { h } from 'preact';
import { cx, css } from 'emotion';
import { useState } from 'preact/hooks';

import { gridBG } from './stageGrid';

import { UnclonedBackupJobs } from '../shapes/UnclonedBackupJobs';


export type StageProps = {
  class?: string;
};


const stage = css`
  display: block;
  width: 100%;
  height: 100%;

  position: relative;
`;


export function Stage(props: StageProps) {

  const [dim, setDim] = useState([400, 300]);

  const onResize = (x: [number, number]) => {
    // console.log('Resize', x);
    setDim(x);
  };

  return (
    <div class={cx('stage', stage, props.class)}>
      <UnclonedBackupJobs x={0} y={0} width={dim[0]} height={dim[1]} onResize={onResize} />
    </div>
  );
}
