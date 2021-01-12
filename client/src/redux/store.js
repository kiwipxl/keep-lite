import { createStore, combineReducers } from "redux";
import notes from "./reducers/notes";
import labels from "./reducers/labels";
import auth from "./reducers/auth";
import sync from "../sync/sync";

export default createStore(
  combineReducers({
    notes,
    labels,
    auth,
    sync: (state = {}, action) => {
      sync.push(action);
      return state;
    },
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
