import styled from "styled-components";
import NoteCard from "./NoteCard";

const NoteCardGrid = ({ className, width, notes }) => {
  const numColumns = 2;
  const spacingX = 5;
  const spacingY = 10;
  const cardWidth = width / numColumns - spacingX / (numColumns - 1);

  let columns = [];

  for (let column = 0; column < numColumns; ++column) {
    columns.push(
      <Column key={column} id={column}>
        {notes.map((note, index) => {
          if (index % numColumns != column) {
            return null;
          }

          return (
            <StyledNoteCard
              key={note.id}
              id={note.id}
              title={note.title}
              body={note.body}
              labels={note.labels}
              width={cardWidth}
              spacingY={spacingY}
            ></StyledNoteCard>
          );
        })}
      </Column>
    );
  }

  return <div className={className}>{columns}</div>;
};

const StyledNoteCard = styled(NoteCard)`
  width: ${(props) => props.width}px;
  margin-bottom: ${(props) => props.spacingY}px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export default styled(NoteCardGrid)`
  width: ${(props) => props.width}px;
  display: flex;
  justify-content: space-between;
`;
