import styled from "styled-components";
import NoteLabel from "./NoteLabel";

const Note = ({ className }) => {
  return (
    <div className={className}>
      <Content>
        <Title>Actionable steps in TMI stages</Title>

        <Body>
          - Gratitude
          <br />
          - Compassion
          <br />
          - Self-love
          <br />
          - Mindfulness
          <br />
          - Non-judgement
          <br />
          - Expanded awareness
          <br />
          - Stable attention
          <br />
          - Forgiveness
          <br />
        </Body>

        <LabelsGrid>
          <NoteLabel name="Meditation/TMI"></NoteLabel>
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
`;
