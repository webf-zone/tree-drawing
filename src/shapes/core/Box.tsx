import { h } from 'preact';
import { cx, css } from 'emotion';
import { BaseShape } from './Shape';
import { Link } from './../../icons/Link';

const titleStyle = css`
  font-size: 1.125rem;
  line-height: 1;
`;

const middle = css`
  dominant-baseline: middle;
`;


export interface BoxProps {
  title: string;
  titleFill: string;

  body: string;
  bodyFill: string;

  x: number;
  y: number;

  width: number;
  height: number;

  xAspect: number;
  yAspect: number;
};

const gap: number = 16;

export function Box(props: BoxProps) {

  const { x, y, xAspect, yAspect, width, height } = props;
  const { title, body, titleFill, bodyFill } = props;

  const viewBox = `0 0 ${xAspect} ${yAspect}`;

  const rectH = yAspect / 2;
  const rectX = 0;
  const textDisplaceent = (rectH / 2);

  // 1st Rect
  const rect1Y = 0;
  const titleY = rect1Y + textDisplaceent;

  // 2nd Rect
  const rect2Y = yAspect / 2;
  const bodyY = rect2Y + textDisplaceent;

  // icon
  const iconSize = 24;
  const iconX = xAspect - iconSize - gap;
  const iconY = (rectH - iconSize) / 2;

  return (
    <svg x={x} y={y} width={width} height={height} viewBox={viewBox} preserveAspectRatio='xMinYMin meet'
      class={cx()}>

      <rect fill={titleFill} x={rectX} y={rect1Y} width={xAspect} height={rectH} />
      <text class={cx(middle, titleStyle)} x={gap} y={titleY}>{title}</text>
      <Link x={iconX} y={iconY} width={iconSize} height={iconSize}/>

      <rect fill={bodyFill} x={rectX} y={rect2Y} width={xAspect} height={rectH} />
      <text class={middle} x={gap} y={bodyY}>{body}</text>
    </svg>
  );
}
