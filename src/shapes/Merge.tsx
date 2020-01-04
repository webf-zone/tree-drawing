import { cx, css } from 'emotion';
import { h } from 'preact';

import { Link } from '../icons/Link';
import { Merge as MergeIcon } from '../icons/Merge';

import { BaseShape } from './core/BaseShape';
import { topLeft } from './core/helper';

const textStyle = css`
  ${topLeft};
`;


export function Merge(props: BaseShape) {

  const { x, y, width, height } = props;

  const text = 'Uncloned Backup Jobs';
  const iconSize = 12;

  return (
    <svg x={x} y={y} width={width} height={height} viewBox='0 0 100 100' preserveAspectRatio='xMinYMin meet'
      class={cx()}>
      <rect fill='gray' x={0} y={0} width={100} height={24}></rect>
      <text class={textStyle} x={4} y={0}>Merge</text>
      <Link x={80} y={4} width={iconSize} height={iconSize}/>
      <Link x={60} y={4} width={iconSize} height={iconSize}/>

      <polygon fill='gray' points="0 24, 100 24, 50 100"/>
      <g transform='rotate(180 50 54)'>
        <MergeIcon x={26} y={30} width={48} height={48} />
      </g>
    </svg>
  );
}

