import React from "react";
import styled from "styled-components";
import config from "../config";
import Button from "./input/Button";
import Toast from "./Toast";

const ViewDetailsToast = ({
  className,
  children,
  duration,
  message,
  onDismissed,
  renderDetails,
}) => {
  const [visible, setVisible] = React.useState(true);
  const [detailsVisible, setDetailsVisible] = React.useState(false);

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
    <div>
      <Details visible={visible && detailsVisible}>{renderDetails()}</Details>

      <StyledToast className={className} visible={visible}>
        {message && <Message>{message}</Message>}

        <DetailsButton onClick={() => setDetailsVisible(!detailsVisible)}>
          {detailsVisible && "Hide Details"}
          {!detailsVisible && "Show Details"}
        </DetailsButton>
        <DismissButton onClick={dismiss}>OK</DismissButton>

        {children}
      </StyledToast>
    </div>
  );
};

const StyledToast = styled(Toast.InfoVariant)``;

const Details = styled.div`
  width: calc(100% - 40px);
  position: absolute;
  bottom: ${(props) => (props.visible ? 60 : -500)}px;
  transition: bottom 0.5s;

  padding: 20px;
  background-color: ${(props) =>
    props.theme.elevate06dp(props.theme.surfaceColor)};
  z-index: ${config.sortingOrder.toast};
`;

const Message = styled.div`
  font-size: 16px;
  flex: 1;
`;

const DetailsButton = styled(Button)`
  width: 100px;
`;

const DismissButton = styled(Button)`
  width: 60px;
`;

export default styled(ViewDetailsToast)``;
