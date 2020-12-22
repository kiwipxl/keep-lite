import styled from "styled-components";
import NoteLabel from "./NoteLabel";

const NoteView = ({ className }) => {
  return (
    <div className={className}>
      <Content>
        <Title
          contentEditable
          suppressContentEditableWarning
          onChange={() => console.log("change")}
        >
          Actionable steps in TMI stages
        </Title>

        <Body
          contentEditable
          suppressContentEditableWarning
          onKeyDown={(key) => false}
        >
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
  padding: 20px;
  padding-top: 10px;
`;

const Title = styled.p`
  font-size: 21px;
  margin-top: -5px;
  margin-bottom: -5px;
  opacity: ${(props) => props.theme.highEmphasisOpacity};
`;

const Body = styled.p`
  font-size: 14px;
  opacity: ${(props) => props.theme.highEmphasisOpacity};
`;

const LabelsGrid = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
`;

export default styled(NoteView)`
  width: 100%;
  height: 100%;
  color: ${(props) => props.theme.onSurfaceColor};
  background-color: ${(props) => props.theme.backgroundColor};
`;
