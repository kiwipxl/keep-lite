import {
  CREATE_NOTE,
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
      if (state.labels.includes(action.payload.labelId)) {
        return state;
      }

      return {
        ...state,
        labels: state.labels.concat(action.payload.labelId),
      };
    }

    case REMOVE_NOTE_LABEL: {
      if (!state.labels.includes(action.payload.labelId)) {
        return state;
      }

      state.labels.splice(state.labels.indexOf(action.payload.labelId), 1);
      return {
        ...state,
        labels: state.labels,
      };
    }

    default:
      return state;
  }
};

export default (state = {}, action) => {
  const id = (action.payload && action.payload.id) || -1;

  switch (action.type) {
    case CREATE_NOTE:
      return {
        ...state,
        [id]: {
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
        [id]: {
          ...note(state[id], action),
        },
      };

    default:
      return state;
  }
};
