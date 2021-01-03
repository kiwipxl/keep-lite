import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { GoPencil } from "react-icons/go";
import { MdLabelOutline } from "react-icons/md";
import Icon from "../Icon";
import Input from "../input/Input";
import ListRow from "../nav/ListRow";
import { removeLabel, renameLabel } from "../../redux/actions";

const EditableLabel = ({ className, id }) => {
  const label = useSelector((state) => state.labels[id]);

  return (
    <div className={className}>
      <LabelIcon Component={MdLabelOutline} size={22}></LabelIcon>

      <Label>{label.name}</Label>

      <EditIcon variant="button" Component={GoPencil} size={22}></EditIcon>
    </div>
  );
};

const SearchInput = styled(Input)`
  height: 100%;
  font-size: 14px;
  flex: 1;
`;

const LabelRowContent = styled.div`
  width: calc(100% - 20px);

  margin-left: 10px;
  margin-right: 10px;
  margin-top: 10px;
  margin-bottom: 10px;

  display: flex;
  align-items: center;
`;

const LabelIcon = styled(Icon)`
  flex: 0.1;
`;

const EditIcon = styled(Icon)`
  flex: 0.1;
`;

const Label = styled.span`
  margin-left: 10px;
  flex: 1;
  opacity: ${(props) => props.theme.highEmphasisOpacity};
`;

export default styled(EditableLabel)`
  display: flex;
  align-items: center;
`;
