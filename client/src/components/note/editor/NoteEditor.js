import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { EditorState, ContentState } from "draft-js";
import NoteTitleEditor from "./NoteTitleEditor";
import NoteBodyEditor from "./NoteBodyEditor";
import NoteLabelRows from "../NoteLabelRows";

const NoteEditor = ({ className, nid, note, children }) => {
  const [titleEditorState, setTitleEditorState] = React.useState(() =>
    EditorState.createWithContent(ContentState.createFromText(note.title || ""))
  );

  const [bodyEditorState, setBodyEditorState] = React.useState(() =>
    EditorState.createWithContent(ContentState.createFromText(note.body || ""))
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
          nid={nid}
          editorState={titleEditorState}
          onChange={setTitleEditorState}
        ></StyledTitleEditor>

        <StyledBodyEditor
          nid={nid}
          editorState={bodyEditorState}
          onChange={setBodyEditorState}
        ></StyledBodyEditor>

        <StyledNoteLabelRows labels={note.labels}></StyledNoteLabelRows>
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

const mapState = (state, ownProps) => ({
  note: state.notes[ownProps.nid],
});

export default styled(connect(mapState, null)(NoteEditor))`
  color: ${(props) => props.theme.onSurfaceColor};
  background-color: ${(props) => props.theme.backgroundColor};
`;
