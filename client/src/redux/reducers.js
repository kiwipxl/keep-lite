import { ADD_NOTE, SET_NOTE_TITLE, SET_NOTE_BODY } from "./actions";

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
