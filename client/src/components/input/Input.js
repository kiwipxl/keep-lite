import React from "react";
import styled from "styled-components";

const Input = React.forwardRef((props, ref) => {
  const { onChange } = props;

  return <input ref={ref} {...props}></input>;
});

export default styled(Input)`
  background-color: transparent;
  border-style: none;
  color: ${(props) => props.theme.onSurfaceColor};
`;
