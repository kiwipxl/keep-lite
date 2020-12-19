import styled from "styled-components";
import chroma from "chroma-js";

const SidebarItem = ({ className, children }) => {
  return <div className={className}>{children}</div>;
};

export default styled(SidebarItem)`
  width: 100%;

  &:hover {
    background-color: ${(props) =>
      props.clickable
        ? chroma(props.theme.backgroundColor).brighten().hex()
        : "transparent"};
  }
`;
