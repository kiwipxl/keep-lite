import { createStore, combineReducers } from "redux";
import { notes, labels } from "./reducers";

export default createStore(
  combineReducers({ notes, labels }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
