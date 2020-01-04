import { cx, css } from 'emotion';
import { h, JSX } from 'preact';
import { useState, useEffect } from 'preact/hooks';

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
      const mouseMoveHandler = (e: MouseEvent) => {
        const diffX = e.pageX - downXY[0];
        const diffY = e.pageY - downXY[1];
        setZoomFactor([diffX, diffY]);
      };

      const mouseUpHandler = (e: MouseEvent) => {
        onResize?.(border as any);
        setIsResize(false);
      };

      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler)

      return () => {
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
      };
    }

  }, [isResize, border]);

  useEffect(() => {

    if (isResize) {

      let frame: number = 0;

      const loop = () => {

        const newWidth = Math.min(
          maxWidth || 500,
          Math.max(minWidth || 0, width + zoomFactor[0]));

        const newHeight = Math.min(
          maxHeight || 500,
          Math.max(minHeight || 0, height + zoomFactor[1]));

        setBorder([newWidth, newHeight]);

        if (isResize) {
          frame = requestAnimationFrame(loop);
        }
      }

      frame = requestAnimationFrame(loop);

      return () => {
        // console.log('Cancelling');
        cancelAnimationFrame(frame);
      };
    }


  }, [isResize, zoomFactor, width, height, minWidth, minHeight]);


  const onMouseDown = (e: MouseEvent) => {
    const dim = [e.pageX, e.pageY];

    setIsResize(true);
    setDownXY(dim);
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

      <div class={resizeIcon} onMouseDown={onMouseDown}>
        <SVGIcon name='replayConsistency' width='18px' height='18px' />
      </div>

      {(selected || isResize)
        ? <div class={selectionFrameStyle} style={selectionStyle}></div>
        : null}
    </div>
  );
}

