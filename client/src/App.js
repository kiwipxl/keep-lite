import React from "react";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import store from "./redux/store";
import { ApolloProvider } from "@apollo/client";
import { Provider } from "react-redux";
import theme from "./theme";
import AppRouter from "./AppRouter";
import gqlClient from "./gqlClient";

const AppContent = styled.div`
  overflow: hidden;
  position: relative;
  left: calc(50% - 200px);
  width: 400px;
  height: ${window.innerHeight}px;
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.onBackgroundColor};
`;

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ApolloProvider client={gqlClient}>
          <AppContent>
            <AppRouter></AppRouter>
          </AppContent>
        </ApolloProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
