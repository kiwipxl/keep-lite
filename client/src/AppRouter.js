import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import MainScreen from "./screens/MainScreen";
import EditNoteScreen from "./screens/EditNoteScreen";
import NotFoundScreen from "./screens/NotFoundScreen";
import AddLabelsScreen from "./screens/AddLabelsScreen";
import ManageLabelsScreen from "./screens/ManageLabelsScreen";
import AuthScreen from "./screens/AuthScreen";
import LabelNotesScreen from "./screens/LabelNotesScreen";

const AppRouter = () => {
  const signedInUser = useSelector((state) => state.auth.user);

  if (!signedInUser) {
    return <AuthScreen></AuthScreen>;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/note/:noteId/labels">
          <AddLabelsScreen></AddLabelsScreen>
        </Route>

        <Route exact path="/note/:noteId">
          <EditNoteScreen></EditNoteScreen>
        </Route>

        <Route exact path="/labels/edit">
          <ManageLabelsScreen></ManageLabelsScreen>
        </Route>

        <Route exact path="/labels/:labelId">
          <LabelNotesScreen></LabelNotesScreen>
        </Route>

        <Route exact path="/">
          <MainScreen></MainScreen>
        </Route>

        <Route>
          <NotFoundScreen></NotFoundScreen>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;
