import React from "react";
import styled, { keyframes } from "styled-components";
import config from "../config";
import Button from "./input/Button";

const Toast = ({
  className,
  children,
  variant,
  duration,
  message,
  dismissable,
  onDismissed,
}) => {
  const [visible, setVisible] = React.useState(true);

  let StyledVariant;
  switch (variant) {
    case "warning":
      StyledVariant = WarningVariant;
      break;

    case "error":
      StyledVariant = ErrorVariant;
      break;

    default:
      StyledVariant = InfoVariant;
      break;
  }

  function dismiss() {
    setVisible(false);

    if (onDismissed) {
      onDismissed();
    }
  }

  if (duration && duration > 0) {
    setTimeout(dismiss, duration);
  }

  return (
    <StyledVariant className={className} visible={visible}>
      {message && <Message>{message}</Message>}

      {dismissable && <DismissButton onClick={dismiss}>OK</DismissButton>}

      {children}
    </StyledVariant>
  );
};

const SlideInAnimation = keyframes`
  from {
    bottom: -80px;
  }
  to {
    bottom: 0px;
  }
`;

const InfoVariant = styled.div`
  width: calc(100% - 40px);
  height: 20px;
  display: flex;
  align-items: center;
  position: absolute;
  bottom: ${(props) => (props.visible ? 0 : -80)}px;
  transition: bottom 0.25s;

  padding: 20px;
  background-color: ${(props) =>
    props.theme.elevate03dp(props.theme.surfaceColor)};
  z-index: ${config.sortingOrder.toast};

  animation-name: ${SlideInAnimation};
  animation-duration: 0.25s;
`;

const WarningVariant = styled(InfoVariant)``;

const ErrorVariant = styled(InfoVariant)``;

const Message = styled.div`
  font-size: 16px;
  flex: 1;
`;

const DismissButton = styled(Button)`
  width: 60px;
`;

export default styled(Toast)``;
