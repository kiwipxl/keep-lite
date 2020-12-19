import styled from "styled-components";

const Button = ({ className, children, variant }) => {
  let StyledButton = BaseButton;
  switch (variant) {
    case "fill":
      StyledButton = FillButton;
      break;

    case "outline":
      StyledButton = OutlineButton;
      break;
  }

  return <StyledButton className={className}>{children}</StyledButton>;
};

const BaseButton = styled.button`
  background-color: transparent;
  border-style: none;
  border-radius: 2px;
  padding: 5px;
  transition: background-color 0.1s;
  color: ${(props) => props.theme.primaryColor};

  &:hover {
    background-color: ${(props) => props.theme.primaryColorLighter};
  }
`;

const FillButton = styled(BaseButton)`
  background-color: ${(props) => props.theme.primaryColor};
  color: ${(props) => props.theme.primaryColorDarker};

  &:hover {
    background-color: ${(props) => props.theme.primaryColorDarker};
    color: ${(props) => props.theme.primaryColorLighter};
  }
`;

const OutlineButton = styled(BaseButton)`
  background-color: transparent;
  border-style: solid;
  border-width: 1px;
  border-color: ${(props) => props.theme.primaryColor};

  &:hover {
    background-color: ${(props) => props.theme.primaryColor};
    color: ${(props) => props.theme.primaryColorDarker};
  }
`;

export default Button;
