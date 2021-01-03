import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const NoteLabel = ({ className, id }) => {
  const labels = useSelector((state) => state.labels);

  return (
    <div className={className}>
      <Text>{id in labels ? labels[id].name : "null"}</Text>
    </div>
  );
};

const Text = styled.span`
  margin: 6px;
  margin-top: 3px;
  margin-bottom: 3px;
  font-size: 13px;
  opacity: ${(props) => props.theme.mediumEmphasisOpacity};
  display: flex;
  justify-content: center;
`;

export default styled(NoteLabel)`
  color: ${(props) => props.theme.onSurfaceColor};
  background-color: ${(props) => props.theme.surfaceColor};
  border-color: ${(props) => props.theme.borderColor00dp};
  border-style: solid;
  border-width: 1px;
  border-radius: 10px;
`;
