import { h } from 'preact';
import { cx, css } from 'emotion';

import { SVGIcon, IconType } from '../../icons/SVGIcon';

import { BaseShape } from './BaseShape';
import { Shape } from './Shape';


const boxStyle = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  --title-fill: gray;
  --body-fill: gray;

  box-shadow: 4px 4px 10px 0px rgba(0, 0, 0, 0.2);
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

const circleStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  background-color: brown;
  color: white;

  overflow: hidden;

  border-radius: 50%;
  box-shadow: 4px 4px 10px 0px rgba(0, 0, 0, 0.2);
  font-weight: bold;
`;


export interface BoxProps extends BaseShape {
  class?: string;

  title: string;
  body: string;

  onResize?: (dim: [number, number]) => void;
  selected?: boolean;
};

export interface CircleProps extends BaseShape {
  class?: string;

  title: string;
  iconName: IconType;

  onResize?: (dim: [number, number]) => void;
  selected?: boolean;
}

export function Box(props: BoxProps) {

  const { title, body } = props;

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

const iconStyle = css`
  width: 70%;
  fill: currentColor;
  transform: rotateX(180deg);
`;

export function Circle(props: CircleProps) {
  return (
    <Shape canResize={false} {...props}>
      <div class={cx(circleStyles, 'shape-selector', props.class)}>
        <SVGIcon class={cx(iconStyle)} name={props.iconName} />
        <div>{props.title}</div>
      </div>
    </Shape>
  );
}
