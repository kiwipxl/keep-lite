import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Toast from "./Toast";
import { removeOldestGlobalToast } from "../redux/actions/misc";

const GlobalToast = () => {
  const dispatch = useDispatch();
  const toast = useSelector((state) => {
    if (state.misc.toasts.length > 0) {
      return state.misc.toasts[0];
    }
  });

  if (!toast) {
    return <div></div>;
  }

  function onDismissed() {
    setTimeout(() => dispatch(removeOldestGlobalToast()), 500);
  }

  if (toast.custom) {
    return <div>{toast.render({ onDismissed })}</div>;
  } else {
    return (
      <Toast
        variant={toast.variant}
        message={toast.message}
        dismissable
        onDismissed={onDismissed}
      ></Toast>
    );
  }
};

export default GlobalToast;
