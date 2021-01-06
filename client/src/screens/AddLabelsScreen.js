import React from "react";
import styled from "styled-components";
import { MdLabelOutline } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Icon from "../components/Icon";
import Input from "../components/input/Input";
import Checkbox from "../components/input/Checkbox";
import List from "../components/nav/List";
import ListRow from "../components/nav/ListRow";
import CreateLabelListRow from "../components/label/CreateLabelListRow";
import { addNoteLabel, removeNoteLabel } from "../redux/actions/notes";

const AddLabelsScreen = ({ className }) => {
  const [searchText, setSearchText] = React.useState("");
  const dispatch = useDispatch();
  const { nid } = useParams();
  const note = useSelector((state) => state.notes[nid]);
  const labels = useSelector((state) => state.labels);
  // Array of label ids. If label is is in array, then it is 'checked'.
  const [checkedLabels, setCheckedLabels] = React.useState(
    useSelector((state) =>
      Object.keys(state.labels).filter((lid) => note.labels.includes(lid))
    )
  );

  function toggleCheckedLabel(lid) {
    const checked = !checkedLabels.includes(lid);

    if (checked) {
      // Label is now checked
      setCheckedLabels([lid].concat(checkedLabels));

      dispatch(addNoteLabel(nid, lid));
    } else {
      // Label is now un-checked
      checkedLabels.splice(checkedLabels.indexOf(lid), 1);
      setCheckedLabels(checkedLabels);

      dispatch(removeNoteLabel(nid, lid));
    }
  }

  // Select labels based on search results
  const filteredLabels = Object.keys(labels).filter((lid) => {
    const label = labels[lid];

    if (searchText.length > 0) {
      // Nothing complicated, just a simple check to see if text exists in the name
      if (label.name.toLowerCase().indexOf(searchText.toLowerCase()) === -1) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className={className}>
      <Header backButton>
        <SearchInput
          placeholder="Search labels..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        ></SearchInput>
      </Header>

      <CreateLabelListRow></CreateLabelListRow>

      <List>
        {filteredLabels.map((lid) => {
          const label = labels[lid];

          return (
            <ListRow
              key={lid}
              clickable
              onClick={() => toggleCheckedLabel(lid)}
            >
              <LabelRowContent>
                <LabelIcon Component={MdLabelOutline} size={22}></LabelIcon>

                <Label>{label.name}</Label>

                <StyledCheckbox
                  checked={checkedLabels.includes(lid)}
                  onClick={() => toggleCheckedLabel(lid)}
                ></StyledCheckbox>
              </LabelRowContent>
            </ListRow>
          );
        })}
      </List>
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

const Label = styled.span`
  margin-left: 10px;
  flex: 1;
  opacity: ${(props) => props.theme.highEmphasisOpacity};
`;

const StyledCheckbox = styled(Checkbox)`
  flex: 0.2;
`;

export default styled(AddLabelsScreen)``;
