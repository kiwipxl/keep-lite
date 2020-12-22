import React from "react";
import styled from "styled-components";
import { MdAccountCircle, MdMenu } from "react-icons/md";
import Header from "../components/Header";
import Icon from "../components/Icon";
import NoteView from "../components/note/NoteView";

const EditNoteScreen = ({ className }) => {
  return (
    <div className={className}>
      <Header>
        <BackIcon Component={MdMenu} variant="button" size={28}></BackIcon>
      </Header>

      <StyledNoteView></StyledNoteView>
    </div>
  );
};

const BackIcon = styled(Icon)`
  margin: 5px;
  margin-left: 10px;
  margin-right: 10px;
`;

const StyledNoteView = styled(NoteView)``;

export default styled(EditNoteScreen)``;
