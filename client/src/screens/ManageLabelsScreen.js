import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import Icon from "../components/Icon";
import List from "../components/nav/List";
import ListRow from "../components/nav/ListRow";
import { addNoteLabel, removeNoteLabel } from "../redux/actions";
import EditableLabel from "../components/label/EditableLabel";
import CreateLabelListRow from "../components/label/CreateLabelListRow";

const ManageLabelsScreen = ({ className }) => {
  const labels = useSelector((state) => state.labels);

  return (
    <div className={className}>
      <Header backButton title="Edit Labels"></Header>

      <List>
        <CreateLabelListRow></CreateLabelListRow>

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

const StyledEditableLabel = styled(EditableLabel)`
  width: calc(100% - 20px);

  margin-left: 10px;
  margin-right: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export default styled(ManageLabelsScreen)``;
