import { ADD_NOTE } from "./actions";

export const notes = (state = {}, action) => {
  switch (action.type) {
    case ADD_NOTE:
      return {
        ...state,
        [action.payload.id]: { ...action.payload.content },
      };

    default:
      return state;
  }
};
