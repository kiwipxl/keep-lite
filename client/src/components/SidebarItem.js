import styled from "styled-components";

const SidebarItem = ({ className, children }) => {
  return <div className={className}>{children}</div>;
};

export default styled(SidebarItem)`
  width: 100%;
`;
