import styled from "styled-components";
import Icon from "./Icon";

const SidebarItemLabel = ({ className, name }) => {
  return (
    <div className={className}>
      <LabelIcon></LabelIcon>
      <Label>{name}</Label>
    </div>
  );
};

const Label = styled.span`
  margin-left: 10px;
`;

const LabelIcon = styled(Icon)`
  width: 40px;
  height: 40px;
`;

export default styled(SidebarItemLabel)`
  width: calc(100% - 20px);

  margin-left: 10px;
  margin-right: 10px;
  margin-top: 5px;
  margin-bottom: 5px;

  display: flex;
  align-items: center;
`;
