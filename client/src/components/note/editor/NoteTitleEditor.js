import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import "draft-js/dist/Draft.css";
import Editor from "draft-js-plugins-editor";
import { setNoteTitle } from "../../../redux/actions";

const NoteTitleEditor = React.forwardRef((props, ref) => {
  const { className, nid } = props;
  const dispatch = useDispatch();

  function onChange(editorState) {
    props.onChange(editorState);

    dispatch(setNoteTitle(nid, editorState.getCurrentContent()));
  }

  return (
    <Editor
      className={className}
      placeholder="Title"
      {...props}
      ref={ref}
      onChange={onChange}
    ></Editor>
  );
});

export default styled(NoteTitleEditor)``;
