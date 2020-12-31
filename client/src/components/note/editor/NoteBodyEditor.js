import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import "draft-js/dist/Draft.css";
import Editor from "draft-js-plugins-editor";
import createLinkifyPlugin from "draft-js-linkify-plugin";
import "draft-js-linkify-plugin/lib/plugin.css";
import { setNoteBody } from "../../../redux/actions";

const linkifyPlugin = createLinkifyPlugin();

const NoteBodyEditor = React.forwardRef((props, ref) => {
  const { className, nid } = props;
  const dispatch = useDispatch();

  function onChange(editorState) {
    props.onChange(editorState);

    dispatch(setNoteBody(nid, editorState.getCurrentContent()));
  }

  return (
    <Editor
      className={className}
      placeholder="Note"
      plugins={[linkifyPlugin]}
      {...props}
      ref={ref}
      onChange={onChange}
    ></Editor>
  );
});

export default styled(NoteBodyEditor)``;
