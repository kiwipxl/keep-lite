import { CREATE_LABEL, DELETE_LABEL, RENAME_LABEL } from "../actions/labels";
import { AUTH_LOGIN } from "../actions/auth";

const initialState = {
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

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_LABEL:
      return {
        ...state,
        [action.payload.id]: { name: action.payload.name },
      };

    case DELETE_LABEL:
      // Remove label from state via computed object properties
      let { [action.payload.id]: _, ...newState } = state;
      return newState;

    case RENAME_LABEL:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          name: action.payload.name,
        },
      };

    case AUTH_LOGIN: {
      let res = { ...state };

      for (const label of action.payload.labels) {
        res[label.id] = label;
      }

      return res;
    }

    default:
      return state;
  }
};
