import styled from "styled-components";

const Icon = ({ className, Component, variant, size, onClick }) => {
  if (!Component) {
    throw new Error("Must define Component property for icon");
  }

  let StyledIcon;
  switch (variant) {
    case "button":
      StyledIcon = IconButton;
      break;

    default:
      StyledIcon = BaseIcon;
      break;
  }

  return (
    <StyledIcon className={className} onClick={onClick}>
      <ComponentWrapper>
        <Component size={size}></Component>
      </ComponentWrapper>
    </StyledIcon>
  );
};

const BaseIcon = styled.div`
  color: ${(props) => props.theme.iconColor};
`;

const IconButton = styled(BaseIcon)`
  transition: color 0.2s;

  &:hover {
    color: ${(props) => props.theme.iconColorHighlighted};
    cursor: pointer;
  }
`;

const ComponentWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export default Icon;
