import React from "react";
import styled from "styled-components";
import NoteTitleEditor from "./NoteTitleEditor";
import NoteBodyEditor from "./NoteBodyEditor";
import NoteLabel from "../NoteLabel";
import RichTextEditor from "./RichTextEditor";
import { EditorState, ContentState } from "draft-js";

const NoteEditor = ({ className, title, body }) => {
  const [titleEditorState, setTitleEditorState] = React.useState(() =>
    EditorState.createWithContent(ContentState.createFromText(title || ""))
  );

  const [bodyEditorState, setBodyEditorState] = React.useState(() =>
    EditorState.createWithContent(ContentState.createFromText(body || ""))
  );

  return (
    <div className={className}>
      <Content>
        <StyledRichTextEditor
          editorState={bodyEditorState}
          setEditorState={setBodyEditorState}
        ></StyledRichTextEditor>

        <StyledTitleEditor
          editorState={titleEditorState}
          setEditorState={setTitleEditorState}
        ></StyledTitleEditor>

        <StyledBodyEditor
          editorState={bodyEditorState}
          setEditorState={setBodyEditorState}
        ></StyledBodyEditor>

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

const StyledRichTextEditor = styled(RichTextEditor)`
  margin-bottom: 15px;
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
