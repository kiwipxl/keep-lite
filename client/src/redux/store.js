import { createStore, combineReducers } from "redux";
import notes from "./reducers/notes";
import labels from "./reducers/labels";
import auth from "./reducers/auth";
import sync from "./reducers/sync";

export default createStore(
  combineReducers({
    notes,
    labels,
    auth,
    sync,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
