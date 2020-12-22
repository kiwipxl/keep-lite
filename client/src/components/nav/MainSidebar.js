import React from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import SidebarItem from "./SidebarItem";
import SidebarItemLabel from "./SidebarItemLabel";
import Button from "../input/Button";

const MainSidebar = ({ className, hidden, onOpen, onClose }) => {
  return (
    <Sidebar
      className={className}
      hidden={hidden}
      onOpen={onOpen}
      onClose={onClose}
    >
      <SidebarItem>
        <Logo onClick={onClose}>Keep Lite</Logo>
      </SidebarItem>

      <SidebarItemLabelHeader>
        <Header>Labels</Header>
        <Button variant="outline">Edit</Button>
      </SidebarItemLabelHeader>

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
  opacity: ${(props) => props.theme.highEmphasisOpacity};
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`;

const SidebarItemLabelHeader = styled(SidebarItem)`
  margin: 10px;
  width: calc(100% - 20px);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Header = styled.span`
  opacity: ${(props) => props.theme.mediumEmphasisOpacity};
`;

export default MainSidebar;
