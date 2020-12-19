import styled from "styled-components";
import { MdLabelOutline } from "react-icons/md";
import Icon from "./Icon";

const SidebarItemLabel = ({ className, name }) => {
  return (
    <div className={className}>
      <Icon Component={MdLabelOutline} size={30}></Icon>
      <Label>{name}</Label>
    </div>
  );
};

const Label = styled.span`
  margin-left: 10px;
  opacity: ${(props) => props.theme.highEmphasisOpacity};
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
