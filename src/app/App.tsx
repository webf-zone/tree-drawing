import { css, cx } from 'emotion';
import { h } from 'preact';
import { Playground } from './Playground';


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
`;

const playgroundStyle = css`
  grid-area: playground;

  min-width: 0;
  min-height: 0;
`;

export function App() {

  return (
    <div class={cx('app', appStyle)}>
      <header class={headerStyle}>
        <h1>Application - Reingold Tilford</h1>
      </header>
      <div class={toolboxStyle}>
        <p>Toolbox</p>
      </div>
      <Playground class={playgroundStyle} />
    </div>
  );
}
