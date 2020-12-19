import styled from "styled-components";

const Note = ({ className }) => {
  return <span className={className}>NOTE</span>;
};

export default styled(Note)`
  width: 100%;
  height: 100%;
  background-color: rgb(240, 100, 100);
`;
