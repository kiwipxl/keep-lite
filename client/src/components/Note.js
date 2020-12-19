import styled from "styled-components";

const Note = ({ className }) => {
  return <span className={className}>NOTE</span>;
};

export default styled(Note)`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.surfaceColor};
  border-color: ${(props) => props.theme.borderColor00dp};
  border-style: solid;
  border-width: 1px;
  border-radius: 3px;
`;
