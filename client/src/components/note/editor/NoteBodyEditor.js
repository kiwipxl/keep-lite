import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import "draft-js/dist/Draft.css";
import Editor from "@draft-js-plugins/editor";
import createLinkifyPlugin from "@draft-js-plugins/linkify";
import createInlineToolbarPlugin from "@draft-js-plugins/inline-toolbar";
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
} from "@draft-js-plugins/buttons";
import "@draft-js-plugins/linkify/lib/plugin.css";
import "@draft-js-plugins/inline-toolbar/lib/plugin.css";
import { setNoteBody } from "../../../redux/actions";

const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;
const plugins = [createLinkifyPlugin(), inlineToolbarPlugin];

const NoteBodyEditor = (props) => {
  const { className, nid, forwardedRef } = props;
  const dispatch = useDispatch();

  function onChange(editorState) {
    props.onChange(editorState);

    dispatch(setNoteBody(nid, editorState.getCurrentContent()));
  }

  return (
    <div className={className}>
      <Editor
        ref={forwardedRef}
        placeholder="Note"
        plugins={plugins}
        {...props}
        onChange={onChange}
      ></Editor>

      <InlineToolbar>
        {
          // may be use React.Fragment instead of div to improve perfomance after React 16
          (externalProps) => (
            <div>
              <BoldButton {...externalProps} />
              <ItalicButton {...externalProps} />
              <UnderlineButton {...externalProps} />
            </div>
          )
        }
      </InlineToolbar>
    </div>
  );
};

export default styled(NoteBodyEditor)``;
