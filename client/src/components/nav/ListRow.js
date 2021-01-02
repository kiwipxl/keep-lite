import styled from "styled-components";
import chroma from "chroma-js";

const ListRow = ({ className, children, clickable, onClick }) => {
  let StyledItem = clickable ? ClickableListRow : BaseListRow;

  return (
    <StyledItem className={className} onClick={onClick}>
      {children}
    </StyledItem>
  );
};

const BaseListRow = styled.div`
  width: 100%;
`;

const ClickableListRow = styled(BaseListRow)`
  transition: background-color 0.1s;

  &:hover {
    background-color: ${(props) =>
      chroma(props.theme.backgroundColor).brighten().hex()};
    cursor: pointer;
  }
`;

export default ListRow;
