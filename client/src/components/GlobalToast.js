import React from "react";
import { useSelector, useDispatch } from "react-redux";
import config from "../config";
import Toast from "./Toast";

const GlobalToast = ({}) => {
  const toast = useSelector((state) => {
    if (state.misc.toasts.length > 0) {
      return state.misc.toasts[0];
    }
  });

  if (!toast) {
    return <div></div>;
  }

  return <div>{toast.render()}</div>;
};

export default GlobalToast;
