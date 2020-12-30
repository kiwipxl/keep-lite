import React from "react";
import styled from "styled-components";
import "draft-js/dist/Draft.css";
import Editor from "draft-js-plugins-editor";
import createLinkifyPlugin from "draft-js-linkify-plugin";
import "draft-js-linkify-plugin/lib/plugin.css";

const linkifyPlugin = createLinkifyPlugin();

const NoteBodyEditor = (props) => {
  const { className } = props;
  const editor = React.useRef(null);

  return (
    <Editor
      className={className}
      ref={editor}
      placeholder="Note"
      plugins={[linkifyPlugin]}
      {...props}
    ></Editor>
  );
};

export default styled(NoteBodyEditor)``;
