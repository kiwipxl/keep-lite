import { AUTH_SIGN_IN } from "../actions/auth";

export default (state = {}, action) => {
  switch (action.type) {
    case AUTH_SIGN_IN:
      return {
        ...state,
      };

    default:
      return state;
  }
};
