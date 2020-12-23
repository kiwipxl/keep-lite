import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import clampjs from "clamp-js";
import NoteLabelRows from "./NoteLabelRows";

const Note = ({ className, id, title, body, labels, onClick }) => {
  const titleRef = React.useRef(null);
  const bodyRef = React.useRef(null);

  const routerHistory = useHistory();

  let onClickOverride = onClick;
  if (!onClick) {
    onClickOverride = () => {
      routerHistory.push("/note/1");
    };
  }

  React.useEffect(() => {
    clampjs(titleRef.current, { clamp: 2 });
    clampjs(bodyRef.current, { clamp: 5 });
  }, []);

  return (
    <div className={className} onClick={onClickOverride}>
      <Content>
        <Title ref={titleRef}>{title}</Title>

        <Body ref={bodyRef}>{body}</Body>

        <StyledNoteLabelRows labels={labels}></StyledNoteLabelRows>
      </Content>
    </div>
  );
};

const Content = styled.div`
  margin: 15px;
`;

const Title = styled.p`
  margin: 0px;
  margin-top: -5px;
  margin-bottom: 5px;
  font-size: 15px;
  opacity: ${(props) => props.theme.highEmphasisOpacity};
`;

const Body = styled.p`
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
