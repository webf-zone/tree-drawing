import { css, cx } from 'emotion';
import { h } from 'preact';
import { useState } from 'preact/hooks';

import { sampleForest } from '../sample';
import { Button } from './Button';
import { Playground } from './Playground';
import { beautify } from './traverse';


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

  padding: 1rem;
`;

const playgroundStyle = css`
  grid-area: playground;

  min-width: 0;
  min-height: 0;
`;

export function App() {

  const [forest, setForest] = useState(sampleForest);

  const onClick = () => {

    const tree = forest.trees[0];
    const newTree = beautify(tree);

    setForest({ trees: [newTree] });
  };

  return (
    <div class={cx('app', appStyle)}>
      <header class={headerStyle}>
        <h1>Application - Reingold Tilford</h1>
      </header>
      <div class={toolboxStyle}>
        <strong>Toolbox</strong>
        <Button onClick={onClick}>Beautify</Button>
      </div>
      <Playground class={playgroundStyle} forest={forest} />
    </div>
  );
}
