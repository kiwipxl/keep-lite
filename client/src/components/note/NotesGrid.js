import styled from "styled-components";

const NotesGrid = ({ className, children }) => {
  return <div className={className}>{children}</div>;
};

export default styled(NotesGrid)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-auto-rows: minmax(150px, auto);
  grid-gap: 15px;

  padding: 10px;
`;
