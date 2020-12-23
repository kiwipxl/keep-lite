import React from "react";
import styled from "styled-components";
import { MdAccountCircle, MdMenu } from "react-icons/md";
import NoteCardGrid from "../components/note/NoteCardGrid";
import NoteCard from "../components/note/NoteCard";
import Header from "../components/Header";
import Icon from "../components/Icon";
import Button from "../components/input/Button";
import Input from "../components/input/Input";
import MainSidebar from "../components/nav/MainSidebar";
import sample_notes from "../sample_notes.json";

const MainScreen = ({ className, notes, setNotes }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  function openSidebar() {
    setSidebarOpen(true);
  }

  function closeSidebar() {
    setSidebarOpen(false);
  }

  React.useEffect(() => {
    setNotes(sample_notes);
  }, []);

  return (
    <div className={className}>
      <MainSidebar
        hidden={!sidebarOpen}
        onOpen={() => openSidebar()}
        onClose={() => closeSidebar()}
      ></MainSidebar>

      <Header variant="elevated">
        <SidebarIcon
          Component={MdMenu}
          variant="button"
          size={28}
          onClick={() => openSidebar()}
        ></SidebarIcon>

        <SearchInput placeholder="Search your notes"></SearchInput>

        <AccountIcon
          Component={MdAccountCircle}
          variant="button"
          size={30}
        ></AccountIcon>
      </Header>

      <StyledNoteCardGrid width={380} notes={notes}></StyledNoteCardGrid>

      <AddNoteButton variant="fill">Add Note</AddNoteButton>
    </div>
  );
};

const SidebarIcon = styled(Icon)`
  margin: 5px;
  margin-left: 10px;
  margin-right: 10px;
`;

const AccountIcon = styled(Icon)`
  margin: 5px;
`;

const SearchInput = styled(Input)`
  height: 100%;
  font-size: 14px;
  flex: 1;
`;

const AddNoteButton = styled(Button)`
  position: absolute;
  left: calc(100% - 60px - 20px);
  bottom: 20px;

  width: 60px;
  height: 60px;
`;

const StyledNoteCardGrid = styled(NoteCardGrid)`
  padding: 10px;
`;

export default styled(MainScreen)``;
