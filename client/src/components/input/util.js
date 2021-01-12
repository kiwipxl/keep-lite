import React from "react";

// If enabled, mouse down events will be disabled.
// MouseUp events (onClick) will still work however.
//
// This is useful when it comes to focus on Inputs for example.
// If we're focusing on an Input and we click a button, we lose focus.
// By preventing mouseDown events, this keeps focus on the Input.
export const usePreventMouseDown = (ref, defaultEnabled) => {
  React.useEffect(() => {
    ref.current.addEventListener(
      "mousedown",
      (e) => {
        if (defaultEnabled) {
          e.preventDefault();
        }
      },
      []
    );
  });
};
