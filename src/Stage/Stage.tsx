import { h, JSX } from 'preact';
import { cx, css } from 'emotion';

import { gridBG } from './stageGrid';

export type StageProps = {
  class?: string;

  children: JSX.Element[];
};


const stage = css`
  display: block;
  width: 100%;
  height: 100%;

  position: relative;
`;


export function Stage(props: StageProps) {

  return (
    <div class={cx('stage', stage, props.class)}>
      {props.children}
    </div>
  );
}
