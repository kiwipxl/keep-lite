import {
  ADD_GLOBAL_TOAST,
  ADD_GLOBAL_TOAST_CUSTOM,
  REMOVE_OLDEST_GLOBAL_TOAST,
} from "../actions/misc";

const initialState = {
  toasts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_GLOBAL_TOAST: {
      return {
        ...state,
        toasts: [].concat(state.toasts).concat({
          variant: action.variant,
          message: action.message,
          custom: false,
        }),
      };
    }

    case ADD_GLOBAL_TOAST_CUSTOM: {
      return {
        ...state,
        toasts: [].concat(state.toasts).concat({
          render: action.render,
          custom: true,
        }),
      };
    }

    case REMOVE_OLDEST_GLOBAL_TOAST: {
      const toasts = [].concat(state.toasts);
      toasts.splice(0, 1);

      return {
        ...state,
        toasts,
      };
    }

    default:
      return state;
  }
};
