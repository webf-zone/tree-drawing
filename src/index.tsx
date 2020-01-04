import { h, render } from 'preact';

import { App } from './app/App';

import './globalStyle';

document.addEventListener('DOMContentLoaded', () => {

  const div = document.createElement('div');

  document.body.appendChild(div);

  // Initialize application
  render(<App />, div);

});
