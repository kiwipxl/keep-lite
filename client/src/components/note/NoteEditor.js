import React from "react";
import styled from "styled-components";
import NoteTitleEditor from "./NoteTitleEditor";
import NoteBodyEditor from "./NoteBodyEditor";
import NoteLabel from "./NoteLabel";

const NoteEditor = ({ className, title, body }) => {
  const titleEditor = React.useRef(null);

  const bodyEditor = React.useRef(null);

  // React.useEffect(() => bodyEditor.current.focus(), []);

  return (
    <div className={className}>
      <Content>
        <StyledTitleEditor ref={titleEditor} text={title}></StyledTitleEditor>

        <StyledBodyEditor ref={bodyEditor} text={body}></StyledBodyEditor>

        <LabelsGrid>
          <NoteLabel name="Meditation/TMI"></NoteLabel>
        </LabelsGrid>
      </Content>
    </div>
  );
};

const Content = styled.div`
  padding: 20px;
  padding-top: 10px;
`;

const StyledTitleEditor = styled(NoteTitleEditor)`
  font-size: 21px;
  margin-top: -5px;
  margin-bottom: -5px;
  opacity: ${(props) => props.theme.highEmphasisOpacity};
`;

const StyledBodyEditor = styled(NoteBodyEditor)`
  font-size: 14px;
  opacity: ${(props) => props.theme.highEmphasisOpacity};
`;

const LabelsGrid = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
`;

export default styled(NoteEditor)`
  width: 100%;
  height: 100%;
  color: ${(props) => props.theme.onSurfaceColor};
  background-color: ${(props) => props.theme.backgroundColor};
`;
