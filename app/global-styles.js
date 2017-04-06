import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  body {
    font-family: 'Roboto' , Helvetica Neue, Helvetica, Arial, sans-serif;
		box-sizing: border-box;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

	#app {
		height: 100vh;
		width: 100vw;
	}

  .editor{
    @media (max-width: 1100px) {
     width: 800px !important;
    };
    @media (max-width: 600px) {
     width: 350px !important;
    };
    @media (max-width: 400px) {
     width: 300px !important;
    };
    width: 450px !important;
  }
`;
