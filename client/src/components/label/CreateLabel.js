import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { AiOutlinePlus } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import { BsCheck } from "react-icons/bs";
import Icon from "../Icon";
import Input from "../input/Input";
import { createLabel } from "../../redux/actions";

const CreateLabel = ({ className, onSelectChange }) => {
  const inputRef = React.createRef();
  const [selected, setSelected] = React.useState(false);
  const dispatch = useDispatch();
  const [name, setName] = React.useState("");

  React.useEffect(() => {
    if (selected) {
      inputRef.current.focus();
    }
  }, [selected, inputRef]);

  function select() {
    setSelected(true);

    if (onSelectChange) {
      onSelectChange(true);
    }
  }

  function deselect() {
    setSelected(false);
    setName("");

    if (onSelectChange) {
      onSelectChange(false);
    }
  }

  if (selected) {
    return (
      <div className={className}>
        <StyledIcon
          Component={ImCross}
          size={22}
          variant="button"
          onClick={() => deselect()}
        ></StyledIcon>

        <StyledInput
          ref={inputRef}
          value={name}
          placeholder="Create new label"
          onChange={(e) => setName(e.target.value)}
        ></StyledInput>

        <StyledIcon
          variant="button"
          Component={BsCheck}
          size={22}
          onClick={() => {
            dispatch(createLabel(null, name));
            deselect();
          }}
        ></StyledIcon>
      </div>
    );
  } else {
    return (
      <div className={className} onClick={() => select()}>
        <StyledIcon
          Component={AiOutlinePlus}
          size={22}
          variant="button"
          onClick={() => select()}
        ></StyledIcon>

        <Text>Create new label</Text>
      </div>
    );
  }
};

const StyledIcon = styled(Icon)`
  flex: 0.1;
`;

const Text = styled.span`
  margin-left: 10px;
  flex: 1;
  font-size: 15px;
  opacity: ${(props) => props.theme.highEmphasisOpacity};
`;

const StyledInput = styled(Input)`
  margin-left: 10px;
  flex: 1;
  font-size: 15px;
  opacity: ${(props) => props.theme.highEmphasisOpacity};
`;

export default styled(CreateLabel)`
  display: flex;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;
