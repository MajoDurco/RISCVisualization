import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  body {
    font-family: Roboto , Helvetica Neue, Helvetica, Arial, sans-serif;
		box-sizing: border-box;
  }

	#app {
		height: 100vh;
		width: 100vw;
	}

  .editor{
    width: 95% !important;
  }
`;
