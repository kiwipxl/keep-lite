import styled from "styled-components";
import Sidebar from "./Sidebar";
import SidebarItem from "./SidebarItem";
import SidebarItemLabel from "./SidebarItemLabel";
import Button from "./Button";

const MainSidebar = () => {
  return (
    <Sidebar>
      <SidebarItem>
        <Logo>Keep Lite</Logo>
      </SidebarItem>

      <SidebarItem>
        <SidebarItemLabelHeader>
          <span>Labels</span>
          <Button>Edit</Button>
        </SidebarItemLabelHeader>
      </SidebarItem>

      <SidebarItem>
        <SidebarItemLabel name="Art"></SidebarItemLabel>
      </SidebarItem>

      <SidebarItem>
        <SidebarItemLabel name="Science"></SidebarItemLabel>
      </SidebarItem>

      <SidebarItem>
        <SidebarItemLabel name="Philosophy"></SidebarItemLabel>
      </SidebarItem>
    </Sidebar>
  );
};

const Logo = styled.div`
  font-weight: bold;
  font-size: 2em;
  margin: 10px;
`;

const SidebarItemLabelHeader = styled(SidebarItem)`
  margin: 10px;
  width: calc(100% - 20px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
`;

export default MainSidebar;
