import styled from "styled-components";
import NotesGrid from "../components/NotesGrid";
import Note from "../components/Note";
import HeaderBar from "../components/HeaderBar";
import Icon from "../components/Icon";
import Button from "../components/Button";
import Input from "../components/Input";

const MainScreen = ({ className }) => {
  return (
    <div className={className}>
      <MainHeaderBar>
        <SidebarIcon type="sidebar"></SidebarIcon>
        <SearchInput placeholder="Search your notes"></SearchInput>
        <AccountIcon type="account"></AccountIcon>
      </MainHeaderBar>

      <MainNotesGrid>
        <Note />
        <Note />
        <Note />
      </MainNotesGrid>

      <AddNoteButton></AddNoteButton>
    </div>
  );
};

const SidebarIcon = styled(Icon)`
  width: 40px;
  height: 40px;
`;

const AccountIcon = styled(Icon)`
  width: 40px;
  height: 40px;
`;

const SearchInput = styled(Input)`
  height: 100%;
  font-size: 20px;
  flex: 1;
`;

const AddNoteButton = styled(Button)`
  position: absolute;
  left: calc(100% - 60px - 20px);
  bottom: 20px;

  width: 60px;
  height: 60px;
  background-color: grey;
`;

const MainHeaderBar = styled(HeaderBar)`
  height: 40px;
`;

const MainNotesGrid = styled(NotesGrid)``;

export default styled(MainScreen)``;
