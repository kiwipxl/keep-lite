import { ADD_NOTE, SET_NOTE_TITLE } from "./actions";

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

    default:
      return state;
  }
};
