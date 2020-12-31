import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import MainScreen from "./screens/MainScreen";
import EditNoteScreen from "./screens/EditNoteScreen";
import NotFoundScreen from "./screens/NotFoundScreen";
import theme from "./theme";
import sample_labels from "./sample_labels.json";
import sample_notes from "./sample_notes.json";
import store from "./redux/store";

const AppContent = styled.div`
  overflow: hidden;
  position: relative;
  left: calc(50% - 200px);
  width: 400px;
  height: 600px;
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.onBackgroundColor};
`;

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <AppContent>
            <Switch>
              <Route exact path="/note/:nid">
                <EditNoteScreen></EditNoteScreen>
              </Route>

              <Route exact path="/">
                <MainScreen></MainScreen>
              </Route>

              <Route>
                <NotFoundScreen></NotFoundScreen>
              </Route>
            </Switch>
          </AppContent>
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
