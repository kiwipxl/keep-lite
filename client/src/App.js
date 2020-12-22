import { BrowserRouter, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import MainScreen from "./screens/MainScreen";
import EditNoteScreen from "./screens/EditNoteScreen";
import theme from "./theme";

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
      <ThemeProvider theme={theme}>
        <AppContent>
          <Switch>
            <Route path="/note/1">
              <EditNoteScreen></EditNoteScreen>
            </Route>

            <Route path="/">
              <MainScreen></MainScreen>
            </Route>
          </Switch>
        </AppContent>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
