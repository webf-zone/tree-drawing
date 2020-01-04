import { cx, css } from 'emotion';
import { h, JSX } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';

import { SVGIcon } from '../../icons/SVGIcon';

import { BaseShape } from './BaseShape';

export interface ShapeProps extends BaseShape {
  class?: string;
  children: JSX.Element | JSX.Element[];
}

const shapeStyle = css`
  position: absolute;
  user-select: none;
`;

const selectionFrameStyle = css`
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border: 3px dashed gray;
  box-sizing: border-box;
`;

const resizeIcon = css`
  position: absolute;
  cursor: se-resize;

  bottom: 0;
  right: 0;

  transform: rotateZ(45deg) translateY(2px);
`;


export function Shape(props: ShapeProps) {

  const { x, y, width, height, minWidth, minHeight, maxWidth, maxHeight, selected, onResize } = props;

  const [zoomFactor, setZoomFactor] = useState([0, 0]);
  const [downXY, setDownXY] = useState([0, 0]);
  const [border, setBorder] = useState([width, height]);

  const [isResize, setIsResize] = useState(false);

  useEffect(() => {

    if (isResize) {
      const onResizeMove = (e: MouseEvent) => {
        const diffX = e.pageX - downXY[0];
        const diffY = e.pageY - downXY[1];
        setZoomFactor([diffX, diffY]);
      };

      const onResizeEnd = (e: MouseEvent) => {
        onResize?.(border as any);
        setIsResize(false);
      };

      document.addEventListener('mousemove', onResizeMove);
      document.addEventListener('mouseup', onResizeEnd)

      return () => {
        document.removeEventListener('mousemove', onResizeMove);
        document.removeEventListener('mouseup', onResizeEnd);
      };
    }

  }, [isResize, border]);

  useEffect(() => {

    const newWidth = Math.min(
      maxWidth || 500,
      Math.max(minWidth || 0, width + zoomFactor[0]));

    const newHeight = Math.min(
      maxHeight || 500,
      Math.max(minHeight || 0, height + zoomFactor[1]));

    setBorder([newWidth, newHeight]);

  }, [isResize, zoomFactor, width, height, minWidth, minHeight]);


  const onResizeBegin = (e: MouseEvent) => {
    setIsResize(true);
    setDownXY([e.pageX, e.pageY]);
  };

  const style = {
    width: `${width}px`,
    height: `${height}px`,
    minWidth: `${minWidth}px`,
    minHeight: `${minHeight}px`,
    maxWidth: `${maxWidth}px`,
    maxHeight: `${maxHeight}px`
  };

  const selectionStyle = {
    width: `${border[0]}px`,
    height: `${border[1]}px`
  };

  const shapeStyles = cx('shape', shapeStyle, props.class);

  return (
    <div class={shapeStyles} style={style}>

      {props.children}

      <div class={resizeIcon} onMouseDown={onResizeBegin}>
        <SVGIcon name='replayConsistency' width='18px' height='18px' />
      </div>

      {(selected || isResize)
        ? <div class={selectionFrameStyle} style={selectionStyle}></div>
        : null}
    </div>
  );
}

