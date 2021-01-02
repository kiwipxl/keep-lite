import {
  ADD_NOTE,
  SET_NOTE_TITLE,
  SET_NOTE_BODY,
  ADD_LABEL,
  RENAME_LABEL,
} from "./actions";

export const notes = (state = {}, action) => {
  switch (action.type) {
    case ADD_NOTE:
      return {
        ...state,
        [action.payload.id]: { ...action.payload.content },
      };

    case SET_NOTE_TITLE:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          title: action.payload.title,
        },
      };

    case SET_NOTE_BODY:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          body: action.payload.body,
        },
      };

    default:
      return state;
  }
};

const initialLabelState = {
  1: {
    name: "Art",
  },
  2: {
    name: "Art/Drawing",
  },
  3: {
    name: "Science",
  },
  4: {
    name: "Philosophy",
  },
};

export const labels = (state = initialLabelState, action) => {
  switch (action.type) {
    case ADD_LABEL:
      return {
        ...state,
        [action.payload.id]: { name: action.payload.name },
      };

    case RENAME_LABEL:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          name: action.payload.name,
        },
      };

    default:
      return state;
  }
};
