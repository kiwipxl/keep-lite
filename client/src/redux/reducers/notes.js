import {
  ADD_NOTE,
  SET_NOTE_TITLE,
  SET_NOTE_BODY,
  ADD_NOTE_LABEL,
  REMOVE_NOTE_LABEL,
} from "../actions/notes";

const note = (state = {}, action) => {
  switch (action.type) {
    case SET_NOTE_TITLE:
      return {
        ...state,
        title: action.payload.title,
      };

    case SET_NOTE_BODY:
      return {
        ...state,
        body: action.payload.body,
      };

    case ADD_NOTE_LABEL: {
      if (state.labels.includes(action.payload.lid)) {
        return state;
      }

      state.labels.push(action.payload.lid);
      return state;
    }

    case REMOVE_NOTE_LABEL: {
      if (!state.labels.includes(action.payload.lid)) {
        return state;
      }

      state.labels.splice(state.labels.indexOf(action.payload.lid), 1);
      return state;
    }

    default:
      return state;
  }
};

export default (state = {}, action) => {
  const nid = (action.payload && action.payload.id) || -1;

  switch (action.type) {
    case ADD_NOTE:
      return {
        ...state,
        [nid]: {
          title: action.payload.title,
          body: action.payload.body,
          labels: action.payload.labels,
        },
      };

    case SET_NOTE_TITLE:
    case SET_NOTE_BODY:
    case ADD_NOTE_LABEL:
    case REMOVE_NOTE_LABEL:
      return {
        ...state,
        [nid]: {
          ...note(state[nid], action),
        },
      };

    default:
      return state;
  }
};
