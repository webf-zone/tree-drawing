import { cx, css } from 'emotion';
import { h } from 'preact';
import { useState } from 'preact/hooks';

import { Forest, Tree } from '../models/Tree';
import { Stage } from '../Stage/Stage';
import { UnclonedBackupJobs } from '../shapes/UnclonedBackupJobs';
import { Connector } from '../shapes/core/Connector';

import { gridBG } from './stageGrid';
import { AnyShape } from '../shapes/AllShapes';
import { ShapeInstance } from '../shapes/core/BaseShape';


export type PlaygroundProps = {
  class: string;
  forest?: Forest<AnyShape>;
};


const playgroundStyles = css`
  ${gridBG}

  overflow: hidden;
`;

type Connector = {
  left: ShapeInstance;
  right: ShapeInstance;
};

type StageData = {
  shapes: AnyShape[];
  connectors: Connector[];
}

function getAllConnectorsFromTree(tree: Tree<AnyShape>): Connector[] {
  function addConnector(tree: Tree<AnyShape>, parent: Tree<AnyShape>): Connector[] {
    return [{
        left: parent.context.specs,
        right: tree.context.specs
      }]
      .concat(...tree.children.map((node) => addConnector(node, tree)));
  }

  return tree.children
    .map((node) => addConnector(node, tree))
    .flat();
}

function getAllShapesFromTree(tree: Tree<AnyShape>): AnyShape[] {

  function addShape(tree: Tree<AnyShape>): AnyShape[] {
    return [tree.context]
      .concat(...tree.children.map(addShape));
  }

  return addShape(tree)
    .flat();
}

function flattenTree(tree: Tree<AnyShape>): StageData {
  return {
    connectors: getAllConnectorsFromTree(tree),
    shapes: getAllShapesFromTree(tree)
  };
}

function flattenForest(forest: Forest<AnyShape> = { trees: [] }): StageData {
  return forest
    .trees
    .map(flattenTree)
    .reduce((acc, nextItem) => ({
      connectors: nextItem.connectors.concat(acc.connectors),
      shapes: nextItem.shapes.concat(acc.shapes)
    }), {
      connectors: [],
      shapes: []
    });
}

export function Playground(props: PlaygroundProps) {

  const [underMovement, setUnderMovement] = useState(false);

  const [stageData, setStageData] = useState(flattenForest(props.forest));

  const children = stageData.shapes.map(({ type, specs }, index) => {

    switch (type) {
      case 'UnclonedBackupJobs':
        const onResize = ([width, height]: number[]) => {
          const newShapes = [
            ...stageData.shapes
          ];

          newShapes[index] = {
              type,
              specs: {
                ...specs,
                width,
                height
              }
          };

          setStageData({
            connectors: stageData.connectors,
            shapes: newShapes
          });
        };

        const onMove = ([x, y]: number[]) => {
          const newShapes = [
            ...stageData.shapes
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

          setStageData({
            connectors: stageData.connectors,
            shapes: newShapes
          });
          setUnderMovement(false);
        };

        const onMoving = ([x, y]: [number, number]) => {
          const newShapes = [
            ...stageData.shapes
          ];

          newShapes[index] = {
            type,
            specs: {
              ...specs,
              tempX: x,
              tempY: y
            }
          };

          setStageData({
            connectors: stageData.connectors,
            shapes: newShapes
          });
          setUnderMovement(true);
        };

        return (
          <UnclonedBackupJobs x={specs.x} y={specs.y} width={specs.width} height={specs.height}
            onResize={onResize} selected={specs.selected}
            onMove={onMove} onMoving={onMoving} />
        );
    }

  });

  const connectors = stageData
    .connectors
    .map(connector => <Connector left={connector.left} right={connector.right} />)

  const allChildren = [...children, ...connectors];

  return (
    <div class={cx('playground', playgroundStyles, props.class)}>
      <Stage underMovement={underMovement}>
        {allChildren}
      </Stage>
    </div>
  );

}
