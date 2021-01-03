import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import Icon from "../components/Icon";
import List from "../components/nav/List";
import ListRow from "../components/nav/ListRow";
import { addNoteLabel, removeNoteLabel } from "../redux/actions";
import EditableLabel from "../components/label/EditableLabel";
import CreateLabel from "../components/label/CreateLabel";

const ManageLabelsScreen = ({ className }) => {
  const labels = useSelector((state) => state.labels);

  return (
    <div className={className}>
      <Header backButton title="Edit Labels"></Header>

      <List>
        <CreateLabelListRow>
          <StyledCreateLabel></StyledCreateLabel>
        </CreateLabelListRow>

        {Object.keys(labels).map((lid) => {
          const label = labels[lid];

          return (
            <ListRow key={lid}>
              <StyledEditableLabel id={lid}></StyledEditableLabel>
            </ListRow>
          );
        })}
      </List>
    </div>
  );
};

const CreateLabelListRow = styled(ListRow)`
  border-width: 1px;
  border-color: ${(props) => props.theme.elevate02dp(props.theme.surfaceColor)};
  border-style: solid;
`;

const StyledCreateLabel = styled(CreateLabel)`
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const StyledEditableLabel = styled(EditableLabel)`
  width: calc(100% - 20px);

  margin-left: 10px;
  margin-right: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export default styled(ManageLabelsScreen)``;
