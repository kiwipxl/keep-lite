import styled from "styled-components";

const Button = (props) => {
  return <button {...props}></button>;
};

export default styled(Button)`
  background-color: grey;
  border-style: solid;
  border-width: 2px;
  border-color: grey;
  padding: 5px;
`;
