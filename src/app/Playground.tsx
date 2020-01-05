import { cx, css } from 'emotion';
import { h, JSX } from 'preact';
import { useState } from 'preact/hooks';

import { Forest } from '../models/Tree';
import { Stage } from '../Stage/Stage';
import { AnyShape } from '../shapes/AllShapes';
import { UnclonedBackupJobs } from '../shapes/UnclonedBackupJobs';
import { Connector } from '../shapes/core/Connector';

import { gridBG } from './stageGrid';


export type PlaygroundProps = {
  class: string;
  forest?: Forest;
};


const playgroundStyles = css`

  ${gridBG}

  overflow: hidden;
`;

export function Playground(props: PlaygroundProps) {

  const [underMovement, setUnderMovement] = useState(false);

  const [shapes, setShapes] = useState<AnyShape[]>([{
    type: 'UnclonedBackupJobs',
    specs: {
      x: 0,
      y: 0,

      width: 400,
      height: 300,

      selected: false
    }
  }, {
    type: 'UnclonedBackupJobs',
    specs: {
      x: 500,
      y: 200,

      width: 400,
      height: 200,

      selected: false
    }
  }, {
    type: 'UnclonedBackupJobs',
    specs: {
      x: 1400,
      y: 50,

      width: 300,
      height: 100,

      selected: false
    }
  }]);

  const children = shapes.map(({ type, specs }, index) => {

    if (type === 'UnclonedBackupJobs') {
      const onResize = ([width, height]: number[]) => {
        const newShapes = [
          ...shapes
        ];

        newShapes[index] = {
          type,
          specs: {
            ...specs,
            width,
            height
          }
        };

        setShapes(newShapes);
      };

      const onMove = ([x, y]: number[]) => {
        const newShapes = [
          ...shapes
        ];

        newShapes[index] = {
          type,
          specs: {
            ...specs,
            x,
            y,
            tempX: undefined,
            tempY: undefined
          }
        };

        setShapes(newShapes);
        setUnderMovement(false);
      };

      const onMoving = ([x, y]: [number, number]) => {
        const newShapes = [
          ...shapes
        ];

        newShapes[index] = {
          type,
          specs: {
            ...specs,
            tempX: x,
            tempY: y
          }
        };

        setShapes(newShapes);
        setUnderMovement(true);
      };

      return (
        <UnclonedBackupJobs x={specs.x} y={specs.y} width={specs.width} height={specs.height}
          onResize={onResize} selected={specs.selected}
          onMove={onMove} onMoving={onMoving} />
      );
    }

    return null as any as JSX.Element;
  });

  const conn1 = (
    <Connector left={shapes[0].specs} right={shapes[1].specs} />
  );

  const allChildren = [...children, conn1];

  return (
    <div class={cx('playground', playgroundStyles, props.class)}>
      <Stage underMovement={underMovement}>
        {allChildren}
      </Stage>
    </div>
  );

}
