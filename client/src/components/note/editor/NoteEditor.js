import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { EditorState } from "draft-js";
import NoteTitleEditor from "./NoteTitleEditor";
import NoteBodyEditor from "./NoteBodyEditor";
import NoteLabels from "../../label/NoteLabels";

const NoteEditor = ({ className, id, children }) => {
  const note = useSelector((state) => state.notes[id]);

  const titleRef = React.createRef();
  const [titleEditorState, setTitleEditorState] = React.useState(() =>
    EditorState.createWithContent(note.title)
  );

  const bodyRef = React.createRef();
  const [bodyEditorState, setBodyEditorState] = React.useState(() =>
    EditorState.createWithContent(note.body)
  );

  React.useEffect(() => {
    if (bodyRef.current) {
      // If our note hasn't been edited yet, let's focus on it.
      // This is useful when creating a new note and immediately focusing automatically.
      if (bodyEditorState.getCurrentContent().getPlainText().length === 0) {
        bodyRef.current.focus();
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
          id={id}
          editorState={titleEditorState}
          onChange={setTitleEditorState}
          forwardedRef={titleRef}
        ></StyledTitleEditor>

        <StyledBodyEditor
          id={id}
          editorState={bodyEditorState}
          onChange={setBodyEditorState}
          forwardedRef={bodyRef}
        ></StyledBodyEditor>

        <StyledNoteLabels labels={note.labels}></StyledNoteLabels>
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
  margin-bottom: 10px;
  opacity: ${(props) => props.theme.highEmphasisOpacity};
`;

const StyledBodyEditor = styled(NoteBodyEditor)`
  font-size: 14px;
  opacity: ${(props) => props.theme.highEmphasisOpacity};
`;

const StyledNoteLabels = styled(NoteLabels)`
  margin-top: 10px;
`;

export default styled(NoteEditor)`
  color: ${(props) => props.theme.onSurfaceColor};
  background-color: ${(props) => props.theme.backgroundColor};
`;
