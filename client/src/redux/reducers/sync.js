import { CREATE_LABEL, DELETE_LABEL, RENAME_LABEL } from "../actions/labels";
import {
  CREATE_NOTE,
  SET_NOTE_TITLE,
  SET_NOTE_BODY,
  ADD_NOTE_LABEL,
  REMOVE_NOTE_LABEL,
} from "../actions/notes";
import { SYNC_PUSH, SYNC_POP } from "../actions/sync";
import sync from "../../sync/sync";

const initialState = {
  queue: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NOTE:
    case SET_NOTE_TITLE:
    case SET_NOTE_BODY:
    case ADD_NOTE_LABEL:
    case REMOVE_NOTE_LABEL:
    case CREATE_LABEL:
    case RENAME_LABEL:
    case DELETE_LABEL:
      if (action.sync === true || action.sync === undefined) {
        setTimeout(() => sync.push(action), 0);
      }
      return state;

    case SYNC_PUSH:
      return {
        ...state,
        queue: state.queue.concat(action.action),
      };

    case SYNC_POP:
      console.log("sync", action.action.type);

      state.queue.splice(0, 1);

      return {
        ...state,
      };

    default:
      return state;
  }
};
