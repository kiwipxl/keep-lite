import { createStore, combineReducers } from "redux";
import { notes } from "./reducers";

export default createStore(
  combineReducers({ notes }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
