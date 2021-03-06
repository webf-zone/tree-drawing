
import { cx } from 'emotion';
import { h } from 'preact';

import * as icons from './icons';

export type IconType = keyof typeof icons;

export type SVGIconProps = {
  class?: string;
  width?: string;
  height?: string;
  title?: string;
  name: IconType;
};


export function SVGIcon(props: SVGIconProps) {

  const icon = icons[props.name];

  return (
    <svg class={cx(props.class)} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox={icon.viewBox} width={props.width} height={props.height}>
      {props.title ? <title>{props.title}</title> : null}
      {icon.svg}
    </svg>
  );
}
