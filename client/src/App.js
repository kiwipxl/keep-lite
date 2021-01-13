import React from "react";
import styled from "styled-components";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import store from "./redux/store";
import { ApolloProvider } from "@apollo/client";
import { Provider } from "react-redux";
import theme from "./theme";
import AppRouter from "./AppRouter";
import gqlClient from "./gqlClient";
import config from "./config";
import Toast from "./components/Toast";
import sync from "./sync/sync";

function getDimensions() {
  let left = 0;
  let width = window.innerWidth;
  let height = window.innerHeight;
  let aspectRatio = height / width;

  if (aspectRatio < config.maxAspectRatio) {
    width = height / config.maxAspectRatio;
    left = (window.innerWidth - width) / 2;
  }

  return { width: width, height: height, left: left };
}

function App() {
  const [dimensions, setDimensions] = React.useState(getDimensions());

  App.width = dimensions.width;
  App.height = dimensions.height;

  window.onresize = () => setDimensions(getDimensions());

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ApolloProvider client={gqlClient}>
          <AppContent
            left={dimensions.left}
            width={dimensions.width}
            height={dimensions.height}
          >
            <GlobalStyle></GlobalStyle>
            <AppRouter></AppRouter>

            <Toast message="This is a message" cancellable></Toast>
          </AppContent>
        </ApolloProvider>
      </ThemeProvider>
    </Provider>
  );
}

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    user-select: none;
    background-color: #121212;

    overflow: hidden;
  }

  a {
    outline: none;
  }

  button {
    outline: none;
  }

  input {
    outline: none;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  }
`;

const AppContent = styled.div`
  overflow: hidden;
  position: relative;
  left: ${(props) => props.left}px;
  width: ${(props) => props.width - 2}px;
  height: ${(props) => props.height - 2}px;
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.onBackgroundColor};
  border-style: solid;
  border-color: ${(props) => theme.elevate01dp(props.theme.backgroundColor)};
  border-width: 1px;
`;

export default App;
