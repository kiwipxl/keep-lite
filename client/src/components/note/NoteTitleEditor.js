import React from "react";
import styled from "styled-components";
import { EditorState, ContentState } from "draft-js";
import "draft-js/dist/Draft.css";
import Editor from "draft-js-plugins-editor";

const NoteTitleEditor = ({ className, text }) => {
  const editor = React.useRef(null);

  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createWithContent(ContentState.createFromText(text || ""))
  );

  return (
    <Editor
      className={className}
      ref={editor}
      editorState={editorState}
      onChange={setEditorState}
      placeholder="Title"
    ></Editor>
  );
};

export default styled(NoteTitleEditor)`
  font-size: 21px;
  opacity: ${(props) => props.theme.highEmphasisOpacity};
`;
