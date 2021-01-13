import { createStore, combineReducers } from "redux";
import notes from "./reducers/notes";
import labels from "./reducers/labels";
import auth from "./reducers/auth";
import sync from "./reducers/sync";
import misc from "./reducers/misc";

export default createStore(
  combineReducers({
    notes,
    labels,
    auth,
    sync,
    misc,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
