import { h, JSX } from 'preact';
import { useState } from 'preact/hooks';

import { Forest } from '../models/Tree';
import { Stage } from '../Stage/Stage';
import { AnyShape } from '../shapes/AllShapes';
import { cx } from 'emotion';
import { UnclonedBackupJobs } from '../shapes/UnclonedBackupJobs';
import { Connector } from '../shapes/core/Connector';

export type PlaygroundProps = {
  class: string;
  // forest: Forest;
};


export function Playground(props: PlaygroundProps) {

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
            y
          }
        };

        setShapes(newShapes);
      };

      return (
        <UnclonedBackupJobs x={specs.x} y={specs.y} width={specs.width} height={specs.height}
          onResize={onResize} selected={specs.selected}
          onMove={onMove}/>
      );
    }

    return null as any as JSX.Element;
  });

  const conn1 = (
    <Connector left={shapes[0].specs} right={shapes[1].specs} />
  );

  const allChildren = [...children, conn1];

  return (
    <div class={cx(props.class)}>
      <Stage>
        {allChildren}
      </Stage>
    </div>
  );

}