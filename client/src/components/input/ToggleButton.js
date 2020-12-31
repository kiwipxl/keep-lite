import React from "react";
import styled from "styled-components";
import chroma from "chroma-js";
import Button from "./Button";

const ToggleButton = (props) => {
  const { className, children, variant, preventMouseDown } = props;
  const ref = React.createRef();

  let StyledButton;
  switch (variant) {
    case "fill":
      StyledButton = FillButton;
      break;

    case "outline":
      StyledButton = OutlineButton;
      break;

    default:
      StyledButton = BaseButton;
      break;
  }

  React.useEffect(() => {
    ref.current.addEventListener("mousedown", (e) => {
      // `preventMouseDown` is useful when it comes to focus on Inputs.
      // If we're focusing on an Input and we click a button normally, we lose focus.
      // The mouseDown even deactivates our focus.
      // By preventing mouse down, we keep our focus on the Input.
      // MouseUp (onClick) still works fine too.
      if (preventMouseDown) {
        e.preventDefault();
      }
    });
  }, []);

  return (
    <StyledButton className={className} ref={ref} {...props}>
      {children}
    </StyledButton>
  );
};

const BaseButton = styled(Button.StyledBaseButton)`
  opacity: ${(props) => (props.toggled ? 1 : 0.4)};
`;

const FillButton = styled(Button.StyledFillButton)`
  opacity: ${(props) => (props.toggled ? 1 : 0.4)};
`;

const OutlineButton = styled(BaseButton)`
  opacity: ${(props) => (props.toggled ? 1 : 0.4)};
`;

export default ToggleButton;
