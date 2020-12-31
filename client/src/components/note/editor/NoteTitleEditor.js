import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { convertToRaw } from "draft-js";
import "draft-js/dist/Draft.css";
import Editor from "draft-js-plugins-editor";
import { setNoteTitle } from "../../../redux/actions";

const NoteTitleEditor = (props) => {
  const { className, nid, setNoteTitle } = props;
  const editor = React.useRef(null);

  function onChange(editorState) {
    props.onChange(editorState);

    setNoteTitle(nid, convertToRaw(editorState.getCurrentContent()));
  }

  return (
    <Editor
      className={className}
      ref={editor}
      placeholder="Title"
      {...props}
      onChange={onChange}
    ></Editor>
  );
};

export default styled(connect(null, { setNoteTitle })(NoteTitleEditor))``;
