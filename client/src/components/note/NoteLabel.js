import React from "react";
import styled from "styled-components";
import App from "../../App";

const NoteLabel = ({ className, id }) => {
  const labels = React.useContext(App.LabelsContext);

  console.log(labels);

  return (
    <div className={className}>
      <Text>{id in labels ? labels[id].name : "null"}</Text>
    </div>
  );
};

const Text = styled.span`
  margin: 5px;
  margin-top: 2px;
  margin-bottom: 2px;
  font-size: 12px;
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
