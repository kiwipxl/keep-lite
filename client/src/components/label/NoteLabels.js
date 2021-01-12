import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import NoteLabel from "./NoteLabel";

const NoteLabels = ({ className, labels }) => {
  const allLabels = useSelector((state) => state.labels);

  const renderedLabels = labels
    ? labels.filter((labelId) => labelId in allLabels)
    : [];

  return (
    <div className={className}>
      {renderedLabels.map((labelId) => (
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
