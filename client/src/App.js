import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import store from "./redux/store";
import { Provider } from "react-redux";
import theme from "./theme";
import MainScreen from "./screens/MainScreen";
import EditNoteScreen from "./screens/EditNoteScreen";
import NotFoundScreen from "./screens/NotFoundScreen";
import AddLabelsScreen from "./screens/AddLabelsScreen";
import ManageLabelsScreen from "./screens/ManageLabelsScreen";

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
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <AppContent>
            <Switch>
              <Route exact path="/note/:nid/labels">
                <AddLabelsScreen></AddLabelsScreen>
              </Route>

              <Route exact path="/note/:nid">
                <EditNoteScreen></EditNoteScreen>
              </Route>

              <Route exact path="/labels/edit">
                <ManageLabelsScreen></ManageLabelsScreen>
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
