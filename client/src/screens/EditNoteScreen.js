import React from "react";
import styled from "styled-components";
import { MdMenu } from "react-icons/md";
import { BsFileRichtext } from "react-icons/bs";
import Header from "../components/Header";
import Icon from "../components/Icon";
import NoteEditor from "../components/note/NoteEditor";

const EditNoteScreen = ({ className }) => {
  return (
    <div className={className}>
      <Header>
        <BackIcon Component={MdMenu} variant="button" size={28}></BackIcon>

        <HeaderSpace></HeaderSpace>

        <RichTextIcon
          Component={BsFileRichtext}
          variant="button"
          size={28}
        ></RichTextIcon>
      </Header>

      <StyledNoteEditor title="Actionable steps in TMI stages"></StyledNoteEditor>
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

const StyledNoteEditor = styled(NoteEditor)``;

export default styled(EditNoteScreen)``;
