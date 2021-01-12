import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import "draft-js/dist/Draft.css";
import Editor from "@draft-js-plugins/editor";
import { setNoteTitle } from "../../../redux/actions/notes";

const NoteTitleEditor = (props) => {
  const { className, id, forwardedRef } = props;
  const dispatch = useDispatch();

  function onChange(editorState) {
    props.onChange(editorState);

    const lastChangeType = editorState.getLastChangeType();
    if (!lastChangeType) {
      return;
    }

    dispatch(setNoteTitle(id, editorState.getCurrentContent()));
  }

  return (
    <div className={className}>
      <Editor
        ref={forwardedRef}
        placeholder="Title"
        plugins={[]}
        {...props}
        onChange={onChange}
      ></Editor>
    </div>
  );
};

export default styled(NoteTitleEditor)``;
