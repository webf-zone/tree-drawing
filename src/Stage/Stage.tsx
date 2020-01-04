import { h } from 'preact';
import { cx, css } from 'emotion';

import { gridBG } from './stageGrid';

import { UnclonedBackupJobs } from '../shapes/UnclonedBackupJobs';

export type Dimensions = {
  xUnits: number;
  yUnits: number;
};

export type StageProps = {
  class?: string;

  dimensions: Dimensions;
};


const canvas = css`
  display: block;
  width: 100%;
  height: 100%;

  box-sizing: border-box;

  /* text {
    dominant-baseline: text-before-edge;
  } */
`;


export function Stage(props: StageProps) {

  const { dimensions: { xUnits, yUnits } } = props;

  const viewBox = `0 0 ${xUnits} ${yUnits}`;

  return (
    <div class={cx('stage', props.class)}>
      <svg class={cx(canvas, gridBG)} viewBox={viewBox} preserveAspectRatio='xMinYMin meet'>
        <UnclonedBackupJobs x={0} y={0} width={600} height={200} />
      </svg>
    </div>
  );
}
