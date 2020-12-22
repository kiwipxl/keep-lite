import styled from "styled-components";

const Input = (props) => {
  return <input {...props}></input>;
};

export default styled(Input)`
  background-color: transparent;
  border-style: none;
  color: ${(props) => props.theme.onSurfaceColor};
`;
