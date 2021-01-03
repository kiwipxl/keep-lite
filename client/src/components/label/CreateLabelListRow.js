import React from "react";
import styled from "styled-components";
import ListRow from "../nav/ListRow";
import CreateLabel from "./CreateLabel";

const CreateLabelListRow = ({ className }) => {
  const [selected, setSelected] = React.useState(false);

  return (
    <StyledListRow selected={selected}>
      <StyledCreateLabel
        onSelectChange={(selected) => setSelected(selected)}
      ></StyledCreateLabel>
    </StyledListRow>
  );
};

const StyledListRow = styled(ListRow)`
  border-width: 1px;
  border-color: ${(props) =>
    props.selected
      ? props.theme.primaryColor
      : props.theme.elevate02dp(props.theme.surfaceColor)};
  border-style: solid;
`;

const StyledCreateLabel = styled(CreateLabel)`
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export default CreateLabelListRow;
