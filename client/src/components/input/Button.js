import styled from "styled-components";
import chroma from "chroma-js";

const Button = (props) => {
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

const BaseButton = styled.button`
  background-color: transparent;
  border-style: none;
  border-radius: 2px;
  padding: 5px;
  transition: background-color 0.15s;
  color: ${(props) => props.theme.textColor};

  &:hover {
    background-color: ${(props) =>
      chroma(props.theme.primaryColor).brighten().hex()};
    cursor: pointer;
  }
`;

const FillButton = styled(BaseButton)`
  background-color: ${(props) => props.theme.primaryColor};
  color: ${(props) => props.theme.invertedTextColor};

  &:hover {
    background-color: ${(props) =>
      chroma(props.theme.primaryColor).darken().hex()};
  }
`;

const OutlineButton = styled(BaseButton)`
  background-color: transparent;
  border-style: solid;
  border-width: 1px;
  border-color: ${(props) => props.theme.primaryColor};
  color: ${(props) => props.theme.primaryColor};

  &:hover {
    border-color: ${(props) => chroma(props.theme.primaryColor).hex()};
    background-color: ${(props) =>
      chroma(props.theme.primaryColor).alpha(0.25).hex()};
  }
`;

export default Button;
