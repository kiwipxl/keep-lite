import styled from "styled-components";

const HeaderBar = ({ className, children }) => {
  return <div className={className}>{children}</div>;
};

export default styled(HeaderBar)`
  width: calc(100% - 20px);
  height: calc(100% - 20px);
  margin: 10px;
  background-color: rgb(40, 220, 80);
  border-radius: 5px;

  display: flex;
  align-items: center;
`;
