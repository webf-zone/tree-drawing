import { css, cx } from 'emotion';
import { h } from 'preact';
import { useState } from 'preact/hooks';

import { sampleForest } from '../sample';
import { Button } from './Button';
import { Playground } from './Playground';
import { beautify } from './traverse';
import { SVGIcon } from '../icons/SVGIcon';


const appStyle = css`
  display: grid;

  width: 100vw;
  height: 100vh;

  grid-template-rows: auto 1fr;
  grid-template-columns: auto 1fr;

  grid-template-areas:
    'header header'
    'toolbox playground';
`;

const headerStyle = css`
  grid-area: header;

  padding: 1rem;
  background: #00364D;

  color: white;

  h1 {
    font-weight: normal;
    letter-spacing: 0.025rem;
  }
`;

const toolboxStyle = css`
  grid-area: toolbox;

  width: 300px;

  background: #F8F8F8;
  border-right: 1px solid #f0f0f0;
  box-shadow: 0 0 4px rgb(200, 200, 200);
`;

const playgroundStyle = css`
  grid-area: playground;

  min-width: 0;
  min-height: 0;
`;

const beautifyStyle = css`
  svg .o1 {
    fill: pink;
  }
`;

const zoomStatusStyle = css`
  margin-left: 1rem;
`;

const toolboxHeader = css`
  background-color: grey;
  color: white;
  font-weight: bold;
  padding: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;

  svg {
    margin-right: 1rem;
    fill: currentColor;
  }
`;

const resetStyle = css`
  svg .o1 {
    fill: lightgrey;
  }
`;

export function App() {

  const [forest, setForest] = useState(sampleForest);
  const [zoom, setZoom] = useState(1);

  const onClick = () => {

    const tree = forest.trees[0];
    const newTree = beautify(tree);

    onZoomReset();
    setForest({ trees: [newTree] });
  };

  const onZoomIn = () => {
    setZoom(Math.min(2, zoom + 0.1));
  };

  const onZoomOut = () => {
    setZoom(Math.max(0.5, zoom - 0.1));
  };

  const onZoomReset = () => {
    setZoom(1);
  };

  return (
    <div class={cx('app', appStyle)}>
      <header class={headerStyle}>
        <h1>Application - Reingold Tilford</h1>
      </header>
      <div class={toolboxStyle}>
        <div class={toolboxHeader}>
          <SVGIcon name="menu" width="24" height="24"></SVGIcon>
          Toolbox
        </div>
        <Button class={beautifyStyle} onClick={onClick}>Beautify</Button>
        <hr /><br />
        <div class={zoomStatusStyle}>Zoom Level: {zoom.toFixed(1)}</div>
        <Button onClick={onZoomIn}>Zoom In (+) </Button>
        <Button onClick={onZoomOut}>Zoom Out (-) </Button>
        <Button class={resetStyle} onClick={onZoomReset}>Zoom Reset</Button>
      </div>
      <Playground class={playgroundStyle} forest={forest} scale={zoom} />
    </div>
  );
}
