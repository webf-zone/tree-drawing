import { h, JSX, toChildArray } from 'preact';
import { useState, useRef, useEffect } from 'preact/hooks';
import { cx, css } from 'emotion';

import { useAnimationWhen } from '../shapes/core/hook';

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

  :active {
    cursor: grabbing;
  }
`;

const canvas = css`
  position: relative;
`;


export function Stage(props: StageProps) {

  const rootElm = useRef<HTMLDivElement>(null as any);
  const [isDrag, setIsDrag] = useState(false);
  const [dragOriginXY, setDragOriginXY] = useState([0, 0]);
  const dragLatestXY = useRef([0, 0]);
  const [translateXY, setTranslateXY] = useState([0, 0]);
  const [originXYAtDrag, setOriginXYAtDrag] = useState([0, 0]);

  const movingXY = useRef([0, 0]);

  const stopper = useAnimationWhen(() => {

    const diffX = dragLatestXY.current[0] - dragOriginXY[0];
    const diffY = dragLatestXY.current[1] - dragOriginXY[1];

    // Item should not move below (0, 0).
    const diffXX = originXYAtDrag[0] + diffX > 0 ? 0 : originXYAtDrag[0] + diffX;
    const diffYY = originXYAtDrag[1] + diffY > 0 ? 0 : originXYAtDrag[1] + diffY;

    const diff = [diffXX, diffYY];

    setTranslateXY(diff);

  }, isDrag, [dragOriginXY, dragLatestXY, originXYAtDrag]);

  // Global mouse handler for Drag event
  useEffect(() => {

    if (isDrag) {
      const onMouseMove = (e: MouseEvent) => {
        dragLatestXY.current = ([e.pageX, e.pageY]);
      };

      const onDragEnd = (_e: MouseEvent) => {
        setIsDrag(false);
        stopper.current();
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onDragEnd);

      return () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onDragEnd);
      };
    }

  }, [isDrag]);

  useEffect(() => {
    if (props.underMovement) {

      const elm = rootElm.current;

      const onMouseMove = (e: MouseEvent) => {
        movingXY.current = [e.pageX, e.pageY];
      };

      elm.addEventListener('mousemove', onMouseMove);

      return () => elm.removeEventListener('mousemove', onMouseMove);

    }
  }, [props.underMovement]);


  useAnimationWhen(() => {

    const { left, top, width, height } = rootElm.current.getBoundingClientRect();

    const evX = Math.max(0, movingXY.current[0] - (left + window.scrollX));
    const evY = Math.max(0, movingXY.current[1] - (top + window.scrollY));

    const isLeft = evX <= 32;
    const isRight = width - evX <= 32;
    const isTop = evY <= 32;
    const isBottom = height - evY <= 32;

    setTranslateXY((c) => {

      if (isLeft && isTop) {
        return [Math.min(0, c[0] + 4), Math.min(0, c[1] + 4)];
      } else if (isRight && isTop) {
        return [c[0] + 4, Math.min(0, c[1] + 4)];
      } else if (isLeft && isBottom) {
        return [Math.min(0, c[0] + 4), c[1] - 4];
      } else if (isRight && isBottom) {
        return [c[0] - 4, c[1] - 4];
      } else if (isTop) {
        return [c[0], Math.min(0, c[1] + 4)];
      } else if (isRight) {
        return [c[0] - 4, c[1]];
      } else if (isBottom) {
        return [c[0], c[1] - 4];
      } else if (isLeft) {
        return [Math.min(0, c[0] + 4), c[1]];
      }

      return c;
    });

  }, props.underMovement, [movingXY]);

  const children = toChildArray(props.children);

  const onMouseDown = (e: MouseEvent) => {
    const target = (e.target as HTMLElement);

    if (target.classList.contains('stage')) {
      setIsDrag(true);
      setOriginXYAtDrag(translateXY);
      setDragOriginXY([e.pageX, e.pageY]);
      dragLatestXY.current = [e.pageX, e.pageY];
    }
  };

  const style = {
    transform: `translate3d(${translateXY[0]}px, ${translateXY[1]}px, 0)`
  };

  return (
    <div ref={rootElm} class={cx('stage', stage, props.class)} onMouseDown={onMouseDown} >
      <div class={cx('stage__canvas', canvas)} style={style}>
        {children}
      </div>
    </div>
  );
}
