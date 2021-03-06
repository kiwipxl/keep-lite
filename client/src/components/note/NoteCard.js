import React from "react";
import styled from "styled-components";
import { convertToHTML } from "draft-convert";
import { useHistory } from "react-router-dom";
import NoteLabels from "../label/NoteLabels";

function draftToHTML(contentState) {
  return convertToHTML({
    blockToHTML: (block) => {
      return <div></div>;
    },
    entityToHTML: (entity, originalText) => {
      // TODO: add LINK support (need to add linkify plugin)
      // if (entity.type === "LINK") {
      //   return <span style={{ color: "blue" }}>{originalText}</span>;
      // }
      return originalText;
    },
  })(contentState);
}

function isContentEmpty(contentState) {
  return !/[^ \n]+/.test(contentState.getPlainText());
}

const Note = ({ className, id, title, body, labels, onClick }) => {
  const titleRef = React.useRef(null);
  const bodyRef = React.useRef(null);
  const routerHistory = useHistory();
  const [bodyHTML] = React.useState(draftToHTML(body));

  const titleText = title ? title.getPlainText() : "";
  const hasTitle = titleText.length > 0;
  const hasBody = !isContentEmpty(body);

  let onClickOverride = onClick;
  if (!onClick) {
    onClickOverride = () => {
      routerHistory.push(`/note/${id}`);
    };
  }

  return (
    <div className={className} onClick={onClickOverride}>
      <Content>
        {hasTitle && <Title ref={titleRef}>{titleText}</Title>}

        {hasBody && (
          <Body
            ref={bodyRef}
            dangerouslySetInnerHTML={{ __html: bodyHTML }}
          ></Body>
        )}

        {!hasTitle && !hasBody && <div></div>}

        <StyledNoteLabels labels={labels}></StyledNoteLabels>
      </Content>
    </div>
  );
};

const Content = styled.div`
  margin: 15px;
`;

const Title = styled.div`
  margin: 0px;
  margin-top: -5px;
  margin-bottom: 5px;
  font-size: 15px;
  opacity: ${(props) => props.theme.highEmphasisOpacity};
  max-height: 40px;
  overflow: hidden;
`;

const Body = styled.div`
  margin: 0px;
  font-size: 12px;
  opacity: ${(props) => props.theme.highEmphasisOpacity};
  max-height: 48px;
  overflow: hidden;
`;

const StyledNoteLabels = styled(NoteLabels)`
  margin-top: 10px;
  margin-bottom: -10px;
`;

export default styled(Note)`
  width: 100%;
  overflow: hidden;
  color: ${(props) => props.theme.onSurfaceColor};
  background-color: ${(props) => props.theme.surfaceColor};
  border-color: ${(props) => props.theme.borderColor00dp};
  border-style: solid;
  border-width: 1px;
  border-radius: 7px;

  &:hover {
    cursor: pointer;
  }
`;
