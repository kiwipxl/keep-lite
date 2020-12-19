import React from "react";
import styled from "styled-components";
import { MdAccountCircle, MdMenu } from "react-icons/md";
import NotesGrid from "../components/NotesGrid";
import Note from "../components/Note";
import HeaderBar from "../components/HeaderBar";
import Icon from "../components/Icon";
import Button from "../components/Button";
import Input from "../components/Input";
import MainSidebar from "../components/MainSidebar";

const MainScreen = ({ className }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  function openSidebar() {
    setSidebarOpen(true);
  }

  function closeSidebar() {
    setSidebarOpen(false);
  }

  return (
    <div className={className}>
      <MainSidebar
        hidden={!sidebarOpen}
        onOpen={() => openSidebar()}
        onClose={() => closeSidebar()}
      ></MainSidebar>

      <MainHeaderBar>
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
      </MainHeaderBar>

      <MainNotesGrid>
        <Note />
        <Note />
        <Note />
      </MainNotesGrid>

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

const MainHeaderBar = styled(HeaderBar)`
  height: 40px;
`;

const MainNotesGrid = styled(NotesGrid)``;

export default styled(MainScreen)``;
