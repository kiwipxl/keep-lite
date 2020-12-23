import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { BsFileRichtext } from "react-icons/bs";
import { IoMdAddCircle } from "react-icons/io";
import { MdMoreVert } from "react-icons/md";
import Header from "../components/Header";
import Icon from "../components/Icon";
import NoteEditor from "../components/note/editor/NoteEditor";

const EditNoteScreen = ({ className }) => {
  const [richTextEnabled, setRichTextEnabled] = React.useState(false);

  const routerHistory = useHistory();

  function toggleRichText() {
    setRichTextEnabled(!richTextEnabled);
  }

  function onClickBack() {
    routerHistory.goBack();
  }

  return (
    <div className={className}>
      <Header>
        <BackIcon
          Component={BiArrowBack}
          variant="button"
          size={28}
          onClick={onClickBack}
        ></BackIcon>

        <FlexSpace></FlexSpace>

        <RichTextIcon
          Component={BsFileRichtext}
          variant="button"
          size={28}
          onClick={toggleRichText}
        ></RichTextIcon>
      </Header>

      <NoteEditorContainer>
        <StyledNoteEditor
          title="Actionable steps in TMI stages"
          richTextEnabled={richTextEnabled}
        ></StyledNoteEditor>
      </NoteEditorContainer>

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

const BackIcon = styled(Icon)`
  margin: 5px;
  margin-left: 10px;
  margin-right: 10px;
`;

const FlexSpace = styled.div`
  flex: 1;
`;

const RichTextIcon = styled(Icon)`
  margin: 5px;
  margin-left: 10px;
  margin-right: 10px;
`;

const NoteEditorContainer = styled.div`
  flex: 1;
  background-color: blue;
`;

const StyledNoteEditor = styled(NoteEditor)`
  position: relative;
  top: ${(props) => (props.richTextEnabled ? 0 : -40)}px;
  transition: top 0.4s;
  height: calc(100% + 40px);
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
