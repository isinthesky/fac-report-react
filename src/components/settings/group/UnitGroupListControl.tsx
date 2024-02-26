import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { addGroup, updateGroup, deleteGroup, setCurrentGroup, setSelectedGroup } from '../../../features/reducers/unitGroupSlice';
import { RootStore } from '../../../store/congifureStore';

import { ActiveButton, BaseButton, BaseFlex1Column, BaseFlex1Div, BaseFlex1Row, BaseFlexDiv, BaseInput, CenterLabel, ControlButton, MiniButton } from '../../../static/componentSet';
import { ICON_DAY_CHECK, ICON_DAY_CLOSE, ICON_DAY_EDIT, ICON_DAY_UNDO, SIZESET_DEFAULT_INPUT_HEIGHT,  } from '../../../static/constSet';
  
import { STRING_DEFAULT_APPLY, STRING_SETTING_GROUP_ADD, STRING_SETTING_GROUP_DELETE, STRING_SETTING_GROUP_UPDATE } from '../../../static/langSet';
import { Unit, ViewModeProp } from '../../../static/types';
import { FONTSET_DEFAULT_INPUT_SIZE } from '../../../static/fontSet';
import { COLORSET_SIGNITURE_COLOR } from '../../../static/colorSet';
import { setCurrentUnit } from '../../../features/reducers/tabPageSlice';


const UnitGroupListControl: React.FC<ViewModeProp> = ({viewMode}) => {
  const dispatch = useDispatch();
  const unitGroupSlice = useSelector((state: RootStore) => state.unitGroupReducer);
  const tabPageSlice = useSelector((state: RootStore) => state.tabPageReducer);
  const [editMode, setEditMode] = useState<{ [key: string]: boolean }>({});
  const [editedNames, setEditedNames] = useState< string[] >(Array(unitGroupSlice.groups.length).fill('-'));

  const toggleEdit = (index: number) => {
    setEditMode(prev => ({ ...prev, [index]: !prev[index] }));

    if (editMode[index]) {
      const updatedGroup = { ...unitGroupSlice.groups[index], name: editedNames[index] || unitGroupSlice.groups[index].name };
      console.log("updatedGroup", updatedGroup);
      dispatch(updateGroup({ index, group: updatedGroup }));
    }
  };

  const editCancel = (index: number) => {
    setEditMode(prev => ({ ...prev, [index]: !prev[index] }));
  
    if (editMode[index]) {
      const arrName = unitGroupSlice.groups.map((obj, pos) => {
        return obj.name;
      });

      setEditedNames(arrName);
    }
  };

  useEffect(() => {
    const arrName = unitGroupSlice.groups.map((obj, pos) => {
      return obj.name;
    })

    setEditedNames(arrName)

  }, [unitGroupSlice]);

  const handleGroupNameClick = (position: number) => {
    dispatch(setSelectedGroup(position))
    dispatch(setCurrentGroup(position));
  };

  const handleNameChange = (position: number, name: string) => {
    const res = [...editedNames]
    res[position] = name

    setEditedNames(res);
  };

  const handleAdd = () => {
    const newGroup = { name: "New Group", type: 1, id: 0, st: 0, div: 0, dvList: Array(9).fill(0) };
    dispatch(addGroup(newGroup));
  };

  const handleUpdate = (index: number) => {
    const { name, ...otherProps } = unitGroupSlice.currentGroup;
    const updatedGroup = { name:editedNames[index] , ...otherProps };

    dispatch(updateGroup({ index, group: updatedGroup }));
  };

  const handleDelete = (index: number) => {
    dispatch(deleteGroup(index));
  };

  const handleApply = (index: number) => {
    if (viewMode) {
      const currentTabUnit = {...tabPageSlice.currentTabPage.unitList[tabPageSlice.unitPosition.index]};
      currentTabUnit.dvList = unitGroupSlice.currentGroup.dvList;

      dispatch(setCurrentUnit({position:tabPageSlice.unitPosition.index, unit: currentTabUnit}));
    }
  };

  const renderEmptyRows = () => {
    const emptyRows = [];
    for (let i = 0; i < 10; i++) {
      emptyRows.push(
        <BaseFlex1Row key={i}>
          <span>Group {i + 1}</span>
        </BaseFlex1Row>
      );
    }
    return emptyRows;
  };

  return (
    <Container>
      <ListContainer>
        {unitGroupSlice.groups.length > 0
          ? unitGroupSlice.groups.map((group:Unit, index:number) => (
            <BaseFlex1Row key={index}  onDoubleClick={() => handleGroupNameClick(index)}>
              <NumberLabelDiv>{index + 1}</NumberLabelDiv>
              <GroupNameContainer>
                <GroupName 
                  type="text" 
                  disabled={!editMode[index]}
                  value={editedNames[index]}
                  onChange={(e) => handleNameChange(index, e.target.value)}
                  mode={(index) === unitGroupSlice.selectedPos ? "true" : "false"}
                />
                {!viewMode && (
                   editMode[index] ? 
                    (
                      <EditButtonsContainer>
                        <ControlButton onClick={(e) => {
                            e.stopPropagation();
                            toggleEdit(index); 
                          }}>
                          {<img src={ICON_DAY_CHECK} alt="Check" />}
                        </ControlButton>
                        <ControlButton onClick={(e) => {
                            e.stopPropagation();
                            editCancel(index);
                          }}>
                          {<img src={ICON_DAY_UNDO} alt="Undo" />}
                        </ControlButton>
                      </EditButtonsContainer>
                    ):(
                      <EditButtonsContainer>
                        <ControlButton onClick={(e) => {
                            e.stopPropagation();
                            toggleEdit(index);
                          }}>
                          {<img src={ICON_DAY_EDIT} alt="Edit" />}
                        </ControlButton>
                      </EditButtonsContainer>
                    )
                )}
              </GroupNameContainer>
            </BaseFlex1Row>
          ))
        : renderEmptyRows()
      }
      </ListContainer>
      {!viewMode ? (
      <ButtonsContainer>
        <BaseButton onClick={handleAdd}>
          {STRING_SETTING_GROUP_ADD}
        </BaseButton>
        <BaseButton onClick={() => handleDelete(unitGroupSlice.selectedPos)}>
          {STRING_SETTING_GROUP_DELETE}
        </BaseButton>
        <ActiveButton onClick={() => handleUpdate(unitGroupSlice.selectedPos)}>
          {STRING_SETTING_GROUP_UPDATE}
        </ActiveButton>
      </ButtonsContainer>
      ): <ButtonsContainer>
        <ActiveButton onClick={() => handleApply(unitGroupSlice.selectedPos)}>
          {STRING_DEFAULT_APPLY}
        </ActiveButton>
      </ButtonsContainer>}
    </Container>
  );  
};

