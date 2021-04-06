import React from 'react';
import logo from './logo.svg';

import styled, { keyframes } from 'styled-components';

function AppComponent() {
  return (
    <App>
      <AppHeader>
        <AppLogo src={logo} alt="logo" />
      </AppHeader>
    </App>
  );
}

const App = styled.div`
  text-align: center;
`;

const AppHeader = styled.header`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const AppLogoSpin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const AppLogo = styled.img`
  height: 40vmin;
  pointer-events: none;

  @media (prefers-reduced-motion: no-preference) {
    animation: ${AppLogoSpin} infinite 20s linear;
  }
`;

export default AppComponent;
