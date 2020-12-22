import React from "react";
import styled from "styled-components";
import { EditorState, ContentState } from "draft-js";
import "draft-js/dist/Draft.css";
import Editor from "draft-js-plugins-editor";
import createLinkifyPlugin from "draft-js-linkify-plugin";
import "draft-js-linkify-plugin/lib/plugin.css";

const linkifyPlugin = createLinkifyPlugin();

const NoteBodyEditor = ({ className, text }) => {
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
      placeholder="Write something!"
      plugins={[linkifyPlugin]}
    ></Editor>
  );
};

export default styled(NoteBodyEditor)`
  font-size: 14px;
  opacity: ${(props) => props.theme.highEmphasisOpacity};
`;
