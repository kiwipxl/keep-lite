import React from "react";
import styled from "styled-components";
import Button from "./Button";
import { usePreventMouseDown } from "./util";

const ToggleButton = (props) => {
  const { className, children, variant, preventMouseDown } = props;

  const ref = React.createRef();
  usePreventMouseDown(ref, preventMouseDown);

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
