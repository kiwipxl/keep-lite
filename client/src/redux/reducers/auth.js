import { AUTH_LOGIN } from "../actions/auth";

export default (state = {}, action) => {
  switch (action.type) {
    case AUTH_LOGIN:
      return {
        ...state,
        user: {
          id: action.payload.user.id,
          authProvider: action.payload.user.authProvider,
          email: action.payload.user.email,
          name: action.payload.user.name,
          created: action.payload.user.created,
        },
      };

    default:
      return state;
  }
};