const Container = styled(BaseFlexDiv)`
  flex-direction: column;
  width: 300px;

  gap: 20px;
  border: 1px solid #3f3;
`;


const ListContainer = styled(BaseFlex1Column)`
  display: flex;
  flex-direction: column;
  
  align-items: center;
  justify-content: center;

  margin-top: auto;

  max-height: 500px; // Set the maximum height to 1000px
  overflow-y: auto; // Enable vertical scrolling
`;

const ButtonsContainer = styled(BaseFlexDiv)`
  align-items: flex-end;
  justify-content: center;

  margin-top: auto;
  height: 30px;

`;


const EditButtonsContainer = styled(BaseFlexDiv)`
  align-items: flex-end;
  justify-content: start;
  
  width: 80px;
`;


const NumberLabelDiv = styled(BaseFlexDiv)`
  align-items: center;
  justify-content: center;

  width:30px;
`;

const GroupNameContainer = styled(BaseFlex1Div)`
  align-items: center;
`;

const GroupName = styled.input<{ mode: string, heightsize?: string, fontsize?: string }>`
  display: flex;

  width: 85%;
  height: ${(props) => props.heightsize || SIZESET_DEFAULT_INPUT_HEIGHT};

  padding: 1px;

  color: ${(props) => (props.mode === "true" ? "white" : "black")};
  font-size: ${(props) => props.fontsize || FONTSET_DEFAULT_INPUT_SIZE};
  
  background-color: ${(props) => (props.mode === "true" ? COLORSET_SIGNITURE_COLOR : "white")};
`;


export default UnitGroupListControl;