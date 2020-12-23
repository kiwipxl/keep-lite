import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import MainScreen from "./screens/MainScreen";
import EditNoteScreen from "./screens/EditNoteScreen";
import theme from "./theme";
import sample_labels from "./sample_labels.json";

const AppContent = styled.div`
  overflow: hidden;
  position: relative;
  left: calc(50% - 200px);
  width: 400px;
  height: 600px;
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.onBackgroundColor};
`;

const LabelsContext = React.createContext([]);

function App() {
  const [labels, setLabels] = React.useState(sample_labels);
  const [mainNotes, setMainNotes] = React.useState([]);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <LabelsContext.Provider value={labels}>
          <AppContent>
            <Switch>
              <Route path="/note/1">
                <EditNoteScreen></EditNoteScreen>
              </Route>

              <Route path="/">
                <MainScreen
                  notes={mainNotes}
                  setNotes={setMainNotes}
                ></MainScreen>
              </Route>
            </Switch>
          </AppContent>
        </LabelsContext.Provider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

App.LabelsContext = LabelsContext;

export default App;
