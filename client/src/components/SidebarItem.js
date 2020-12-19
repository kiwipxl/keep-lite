import styled from "styled-components";
import chroma from "chroma-js";

const SidebarItem = ({ className, children, clickable, onClick }) => {
  let StyledItem = clickable ? ClickableSidebarItem : BaseSidebarItem;

  return (
    <StyledItem className={className} onClick={onClick}>
      {children}
    </StyledItem>
  );
};

const BaseSidebarItem = styled.div`
  width: 100%;
`;

const ClickableSidebarItem = styled(BaseSidebarItem)`
  transition: background-color 0.1s;

  &:hover {
    background-color: ${(props) =>
      chroma(props.theme.backgroundColor).brighten().hex()};
    cursor: pointer;
  }
`;

export default SidebarItem;
