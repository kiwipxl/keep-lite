import React from "react";
import styled from "styled-components";
import "draft-js/dist/Draft.css";
import Editor from "draft-js-plugins-editor";

const NoteTitleEditor = ({ className, editorState, setEditorState }) => {
  const editor = React.useRef(null);

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
