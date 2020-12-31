import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import "draft-js/dist/Draft.css";
import Editor from "draft-js-plugins-editor";
import { setNoteTitle } from "../../../redux/actions";

const NoteTitleEditor = (props) => {
  const { className, nid, forwardedRef } = props;
  const dispatch = useDispatch();

  function onChange(editorState) {
    props.onChange(editorState);

    dispatch(setNoteTitle(nid, editorState.getCurrentContent()));
  }

  return (
    <Editor
      className={className}
      ref={forwardedRef}
      placeholder="Title"
      {...props}
      onChange={onChange}
    ></Editor>
  );
};

export default styled(NoteTitleEditor)``;
