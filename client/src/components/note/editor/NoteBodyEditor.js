import React from "react";
import styled from "styled-components";
import "draft-js/dist/Draft.css";
import Editor from "draft-js-plugins-editor";
import createLinkifyPlugin from "draft-js-linkify-plugin";
import "draft-js-linkify-plugin/lib/plugin.css";

const linkifyPlugin = createLinkifyPlugin();

const NoteBodyEditor = ({ className, text, editorState, setEditorState }) => {
  const editor = React.useRef(null);

  return (
    <Editor
      className={className}
      ref={editor}
      editorState={editorState}
      onChange={setEditorState}
      placeholder="Note"
      plugins={[linkifyPlugin]}
    ></Editor>
  );
};

export default styled(NoteBodyEditor)``;
