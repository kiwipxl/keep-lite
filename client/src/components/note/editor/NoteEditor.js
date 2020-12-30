import React from "react";
import styled from "styled-components";
import { EditorState, ContentState } from "draft-js";
import NoteTitleEditor from "./NoteTitleEditor";
import NoteBodyEditor from "./NoteBodyEditor";
import NoteLabelRows from "../NoteLabelRows";

const NoteEditor = ({ className, title, body, labels, children }) => {
  const [titleEditorState, setTitleEditorState] = React.useState(() =>
    EditorState.createWithContent(ContentState.createFromText(title || ""))
  );

  const [bodyEditorState, setBodyEditorState] = React.useState(() =>
    EditorState.createWithContent(ContentState.createFromText(body || ""))
  );

  return (
    <div className={className}>
      <Content>
        {children &&
          children(
            {
              editorState: titleEditorState,
              setEditorState: setTitleEditorState,
            },
            {
              editorState: bodyEditorState,
              setEditorState: setBodyEditorState,
            }
          )}

        <StyledTitleEditor
          editorState={titleEditorState}
          setEditorState={setTitleEditorState}
        ></StyledTitleEditor>

        <StyledBodyEditor
          editorState={bodyEditorState}
          setEditorState={setBodyEditorState}
        ></StyledBodyEditor>

        <StyledNoteLabelRows labels={labels}></StyledNoteLabelRows>
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

const StyledNoteLabelRows = styled(NoteLabelRows)`
  margin-top: 10px;
`;

export default styled(NoteEditor)`
  color: ${(props) => props.theme.onSurfaceColor};
  background-color: ${(props) => props.theme.backgroundColor};
`;
