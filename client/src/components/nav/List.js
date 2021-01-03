import React from "react";
import styled from "styled-components";

const List = ({ className, children }) => {
  return <div className={className}>{children}</div>;
};

export default styled(List)`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  background-color: ${(props) => props.theme.surfaceColor};
  overflow-y: auto;
`;
