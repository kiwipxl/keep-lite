import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import NoteCardGrid from "../components/note/NoteCardGrid";
import Header from "../components/Header";
import { getNotesByLabel } from "../sync/queries";

const LabelNotesScreen = ({ className }) => {
  const routerHistory = useHistory();
  const { labelId } = useParams();
  const notesList = useSelector((state) => {
    const res = [];
    for (const noteId of Object.keys(state.notes)) {
      const note = state.notes[noteId];
      if (note.labels.includes(labelId)) {
        res.push({ ...note, id: noteId });
      }
    }
    return res;
  });
  const label = useSelector((state) => state.labels[labelId]);

  React.useEffect(() => {
    if (label) {
      getNotesByLabel(label.id, 10);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!label) {
    console.error(`label id ${labelId} does not exist`);
    routerHistory.replace("/404");
    return <div></div>;
  }

  return (
    <div className={className}>
      <Header backButton title={label.name}></Header>

      <StyledNoteCardGrid notes={notesList}></StyledNoteCardGrid>
    </div>
  );
};

const StyledNoteCardGrid = styled(NoteCardGrid)`
  padding: 10px;
  padding-top: 0px;
  flex: 1;
`;

export default styled(LabelNotesScreen)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  overflow-y: auto;
`;
