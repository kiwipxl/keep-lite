import { createStore, combineReducers } from "redux";
import notes from "./reducers/notes";
import labels from "./reducers/labels";
import auth from "./reducers/auth";

export default createStore(
  combineReducers({ notes, labels, auth }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
