import React from "react";
import styled from "styled-components";
import { MdMenu } from "react-icons/md";
import { BsFileRichtext } from "react-icons/bs";
import Header from "../components/Header";
import Icon from "../components/Icon";
import NoteEditor from "../components/note/editor/NoteEditor";

const EditNoteScreen = ({ className }) => {
  const [richTextEnabled, setRichTextEnabled] = React.useState(false);

  function toggleRichText() {
    setRichTextEnabled(!richTextEnabled);
  }

  return (
    <div className={className}>
      <Header>
        <BackIcon Component={MdMenu} variant="button" size={28}></BackIcon>

        <HeaderSpace></HeaderSpace>

        <RichTextIcon
          Component={BsFileRichtext}
          variant="button"
          size={28}
          onClick={toggleRichText}
        ></RichTextIcon>
      </Header>

      <StyledNoteEditor
        title="Actionable steps in TMI stages"
        richTextEnabled={richTextEnabled}
      ></StyledNoteEditor>
    </div>
  );
};

const BackIcon = styled(Icon)`
  margin: 5px;
  margin-left: 10px;
  margin-right: 10px;
`;

const HeaderSpace = styled.div`
  flex: 1;
`;

const RichTextIcon = styled(Icon)`
  margin: 5px;
  margin-left: 10px;
  margin-right: 10px;
`;

const StyledNoteEditor = styled(NoteEditor)`
  position: relative;
  top: ${(props) => (props.richTextEnabled ? 0 : -40)}px;
  transition: top 0.4s;
`;

export default styled(EditNoteScreen)``;
