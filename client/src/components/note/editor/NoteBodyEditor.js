import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import "draft-js/dist/Draft.css";
import Editor from "draft-js-plugins-editor";
import createLinkifyPlugin from "draft-js-linkify-plugin";
import "draft-js-linkify-plugin/lib/plugin.css";
import { setNoteBody } from "../../../redux/actions";

const linkifyPlugin = createLinkifyPlugin();

const NoteBodyEditor = (props) => {
  const { className, nid, setNoteBody } = props;
  const editor = React.useRef(null);

  function onChange(editorState) {
    props.onChange(editorState);

    setNoteBody(nid, editorState.getCurrentContent());
  }

  return (
    <Editor
      className={className}
      ref={editor}
      placeholder="Note"
      plugins={[linkifyPlugin]}
      {...props}
      onChange={onChange}
    ></Editor>
  );
};

export default styled(connect(null, { setNoteBody })(NoteBodyEditor))``;
