import { BiArrowBack } from "react-icons/bi";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Icon from "./Icon";

const Header = ({ className, children, variant, backButton, title }) => {
  const routerHistory = useHistory();

  const StyledHeader = variant === "elevated" ? ElevatedHeader : BaseHeader;

  return (
    <div className={className}>
      <StyledHeader>
        {backButton && (
          <BackIcon
            Component={BiArrowBack}
            variant="button"
            size={28}
            onClick={() => routerHistory.goBack()}
          ></BackIcon>
        )}

        {title && <Title>{title}</Title>}

        {children}
      </StyledHeader>
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

const BackIcon = styled(Icon)`
  margin: 5px;
  margin-left: 10px;
  margin-right: 10px;
`;

const Title = styled.div`
  height: 100%;
  font-size: 16px;
  flex: 1;
`;

Header.height = 40;

export default styled(Header)`
  width: 100%;
  height: 40px;
  position: relative;
  background-color: ${(props) => props.theme.backgroundColor};
  z-index: 5;
`;
