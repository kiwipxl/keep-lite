import React from "react";
import styled from "styled-components";
import Button from "../../input/Button";
import { RichUtils } from "draft-js";

const RichTextEditor = ({ className, editorState, setEditorState }) => {
  function toggleInlineStyle(inlineStyle) {
    // Styles can be found at
    // https://github.com/facebook/draft-js/blob/master/src/model/immutable/DefaultDraftInlineStyle.js

    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));

    console.log(inlineStyle);
  }

  return (
    <div className={className}>
      <Button variant="outline" onClick={() => toggleInlineStyle("BOLD")}>
        Bold
      </Button>
      <Button variant="outline" onClick={() => toggleInlineStyle("UNDERLINE")}>
        Underline
      </Button>
      <Button
        variant="outline"
        onClick={() => toggleInlineStyle("STRIKE-THROUGH")}
      >
        Strike-through
      </Button>
      <Button variant="outline" onClick={() => toggleInlineStyle("ITALIC")}>
        Italic
      </Button>
      <Button variant="outline" onClick={() => toggleInlineStyle("CODE")}>
        Code
      </Button>
    </div>
  );
};

export default styled(RichTextEditor)`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
