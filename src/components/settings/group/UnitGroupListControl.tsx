import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { addGroup, updateGroup, deleteGroup, setCurrentGroup, setSelectedGroup } from '../../../features/reducers/unitGroupSlice';
import { RootStore } from '../../../store/congifureStore';

import { BaseButton, BaseFlexColumn, BaseLabel, BaseFlexRow, MiniButton } from '../../../static/styledComps';
import { STRING_DEFAULT_EDIT, STRING_DEFAULT_SAVE, STRING_SETTING_GROUP_ADD, STRING_SETTING_GROUP_DELETE, STRING_SETTING_GROUP_UPDATE } from '../../../static/consts';
import { Unit, ViewModeProp } from '../../../static/types';


const UnitGroupListControl: React.FC<ViewModeProp> = ({viewMode}) => {
  const dispatch = useDispatch();
  const unitGroups = useSelector((state: RootStore) => state.unitGroupReducer);
  const [editMode, setEditMode] = useState<{ [key: string]: boolean }>({});
  const [editedNames, setEditedNames] = useState<{ [key: string]: string }>({});

  const toggleEdit = (index: number) => {
    setEditMode(prev => ({ ...prev, [index]: !prev[index] }));

    if (editMode[index]) {
      const updatedGroup = { ...unitGroups.groups[index], name: editedNames[index] || unitGroups.groups[index].name };
      dispatch(updateGroup({ index, group: updatedGroup }));
    }
  };

  const handleGroupNameClick = (position: number) => {
    console.log("handleGroupNameClick", position)
    dispatch(setSelectedGroup(position))
    dispatch(setCurrentGroup(position));
  };

  const handleNameChange = (position: number, name: string) => {
    console.log("handleNameChange", position)
    setEditedNames(prev => ({ ...prev, [position]: name }));
  };

  const handleAdd = () => {
    const newGroup = { name: "New Group", type: 1, id: 0, st: 0, div: 0, dvList: [] };
    dispatch(addGroup(newGroup));
  };

  const handleUpdate = (index: number) => {
    const updatedGroup = { ...unitGroups.groups[index], name: editedNames[index] || unitGroups.groups[index].name };
    dispatch(updateGroup({ index, group: updatedGroup }));
  };

  const handleDelete = (index: number) => {
    dispatch(deleteGroup(index));
  };

  const renderEmptyRows = () => {
    const emptyRows = [];
    for (let i = 0; i < 10; i++) {
      emptyRows.push(
        <BaseFlexRow key={i}>
          <span>Group {i + 1}</span>
        </BaseFlexRow>
      );
    }
    return emptyRows;
  };

  return (
    <Container>
      <ListContainer>
        {unitGroups.groups.length > 0
          ? unitGroups.groups.map((group:Unit, index:number) => (
              <BaseFlexRow key={index}  onDoubleClick={() => handleGroupNameClick(index)}>
                <GroupKey>{index + 1}</GroupKey>
                <GroupNameContainer>
                  <GroupName 
                      type="text" 
                      disabled={!editMode[index]}
                      defaultValue={group.name}
                      onChange={(e) => handleNameChange(index, e.target.value)}
                      mode={(index) === unitGroups.selectedPos ? "true" : "false"}
                    />
                    {!viewMode && (
                    <BaseButton onClick={(e) => {
                      e.stopPropagation(); // Prevents handleGroupNameClick when clicking the button
                      toggleEdit(index);
                    }}>
                      {editMode[index] ? STRING_DEFAULT_SAVE : STRING_DEFAULT_EDIT}
                    </BaseButton>
                  )}
                </GroupNameContainer>
              </BaseFlexRow>
            ))
          : renderEmptyRows()
        }
      </ListContainer>
      {!viewMode && (
      <ButtonsContainer>
        <CenterButton onClick={handleAdd}>
          {STRING_SETTING_GROUP_ADD}
        </CenterButton>
        <CenterButton onClick={() => handleDelete(unitGroups.groups.length - 1)}>
          {STRING_SETTING_GROUP_DELETE}
        </CenterButton>
        <CenterButton onClick={() => handleUpdate(unitGroups.groups.length - 1)}>
          {STRING_SETTING_GROUP_UPDATE}
        </CenterButton>
      </ButtonsContainer>
      )}
    </Container>
  );  
};

const Container = styled(BaseFlexColumn)`
  border: 1px solid #3f3;
`;
const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  
  align-items: center;
  justify-content: center;


  max-height: 600px; // Set the maximum height to 1000px
  overflow-y: auto; // Enable vertical scrolling
`;

const ButtonsContainer = styled(BaseFlexRow)`
  align-items: flex-end;
  justify-content: center;
  height: 30px;
  border: 1px solid #3df;
`;

const GroupNameContainer = styled.div`
  display: flex;
  align-items: center;
`;

const GroupKey = styled(MiniButton)`
  border: 0px solid #3f3;
`;

const GroupName = styled.input<{ mode: string }>`

  width: 85%;
  height: 30px;
  background-color: #b44054;

  background-color: ${(props) => (props.mode === "true" ? "#ff0080" : "white")};
`;

const CenterButton = styled(BaseButton)`
`

export default UnitGroupListControl;