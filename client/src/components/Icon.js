import React from "react";
import styled from "styled-components";
import { usePreventMouseDown } from "./input/util";

const Icon = ({
  className,
  Component,
  variant,
  size,
  onClick,
  preventMouseDown,
}) => {
  if (!Component) {
    throw new Error("Must define Component property for icon");
  }

  const ref = React.createRef();
  usePreventMouseDown(ref, preventMouseDown);

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
    <StyledIcon className={className} ref={ref} onClick={onClick}>
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
