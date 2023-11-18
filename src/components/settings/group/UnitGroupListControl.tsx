import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { addGroup, updateGroup, deleteGroup } from '../../../features/reducers/unitGroupSlice';
import { RootStore } from '../../../store/congifureStore';

import { BaseButton, BaseColumn, BaseRow } from '../../../static/styledComps';


const UnitGroupListControl: React.FC = () => {
  const dispatch = useDispatch();
  const unitGroups = useSelector((state: RootStore) => state.unitGroupReducer);

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
                <GroupName>{`${key}`}</GroupName><GroupItem>{`Group ${key}`}</GroupItem>
              </BaseRow>
            ))
          : renderEmptyRows()
        }
      </BaseColumn>
      <ButtonsContainer>
        <CenterButton onClick={() => handleAdd("0")}>Add</CenterButton>
        <CenterButton onClick={() => handleDelete("0")}>Delete</CenterButton>
        <CenterButton onClick={() => handleUpdate("0")}>Update</CenterButton>
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


const GroupName = styled.div`
  width: 30px;
  height: 30px;
`;

const GroupItem = styled.div`
  width: 85%;
  height: 30px;
  background-color: #b44054;
`;

const CenterButton = styled(BaseButton)`
  margin:auto;
`

export default UnitGroupListControl;