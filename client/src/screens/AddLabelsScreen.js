import React from "react";
import styled from "styled-components";
import { BiArrowBack } from "react-icons/bi";
import { MdLabelOutline } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Header from "../components/Header";
import Icon from "../components/Icon";
import Button from "../components/input/Button";
import Input from "../components/input/Input";
import List from "../components/nav/List";
import ListRow from "../components/nav/ListRow";

const AddLabelsScreen = ({ className }) => {
  const routerHistory = useHistory();
  const dispatch = useDispatch();
  const [labels, setLabels] = React.useState(
    useSelector((state) => state.labels)
  );

  function onClickBack() {
    routerHistory.goBack();
  }

  return (
    <div className={className}>
      <Header>
        <BackIcon
          Component={BiArrowBack}
          variant="button"
          size={28}
          onClick={onClickBack}
        ></BackIcon>

        <SearchInput placeholder="Search labels..."></SearchInput>
      </Header>

      <List>
        {Object.keys(labels).map((lid) => (
          <ListRow clickable>
            <LabelRowContent>
              <LabelIcon Component={MdLabelOutline} size={22}></LabelIcon>
              <Label>{labels[lid].name}</Label>
            </LabelRowContent>
          </ListRow>
        ))}
      </List>
    </div>
  );
};

const BackIcon = styled(Icon)`
  margin: 5px;
  margin-left: 10px;
  margin-right: 10px;
`;

const SearchInput = styled(Input)`
  height: 100%;
  font-size: 14px;
  flex: 1;
`;

const LabelRowContent = styled.div`
  width: calc(100% - 20px);

  margin-left: 10px;
  margin-right: 10px;
  margin-top: 10px;
  margin-bottom: 10px;

  display: flex;
  align-items: center;
`;

const LabelIcon = styled(Icon)`
  flex: 0.1;
`;

const Label = styled.span`
  margin-left: 10px;
  flex: 1;
  opacity: ${(props) => props.theme.highEmphasisOpacity};
`;

export default styled(AddLabelsScreen)``;
