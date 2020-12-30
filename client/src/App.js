import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import { Provider, connect } from "react-redux";
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

App.LabelsContext = React.createContext(sample_labels);
App.NotesContext = React.createContext([]);

function App() {
  const [labels, setLabels] = React.useState(sample_labels);
  const [notes, setNotes] = React.useState([]);

  function addNotes(newNotes) {
    setNotes(notes.concat(newNotes));
  }

  React.useEffect(() => {
    addNotes(sample_notes);
  }, []);

  return (
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <App.NotesContext.Provider value={notes}>
            <App.LabelsContext.Provider value={labels}>
              <AppContent>
                <Switch>
                  <Route exact path="/note/:nid">
                    <EditNoteScreen></EditNoteScreen>
                  </Route>

                  <Route exact path="/">
                    <MainScreen addNotes={addNotes}></MainScreen>
                  </Route>

                  <Route>
                    <NotFoundScreen></NotFoundScreen>
                  </Route>
                </Switch>
              </AppContent>
            </App.LabelsContext.Provider>
          </App.NotesContext.Provider>
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
