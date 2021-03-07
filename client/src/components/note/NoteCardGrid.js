import styled from "styled-components";
import NoteCard from "./NoteCard";
import App from "../../App";

const NoteCardGrid = ({ className, width, notes }) => {
  if (!width) {
    // NOTE: Subtract padding (10px is the most common padding applied).
    width = App.width - 20;
  }

  let numColumns = Math.min(Math.max(Math.round(width / 300), 2), 4);
  // Make sure we don't have more columns than notes, otherwise it will look oddly spaced out
  numColumns = Math.min(numColumns, notes.length);

  const spacingX = 5;
  const spacingY = 10;
  const cardWidth = width / numColumns - spacingX;

  let columns = [];

  for (let column = 0; column < numColumns; ++column) {
    columns.push(
      <Column key={column} id={column}>
        {notes.map((note, index) => {
          if (index % numColumns !== column) {
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
