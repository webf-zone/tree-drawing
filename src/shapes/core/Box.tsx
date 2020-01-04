import { h } from 'preact';
import { cx, css } from 'emotion';

import { SVGIcon } from '../../icons/SVGIcon';

import { BaseShape } from './BaseShape';
import { Shape } from './Shape';


const boxStyle = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  --title-fill: gray;
  --body-fill: gray;
`;


const titleStyle = css`
  padding: 1rem 0.5rem;
  display: flex;
  flex-grow: 1;

  font-size: 1.125rem;
  line-height: 1;

  background-color: var(--title-fill);

  h3 {
    margin: 0;
    font-size: inherit;
  }
`;

const bodyStyle = css`
  padding: 1rem 0.5rem;
  flex-grow: 1;
  background-color: var(--body-fill);
`;

const linkStyle = css`
  margin-left: auto;
`;


export interface BoxProps extends BaseShape {
  class?: string;

  title: string;
  body: string;

  onResize?: (dim: [number, number]) => void;
};

export function Box(props: BoxProps) {

  const { title, body, minHeight, minWidth, x, y, width, height } = props;

  return (
    <Shape {...props}>
      <div class={cx('box', 'shape-selector', boxStyle, props.class)}>
        {/* Title */}
        <div class={titleStyle}>
          <h3>{title}</h3>
          <SVGIcon class={linkStyle} name='link' width='18px' height='18px' />
        </div>

        {/* Body */}
        <div class={bodyStyle}>
          {body}
        </div>
      </div>
    </Shape>
  );
}
