import styled from "styled-components";

const Header = ({ className, children, variant }) => {
  return (
    <div className={className}>
      {variant === "elevated" && <ElevatedHeader>{children}</ElevatedHeader>}
      {variant !== "elevated" && <BaseHeader>{children}</BaseHeader>}
    </div>
  );
};

const BaseHeader = styled.div`
  margin: 10px;
  display: flex;
  align-items: center;
`;

const ElevatedHeader = styled.div`
  margin: 10px;
  background-color: ${(props) =>
    props.theme.elevate02dp(props.theme.surfaceColor)};
  border-radius: 5px;

  display: flex;
  align-items: center;
`;

Header.height = 40;

export default styled(Header)`
  width: 100%;
  height: 40px;
  position: relative;
  background-color: ${(props) => props.theme.backgroundColor};
  z-index: 5;
`;
