import { cx, css } from 'emotion';
import { h, JSX } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';

import { SVGIcon } from '../../icons/SVGIcon';

import { BaseShape } from './BaseShape';
import { useAnimationWhen } from './hook';

export interface ShapeProps extends BaseShape {
  class?: string;
  children: JSX.Element | JSX.Element[];
  canResize?: boolean;
}

const shapeStyle = css`
  position: absolute;
  user-select: none;
  z-index: 1;
`;

const activatedStyle = css`
  opacity: 0.70;
  z-index: 2;
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

  pointer-events: none;
`;

const resizeIcon = css`
  position: absolute;
  cursor: se-resize;

  bottom: 0;
  right: 0;

  transform: rotateZ(45deg) translateY(2px);
`;


export function Shape(props: ShapeProps) {

  const { x, y, width, height, minWidth, minHeight, maxWidth, maxHeight, selected, onResize, onMove, onMoving } = props;

  const [resizeOriginXY, setResizeOriginXY] = useState([0, 0]);
  const resizeLatestXY = useRef([0, 0]);
  const [border, setBorder] = useState([width, height]);

  const [dragOriginXY, setDragOriginXY] = useState([0, 0]);
  const dragLatestXY = useRef([0, 0]);
  const [translateXY, setTranslateXY] = useState([0, 0]);

  const [isResize, setIsResize] = useState(false);
  const [isDrag, setIsDrag] = useState(false);

  // Mouse handlers for Resize event
  useEffect(() => {

    if (isResize) {
      const onResizeMove = (e: MouseEvent) => {
        resizeLatestXY.current = [e.pageX, e.pageY];
      };

      const onResizeEnd = (e: MouseEvent) =>
        setBorder((b: any) => {
          onResize?.(b);
          setIsResize(false);

          return b;
        });

      document.addEventListener('mousemove', onResizeMove);
      document.addEventListener('mouseup', onResizeEnd)

      return () => {
        document.removeEventListener('mousemove', onResizeMove);
        document.removeEventListener('mouseup', onResizeEnd);
      };
    }

    // No-op cleanup
    return () => {};

  }, [isResize]);

  // Animation loop for Resize event
  useAnimationWhen(() => {
    const [x, y] = resizeLatestXY.current;

    const newWidth = Math.min(
      maxWidth || 500,
      Math.max(minWidth || 0, width + x - resizeOriginXY[0]));

    const newHeight = Math.min(
      maxHeight || 500,
      Math.max(minHeight || 0, height + y - resizeOriginXY[1]));

    setBorder([newWidth, newHeight]);

  }, isResize, [width, height, minWidth, minHeight]);


  const stopper = useAnimationWhen(() => {
    const diffX = dragLatestXY.current[0] - dragOriginXY[0];
    const diffY = dragLatestXY.current[1] - dragOriginXY[1];

    // Item should not move below (0, 0).
    const diffXX = x + diffX > 0 ? diffX : -x;
    const diffYY = y + diffY > 0 ? diffY : -y;

    const diff = [diffXX, diffYY];

    setTranslateXY(diff);
    onMoving?.([x + diffXX, y + diffYY]);

  }, isDrag, [dragOriginXY, dragLatestXY, x, y]);

  // Global mouse handler for Drag event
  useEffect(() => {

    if (isDrag) {
      const onMouseMove = (e: MouseEvent) => {
        dragLatestXY.current = ([e.pageX, e.pageY]);
      };

      const onDragEnd = (_e: MouseEvent) => {
        setIsDrag(false);
        stopper.current();
        setTranslateXY((txy) => {
          onMove?.([x + txy[0], y + txy[1]]);

          return [0, 0];
        });
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onDragEnd);

      return () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onDragEnd);
      };
    }

  }, [isDrag]);


  const onResizeBegin = (e: MouseEvent) => {
    setIsResize(true);
    setResizeOriginXY([e.pageX, e.pageY]);
    resizeLatestXY.current = [e.pageX, e.pageY];
  };

  const onDragBegin = (e: MouseEvent) => {
    const shapeSelector = (e.target as HTMLElement).closest('.shape-selector');

    if (shapeSelector) {
      setIsDrag(true);
      setDragOriginXY([e.pageX, e.pageY]);
      dragLatestXY.current = [e.pageX, e.pageY];
    }
  };

  const style = {
    left: `${x}px`,
    top: `${y}px`,
    width: `${width}px`,
    height: `${height}px`,
    minWidth: `${minWidth}px`,
    minHeight: `${minHeight}px`,
    maxWidth: `${maxWidth}px`,
    maxHeight: `${maxHeight}px`,
    transform: `translate3d(${translateXY[0]}px, ${translateXY[1]}px, 0)`
  };

  const selectionStyle = {
    width: `${border[0]}px`,
    height: `${border[1]}px`
  };

  const shapeStyles = cx('shape', shapeStyle, (isDrag || isResize) && activatedStyle, props.class);

  return (
    <div class={shapeStyles} style={style} onMouseDown={onDragBegin}>
      {props.children}

      {props.canResize !== false
        ? <div class={resizeIcon} onMouseDown={onResizeBegin}>
          <SVGIcon name='replayConsistency' width='18px' height='18px' />
        </div>
        : null
      }

      {(selected || isResize)
        ? <div class={selectionFrameStyle} style={selectionStyle}></div>
        : null}
    </div>
  );
}

