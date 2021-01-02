import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { BsFileRichtext } from "react-icons/bs";
import { IoMdAddCircle } from "react-icons/io";
import { MdMoreVert } from "react-icons/md";
import Header from "../components/Header";
import Icon from "../components/Icon";
import NoteEditor from "../components/note/editor/NoteEditor";
import RichTextEditor from "../components/note/editor/RichTextEditor";
import App from "../App";

const EditNoteScreen = ({ className, notes }) => {
  const [richTextEnabled, setRichTextEnabled] = React.useState(false);
  const routerHistory = useHistory();
  const { nid } = useParams();
  const note = useSelector((state) => state.notes[nid]);

  React.useEffect(() => {
    if (!note) {
      console.error(`note ${nid} not found`);
      routerHistory.replace("/404");
    }
  }, []);

  if (!note) {
    return <div></div>;
  }

  function toggleRichText() {
    setRichTextEnabled(!richTextEnabled);
  }

  return (
    <div className={className}>
      <Header>
        <BackIcon
          Component={BiArrowBack}
          variant="button"
          size={28}
          onClick={() => routerHistory.goBack()}
        ></BackIcon>

        <FlexSpace></FlexSpace>

        <RichTextIcon
          Component={BsFileRichtext}
          variant="button"
          size={28}
          onClick={toggleRichText}
          preventMouseDown
        ></RichTextIcon>

        <AddLabelsIcon
          Component={BsFileRichtext}
          variant="button"
          size={28}
          onClick={() => routerHistory.push(`/note/${nid}/labels`)}
        ></AddLabelsIcon>
      </Header>

      <NoteEditorContainer>
        <StyledNoteEditor
          nid={nid}
          richTextEnabled={richTextEnabled}
          RichTextEditor={StyledRichTextEditor}
        >
          {(title, body) => (
            <StyledRichTextEditor
              editorState={body.editorState}
              setEditorState={body.setEditorState}
              enabled={richTextEnabled}
            ></StyledRichTextEditor>
          )}
        </StyledNoteEditor>
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

const AddLabelsIcon = styled(Icon)`
  margin: 5px;
  margin-left: 10px;
  margin-right: 10px;
`;

const NoteEditorContainer = styled.div`
  flex: 1;
`;

const StyledNoteEditor = styled(NoteEditor)`
  position: relative;
  top: ${(props) => (props.richTextEnabled ? Header.height : 0)}px;
  transition: top 0.4s, height 0.4s;
  height: ${(props) =>
    600 - (Header.height + 55) - (props.richTextEnabled ? Header.height : 0)}px;
  overflow-y: auto;
`;

const StyledRichTextEditor = styled(RichTextEditor)`
  position: fixed;
  top: ${(props) => (props.enabled ? Header.height + 10 : 0)}px;
  transition: top 0.4s;
  width: 350px;
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
