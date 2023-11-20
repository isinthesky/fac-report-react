import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { addGroup, updateGroup, deleteGroup, setCurrentGroup } from '../../../features/reducers/unitGroupSlice';
import { RootStore } from '../../../store/congifureStore';

import { BaseButton, BaseColumn, BaseRow } from '../../../static/styledComps';
import { STRING_SETTING_GROUP_ADD, STRING_SETTING_GROUP_DELETE, STRING_SETTING_GROUP_UPDATE } from '../../../static/consts';


const UnitGroupListControl: React.FC = () => {
  const dispatch = useDispatch();
  const unitGroups = useSelector((state: RootStore) => state.unitGroupReducer);
  const [editMode, setEditMode] = useState<{ [key: string]: boolean }>({});
  const [editedNames, setEditedNames] = useState<{ [key: string]: string }>({});

  console.log("unitGroups", unitGroups)

  const toggleEdit = (key: string) => {
    setEditMode(prev => ({ ...prev, [key]: !prev[key] }));
    if (editMode[key]) {
      // Save the changes
      const updatedGroup = { ...unitGroups.groups[key], name: editedNames[key] || unitGroups.groups[key].name };
      dispatch(updateGroup({ key, group: updatedGroup }));
    }
  };


  const handleGroupNameClick = (key: string) => {
    dispatch(setCurrentGroup(key));
  };


  const handleNameChange = (key: string, name: string) => {
    setEditedNames(prev => ({ ...prev, [key]: name }));
  };


  const handleAdd = (key: string) => {
    // dispatch(addGroup(key, unitGroups.currentGroup));
  };

  const handleUpdate = (key: string) => {
    // dispatch(updateGroup(key, unitGroups.currentGroup));
  };

  const handleDelete = (key: string) => {
    dispatch(deleteGroup(key));
  };

  const renderEmptyRows = () => {
    const emptyRows = [];
    for (let i = 0; i < 10; i++) {
      emptyRows.push(
        <BaseRow key={i}>
          <span>Group {i + 1}</span>
        </BaseRow>
      );
    }
    return emptyRows;
  };

  return (
    <Container>
           <BaseColumn>
        {Object.keys(unitGroups.groups).length > 0
          ? Object.entries(unitGroups.groups).map(([key, group]) => (
              <BaseRow key={key}>
                <GroupKey>{key}</GroupKey>
                <GroupName 
                  type="text" 
                  disabled={!editMode[key]}
                  defaultValue={group.name}
                  onChange={(e) => handleNameChange(key, e.target.value)}
                  onClick={() => handleGroupNameClick(key)}
                 />
                 <button onClick={() => toggleEdit(key)}>
                  {editMode[key] ? 'save' : 'edit'}
                </button>
              </BaseRow>
            ))
          : renderEmptyRows()
        }
      </BaseColumn>
      <ButtonsContainer>
        <CenterButton onClick={() => handleAdd("0")}>
          {STRING_SETTING_GROUP_ADD}</CenterButton>
        <CenterButton onClick={() => handleDelete("0")}>
          {STRING_SETTING_GROUP_DELETE}</CenterButton>
        <CenterButton onClick={() => handleUpdate("0")}>
          {STRING_SETTING_GROUP_UPDATE}</CenterButton>
      </ButtonsContainer>
    </Container>
  );
};

const Container = styled(BaseColumn)`
  margin-top: 50px;
  border: 1px solid #3f3;
`;

const ButtonsContainer = styled.div`
  align-items: end;
  justify-items: center;
  border: 1px solid #f33;
  height: 30px;
`;


const GroupKey = styled.div`
  width: 50px;
  height: 30px;
`;

const GroupName = styled.input`

  width: 85%;
  height: 30px;
  background-color: #b44054;
`;

const CenterButton = styled(BaseButton)`
  margin:auto;
`

export default UnitGroupListControl;