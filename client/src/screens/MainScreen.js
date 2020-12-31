import React from "react";
import styled from "styled-components";
import { MdAccountCircle, MdMenu } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import NoteCardGrid from "../components/note/NoteCardGrid";
import Header from "../components/Header";
import Icon from "../components/Icon";
import Button from "../components/input/Button";
import Input from "../components/input/Input";
import MainSidebar from "../components/nav/MainSidebar";
import { addNote } from "../redux/actions";

const MainScreen = ({ className }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const routerHistory = useHistory();
  const notes = useSelector((state) => state.notes);
  const dispatch = useDispatch();
  const inpRef = React.createRef();

  function openSidebar() {
    setSidebarOpen(true);
  }

  function closeSidebar() {
    setSidebarOpen(false);
  }

  function addEmptyNote() {
    const note = dispatch(addNote()).payload;
    routerHistory.push(`/note/${note.id}`);
  }

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

      <StyledNoteCardGrid
        width={380}
        notes={Object.keys(notes).map((nid) => ({
          id: nid,
          ...notes[nid],
        }))}
      ></StyledNoteCardGrid>

      <AddNoteButton variant="fill" onClick={addEmptyNote}>
        Add Note
      </AddNoteButton>
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
