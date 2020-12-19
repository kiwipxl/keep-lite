import React from "react";
import styled from "styled-components";
import DarkOverlay from "../components/DarkOverlay";

const Sidebar = ({ className, children, hidden, onOpen, onClose }) => {
  return (
    <div>
      <DarkOverlay zIndex={5} hidden={hidden} onClick={onClose}></DarkOverlay>
      <div className={className}>{children}</div>;
    </div>
  );
};

export default styled(Sidebar)`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  z-index: 10;

  position: absolute;
  width: 300px;
  height: 100%;
  left: ${(props) => (props.hidden ? -350 : 0)}px;
  background-color: ${(props) => props.theme.backgroundColor};

  transition: left 0.3s;
`;
