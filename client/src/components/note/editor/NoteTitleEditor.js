import React from "react";
import styled from "styled-components";
import "draft-js/dist/Draft.css";
import Editor from "draft-js-plugins-editor";

const NoteTitleEditor = (props) => {
  const { className } = props;
  const editor = React.useRef(null);

  return (
    <Editor
      className={className}
      ref={editor}
      placeholder="Title"
      {...props}
    ></Editor>
  );
};

export default styled(NoteTitleEditor)``;
