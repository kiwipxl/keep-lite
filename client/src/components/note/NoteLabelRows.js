import React from "react";
import styled from "styled-components";
import NoteLabel from "./NoteLabel";

const NoteLabelRows = ({ className, labels }) => {
  return (
    <div className={className}>
      {labels &&
        labels.map((labelId) => (
          <StyledLabel key={labelId} id={labelId}></StyledLabel>
        ))}
    </div>
  );
};

const StyledLabel = styled(NoteLabel)`
  position: relative;
  top: -2px;
  left: -3px;
  margin-left: 3px;
  margin-right: 3px;
  margin-top: 2px;
  margin-bottom: 2px;
`;

export default styled(NoteLabelRows)`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`;
