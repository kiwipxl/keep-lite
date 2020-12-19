import styled from "styled-components";

const Icon = ({ className }) => {
  return <div className={className}></div>;
};

export default styled(Icon)`
  width: 50px;
  height: 50px;
  background-color: grey;
  border-color: none;
`;
