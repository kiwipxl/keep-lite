import styled from "styled-components";
import { useHistory } from "react-router-dom";
import NoteLabel from "./NoteLabel";

const Note = ({ className, id, title, body, labels, onClick }) => {
  const routerHistory = useHistory();

  let onClickOverride = onClick;
  if (!onClick) {
    onClickOverride = () => {
      routerHistory.push("/note/1");
    };
  }

  return (
    <div className={className} onClick={onClickOverride}>
      <Content>
        <Title>{title}</Title>

        <Body>{body}</Body>

        <LabelsGrid>
          {labels &&
            labels.map((labelId) => (
              <NoteLabel key={labelId} id={labelId}></NoteLabel>
            ))}
        </LabelsGrid>
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
`;

const LabelsGrid = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
`;

export default styled(Note)`
  width: 100%;
  height: 100%;
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
