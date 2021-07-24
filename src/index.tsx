import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { createGlobalStyle } from 'styled-components';
import { ChakraProvider, ThemeProvider, theme } from '@chakra-ui/react';

import Main from './pages/Main';
import { BoxProvider } from './database/context';

const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
  }

  body {
    margin: 0;
    width: 100%;
    height: 100%;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  #root {
    width: 100%;
    height: 100%;
  }

  // Global transition style
  .move-enter {
    opacity: 0.01;
    transform: translate(-40px, 0)
  }

  .move-enter-active {
    opacity: 1;
    transform: translate(0, 0);
    transition: all 200ms ease-in;
  }

  .move-exit {
    opacity: 1;
    transform: translate(0, 0)
  }

  .move-exit-active {
    opacity: 0.01;
    transform: translate(40px, 0);
    transition: all 200ms ease-in;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <BoxProvider>
      <ChakraProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Main />
        </ThemeProvider>
      </ChakraProvider>
    </BoxProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
