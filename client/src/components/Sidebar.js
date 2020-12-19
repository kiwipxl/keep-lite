import React from "react";
import styled from "styled-components";

const Sidebar = ({ className, children }) => {
  return <div className={className}>{children}</div>;
};

export default styled(Sidebar)`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;

  position: absolute;
  width: 300px;
  height: 100%;
  left: ${(props) => (props.hidden ? -350 : 0)}px;
  background-color: ${(props) => props.theme.backgroundColor};

  transition: left 0.3s;
`;
