import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { GoPencil } from "react-icons/go";
import { IoMdAddCircle } from "react-icons/io";
import { MdMoreVert } from "react-icons/md";
import Header from "../components/Header";
import Icon from "../components/Icon";
import NoteEditor from "../components/note/editor/NoteEditor";

const EditNoteScreen = ({ className }) => {
  const routerHistory = useHistory();
  const { noteId } = useParams();
  const note = useSelector((state) => state.notes[noteId]);

  React.useEffect(() => {
    if (!note) {
      console.error(`note ${noteId} not found`);
      routerHistory.replace("/404");
    }
  }, []);

  if (!note) {
    return <div></div>;
  }

  return (
    <div className={className}>
      <Header backButton>
        <FlexSpace></FlexSpace>

        <AddLabelsIcon
          Component={GoPencil}
          variant="button"
          size={28}
          onClick={() => routerHistory.push(`/note/${noteId}/labels`)}
        ></AddLabelsIcon>
      </Header>

      <StyledNoteEditor id={noteId}></StyledNoteEditor>

      <Footer>
        <AddContentIcon
          Component={IoMdAddCircle}
          variant="button"
          size={28}
        ></AddContentIcon>

        <EditedTimestamp>Edited Oct 17</EditedTimestamp>

        <MenuIcon Component={MdMoreVert} variant="button" size={28}></MenuIcon>
      </Footer>
    </div>
  );
};

const FlexSpace = styled.div`
  flex: 1;
`;

const AddLabelsIcon = styled(Icon)`
  margin: 5px;
  margin-left: 10px;
  margin-right: 10px;
`;

const StyledNoteEditor = styled(NoteEditor)`
  overflow-y: auto;
  flex: 1;
  margin-top: -10px;
`;

const Footer = styled.div`
  height: 55px;
  z-index: 1;
  background-color: ${(props) => props.theme.surfaceColor};
  display: flex;
  align-items: center;
`;

const AddContentIcon = styled(Icon)`
  margin: 5px;
  margin-left: 10px;
  margin-right: 10px;
`;

const EditedTimestamp = styled.span`
  color: ${(props) => props.theme.onSurfaceColor};
  flex: 1;
  text-align: center;
`;

const MenuIcon = styled(Icon)`
  margin: 5px;
  margin-left: 10px;
  margin-right: 10px;
`;

export default styled(EditNoteScreen)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100%;
`;
