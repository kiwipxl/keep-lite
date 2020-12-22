import styled from "styled-components";
import chroma from "chroma-js";

const Button = (props) => {
  const { className, children, variant, disabled } = props;

  let StyledButton;
  switch (variant) {
    case "fill":
      StyledButton = disabled ? DisabledFillButton : FillButton;
      break;

    case "outline":
      StyledButton = disabled ? DisabledOutlineButton : OutlineButton;
      break;

    default:
      StyledButton = disabled ? DisabledBaseButton : BaseButton;
      break;
  }

  return (
    <StyledButton className={className} {...props}>
      {children}
    </StyledButton>
  );
};

const BaseButton = styled.button`
  background-color: transparent;
  border-style: none;
  border-radius: 2px;
  padding: 5px;
  transition: background-color 0.15s;
  color: ${(props) => props.theme.primaryColor};

  &:hover {
    background-color: ${(props) =>
      chroma(props.theme.primaryColor).alpha(0.25).hex()};
    cursor: pointer;
  }
`;

const DisabledBaseButton = styled(BaseButton)`
  opacity: 0.4;

  &:hover {
    background-color: transparent;
    cursor: auto;
  }
`;

const FillButton = styled(BaseButton)`
  background-color: ${(props) => props.theme.primaryColor};
  color: ${(props) => props.theme.onPrimaryColor};

  &:hover {
    background-color: ${(props) =>
      chroma.mix(props.theme.primaryColor, "black", 0.4, "rgb")};
  }
`;

const DisabledFillButton = styled(FillButton)`
  opacity: 0.4;

  &:hover {
    background-color: ${(props) => props.theme.primaryColor};
    cursor: auto;
  }
`;

const OutlineButton = styled(BaseButton)`
  background-color: transparent;
  border-style: solid;
  border-width: 1px;
  border-color: ${(props) => props.theme.primaryColor};
  color: ${(props) => props.theme.primaryColor};

  &:hover {
    border-color: ${(props) => props.theme.primaryColor};
    background-color: ${(props) =>
      chroma(props.theme.primaryColor).alpha(0.25).hex()};
  }
`;

const DisabledOutlineButton = styled(OutlineButton)`
  opacity: 0.4;

  &:hover {
    border-color: ${(props) => props.theme.primaryColor};
    background-color: transparent;
    cursor: auto;
  }
`;

Button.StyledBaseButton = BaseButton;
Button.StyledDisabledBaseButton = DisabledBaseButton;
Button.StyledFillButton = FillButton;
Button.StyledFillButton = FillButton;
Button.StyledBaseButton = OutlineButton;
Button.StyledOutlineButton = OutlineButton;

export default Button;
