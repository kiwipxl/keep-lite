import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { GoPencil } from "react-icons/go";
import { FiTrash2 } from "react-icons/fi";
import { BsCheck } from "react-icons/bs";
import { MdLabelOutline } from "react-icons/md";
import Icon from "../Icon";
import Input from "../input/Input";
import { deleteLabel, renameLabel } from "../../redux/actions/labels";

const EditableLabel = ({ className, id }) => {
  const [editing, setEditing] = React.useState(false);
  const dispatch = useDispatch();
  const label = useSelector((state) => state.labels[id]);
  const [name, setName] = React.useState(label.name);

  if (editing) {
    return (
      <div className={className}>
        <StyledIcon
          Component={FiTrash2}
          size={22}
          variant="button"
          onClick={() => {
            dispatch(deleteLabel(id));
          }}
        ></StyledIcon>

        <LabelInput
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></LabelInput>

        <StyledIcon
          variant="button"
          Component={BsCheck}
          size={22}
          onClick={() => {
            dispatch(renameLabel(id, name));
            setEditing(false);
          }}
        ></StyledIcon>
      </div>
    );
  } else {
    return (
      <div className={className}>
        <StyledIcon Component={MdLabelOutline} size={22}></StyledIcon>

        <Label>{label.name}</Label>

        <StyledIcon
          variant="button"
          Component={GoPencil}
          size={22}
          onClick={() => setEditing(true)}
        ></StyledIcon>
      </div>
    );
  }
};

const StyledIcon = styled(Icon)`
  flex: 0.1;
`;

const Label = styled.span`
  margin-left: 10px;
  flex: 1;
  font-size: 15px;
  opacity: ${(props) => props.theme.highEmphasisOpacity};
`;

const LabelInput = styled(Input)`
  margin-left: 10px;
  flex: 1;
  font-size: 15px;
  opacity: ${(props) => props.theme.highEmphasisOpacity};
`;

export default styled(EditableLabel)`
  display: flex;
  align-items: center;
`;
