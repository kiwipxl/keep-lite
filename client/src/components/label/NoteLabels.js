import React from "react";
import styled from "styled-components";
import NoteLabel from "./NoteLabel";

const NoteLabels = ({ className, labels }) => {
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
  left: -6px;
  margin-left: 6px;
  margin-right: 6px;
  margin-top: 2px;
  margin-bottom: 2px;
`;

export default styled(NoteLabels)`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`;
