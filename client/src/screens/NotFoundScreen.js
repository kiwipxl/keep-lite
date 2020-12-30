import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import Header from "../components/Header";
import Icon from "../components/Icon";

const NotFoundScreen = ({ className }) => {
  const routerHistory = useHistory();

  return (
    <div className={className}>
      <Header>
        <BackIcon
          Component={BiArrowBack}
          variant="button"
          size={28}
          onClick={() => routerHistory.goBack()}
        ></BackIcon>

        <FlexSpace></FlexSpace>
      </Header>

      <NotFound>404 Not found</NotFound>
    </div>
  );
};

const BackIcon = styled(Icon)`
  margin: 5px;
  margin-left: 10px;
  margin-right: 10px;
`;

const FlexSpace = styled.div`
  flex: 1;
`;

const NotFound = styled.p`
  padding: 20px;
  font-size: 1.5em;
`;

export default styled(NotFoundScreen)``;
