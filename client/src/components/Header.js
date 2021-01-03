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
  margin-top: 0px;
  margin-bottom: 0px;
  display: flex;
  align-items: center;
  height: 100%;
`;

const ElevatedHeader = styled(BaseHeader)`
  position: relative;
  top: 10px;
  height: calc(100% - 20px);
  background-color: ${(props) =>
    props.theme.elevate02dp(props.theme.surfaceColor)};
  border-radius: 5px;
`;

const BackIcon = styled(Icon)`
  margin-left: 5px;
  margin-right: 10px;
`;

const Title = styled.div`
  font-size: 16px;
  flex: 1;
`;

Header.height = 60;

export default styled(Header)`
  width: 100%;
  height: 60px;
  position: relative;
  background-color: ${(props) => props.theme.surfaceColor};
  z-index: 5;
`;
