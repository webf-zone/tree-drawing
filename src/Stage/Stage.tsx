import { h, JSX, toChildArray } from 'preact';
import { cx, css } from 'emotion';

export type StageProps = {
  class?: string;
  children: JSX.Element[];

  width?: number;
  height?: number;
  underMovement: boolean;
};


const stage = css`
  display: block;
  min-width: 100%;
  min-height: 100%;

  position: relative;
`;


export function Stage(props: StageProps) {

  const children = toChildArray(props.children);

  return (
    <div class={cx('stage', stage, props.class)}>
      {children}
    </div>
  );
}
