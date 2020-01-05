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
`;

const canvas = css`
  ${stage}
`;


export function Stage(props: StageProps) {

  const [isDrag, setIsDrag] = useState(false);
  const [dragOriginXY, setDragOriginXY] = useState([0, 0]);
  const dragLatestXY = useRef([0, 0]);
  const [translateXY, setTranslateXY] = useState([0, 0]);
  const [originXYAtDrag, setOriginXYAtDrag] = useState([0, 0]);

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

  const children = toChildArray(props.children);

  const onMouseDown = (e: MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains('stage')) {
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
    <div class={cx('stage', stage, props.class)} onMouseDown={onMouseDown} >
      <div class={cx('stage-canvas', canvas)} style={style}>
        {children}
      </div>
    </div>
  );
}
