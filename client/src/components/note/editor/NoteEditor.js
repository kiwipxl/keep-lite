import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { EditorState } from "draft-js";
import NoteTitleEditor from "./NoteTitleEditor";
import NoteBodyEditor from "./NoteBodyEditor";
import NoteLabelRows from "../NoteLabelRows";

const NoteEditor = ({ className, nid, children }) => {
  const note = useSelector((state) => state.notes[nid]);

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
      bodyRef.current.focus();
    }
  }, []);

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
          forwardedRef={titleRef}
        ></StyledTitleEditor>

        <StyledBodyEditor
          nid={nid}
          editorState={bodyEditorState}
          onChange={setBodyEditorState}
          forwardedRef={bodyRef}
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
  margin-bottom: 10px;
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
