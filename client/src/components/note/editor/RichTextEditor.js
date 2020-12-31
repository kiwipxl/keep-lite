import React from "react";
import styled from "styled-components";
import ToggleButton from "../../input/ToggleButton";
import { RichUtils } from "draft-js";

const RichTextEditor = ({
  className,
  editorState,
  setEditorState,
  onClick,
}) => {
  function toggleInlineStyle(inlineStyle) {
    // Styles can be found at
    // https://github.com/facebook/draft-js/blob/master/src/model/immutable/DefaultDraftInlineStyle.js

    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));

    onClick();
  }

  const inlineStyles = editorState.getCurrentInlineStyle();

  return (
    <div className={className}>
      <ToggleButton
        variant="outline"
        onClick={() => toggleInlineStyle("BOLD")}
        toggled={inlineStyles.includes("BOLD")}
      >
        Bold
      </ToggleButton>

      <ToggleButton
        variant="outline"
        onClick={() => toggleInlineStyle("UNDERLINE")}
        toggled={inlineStyles.includes("UNDERLINE")}
      >
        Underline
      </ToggleButton>

      <ToggleButton
        variant="outline"
        onClick={() => toggleInlineStyle("STRIKE-THROUGH")}
        toggled={inlineStyles.includes("STRIKE-THROUGH")}
      >
        Strike-through
      </ToggleButton>

      <ToggleButton
        variant="outline"
        onClick={() => toggleInlineStyle("ITALIC")}
        toggled={inlineStyles.includes("ITALIC")}
      >
        Italic
      </ToggleButton>

      <ToggleButton
        variant="outline"
        onClick={() => toggleInlineStyle("CODE")}
        toggled={inlineStyles.includes("CODE")}
      >
        Code
      </ToggleButton>
    </div>
  );
};

export default styled(RichTextEditor)`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
