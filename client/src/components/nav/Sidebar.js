import React from "react";
import styled from "styled-components";
import Backdrop from "../Backdrop";

const Sidebar = ({ className, children, hidden, onOpen, onClose }) => {
  return (
    <div>
      <Backdrop zIndex={10} hidden={hidden} onClick={onClose}></Backdrop>
      <div className={className}>{children}</div>
    </div>
  );
};

export default styled(Sidebar)`
  position: absolute;
  width: 300px;
  height: 100%;
  top: 0px;
  left: ${(props) => (props.hidden ? -350 : 0)}px;
  background-color: ${(props) =>
    props.theme.elevate01dp(props.theme.surfaceColor)};
  transition: left 0.3s;
  z-index: 20;
`;
