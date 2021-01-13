export const ADD_GLOBAL_TOAST = "ADD_GLOBAL_TOAST";
export const ADD_GLOBAL_TOAST_CUSTOM = "ADD_GLOBAL_TOAST_CUSTOM";
export const REMOVE_OLDEST_GLOBAL_TOAST = "REMOVE_OLDEST_GLOBAL_TOAST";

export const addGlobalToast = (variant, message) => ({
  type: ADD_GLOBAL_TOAST,
  variant: variant,
  message: message,
});

export const addGlobalToastCustom = (render) => ({
  type: ADD_GLOBAL_TOAST_CUSTOM,
  render: render,
});

export const removeOldestGlobalToast = () => ({
  type: REMOVE_OLDEST_GLOBAL_TOAST,
});
