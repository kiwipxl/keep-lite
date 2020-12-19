import styled from "styled-components";

const Icon = ({ className, Component, variant, onClick }) => {
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
      <Component className={className}></Component>
    </StyledIcon>
  );
};

const BaseIcon = styled.div`
  color: white;
`;

const IconButton = styled(BaseIcon)`
  transition: color 0.2s;

  &:hover {
    color: blue;
    cursor: pointer;
  }
`;

export default Icon;
