import React from "react";
import styled from "styled-components";
import { MdLabelOutline } from "react-icons/md";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import List from "./List";
import ListRow from "./ListRow";
import Button from "../input/Button";
import Icon from "../Icon";

const MainSidebar = ({ className, hidden, onOpen, onClose }) => {
  const labels = useSelector((state) => state.labels);

  return (
    <Sidebar
      className={className}
      hidden={hidden}
      onOpen={onOpen}
      onClose={onClose}
    >
      <List>
        <ListRow>
          <Logo onClick={onClose}>Keep Lite</Logo>
        </ListRow>

        <LabelHeaderRow>
          <Header>Labels</Header>
          <Button variant="outline">Edit</Button>
        </LabelHeaderRow>

        {Object.keys(labels).map((lid) => (
          <ListRow clickable>
            <LabelRowContent>
              <Icon Component={MdLabelOutline} size={30}></Icon>
              <Label>{labels[lid].name}</Label>
            </LabelRowContent>
          </ListRow>
        ))}
      </List>
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

const LabelHeaderRow = styled(ListRow)`
  margin: 10px;
  width: calc(100% - 20px);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LabelRowContent = styled.div`
  width: calc(100% - 20px);

  margin-left: 10px;
  margin-right: 10px;
  margin-top: 5px;
  margin-bottom: 5px;

  display: flex;
  align-items: center;
`;

const Label = styled.span`
  margin-left: 10px;
  opacity: ${(props) => props.theme.highEmphasisOpacity};
`;

const Header = styled.span`
  opacity: ${(props) => props.theme.mediumEmphasisOpacity};
`;

export default MainSidebar;
