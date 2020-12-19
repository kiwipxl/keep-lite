import styled from "styled-components";
import Sidebar from "./Sidebar";
import SidebarItem from "./SidebarItem";
import SidebarItemLabel from "./SidebarItemLabel";
import Button from "./Button";

const MainSidebar = ({ className, hidden }) => {
  return (
    <Sidebar className={className} hidden={hidden}>
      <SidebarItem>
        <Logo>Keep Lite</Logo>
      </SidebarItem>

      <SidebarItem>
        <SidebarItemLabelHeader>
          <span>Labels</span>
          <Button variant="outline">Edit</Button>
        </SidebarItemLabelHeader>
      </SidebarItem>

      <SidebarItem clickable>
        <SidebarItemLabel name="Art"></SidebarItemLabel>
      </SidebarItem>

      <SidebarItem clickable>
        <SidebarItemLabel name="Science"></SidebarItemLabel>
      </SidebarItem>

      <SidebarItem clickable>
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
