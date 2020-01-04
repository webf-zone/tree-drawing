import { injectGlobal } from 'emotion';


injectGlobal`
  @import 'https://fonts.googleapis.com/css?family=Lato&display=swap';

  * {
    margin: 0;
    padding: 0;
  }

  html, body {
    font-family: 'Lato', sans-serif;
  }
`;
