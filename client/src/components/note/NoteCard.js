import React from "react";
import styled from "styled-components";
import { convertToHTML } from "draft-convert";
import { useHistory } from "react-router-dom";
import clampjs from "clamp-js";
import NoteLabelRows from "./NoteLabelRows";

function draftToHTML(contentState) {
  return convertToHTML({
    styleToHTML: (style) => {
      // if (style === 'BOLD') {
      //   return <span style={{color: 'blue'}} />;
      // }
    },
    blockToHTML: (block) => {
      return (
        <span
          style={{
            display: "block",
            height: "calc(1em + 5px)",
          }}
        />
      );
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

const Note = ({ className, id, title, body, labels, onClick }) => {
  const titleRef = React.useRef(null);
  const bodyRef = React.useRef(null);
  const routerHistory = useHistory();
  const [clampedContent, setClampedContent] = React.useState(false);

  let onClickOverride = onClick;
  if (!onClick) {
    onClickOverride = () => {
      routerHistory.push(`/note/${id}`);
    };
  }

  React.useEffect(() => {
    clampjs(titleRef.current, { clamp: 2 });
    clampjs(bodyRef.current, { clamp: 5 });

    setClampedContent(true);
  }, []);

  return (
    <div
      className={className}
      onClick={onClickOverride}
      hidden={!clampedContent}
    >
      <Content>
        <Title
          ref={titleRef}
          dangerouslySetInnerHTML={{ __html: draftToHTML(title) }}
        ></Title>

        <Body
          ref={bodyRef}
          dangerouslySetInnerHTML={{ __html: draftToHTML(body) }}
        ></Body>

        <StyledNoteLabelRows labels={labels}></StyledNoteLabelRows>
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
`;

const Body = styled.div`
  margin: 0px;
  font-size: 12px;
  opacity: ${(props) => props.theme.highEmphasisOpacity};
  overflow: hidden;
`;

const StyledNoteLabelRows = styled(NoteLabelRows)`
  margin-top: 10px;
  margin-bottom: -10px;
`;

export default styled(Note)`
  width: 100%;
  max-height: 200px;
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
