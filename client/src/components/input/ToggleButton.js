import styled from "styled-components";
import chroma from "chroma-js";
import Button from "./Button";

const ToggleButton = (props) => {
  const { className, children, variant } = props;

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
    <StyledButton className={className} {...props}>
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
