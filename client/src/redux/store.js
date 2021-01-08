import { createStore, combineReducers } from "redux";
import notes from "./reducers/notes";
import labels from "./reducers/labels";
import auth from "./reducers/auth";
import { onReduxAction } from "../sync/sync_resolvers";

export default createStore(
  combineReducers({
    notes,
    labels,
    auth,
    sync: (state = {}, action) => {
      onReduxAction(action);
      return state;
    },
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
