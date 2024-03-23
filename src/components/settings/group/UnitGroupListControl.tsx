import React, {useEffect, useState, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { addGroup, updateGroup, updateFromCurrent, deleteGroup, setCurrentGroup, setSelectedGroup } from '../../../features/reducers/unitGroupSlice';
import { RootStore } from '../../../store/congifureStore';

import { ActiveButton, BaseButton, BaseFlex1Column, BaseFlex1Div, BaseFlex1Row, BaseFlexDiv, BaseInput, BigLabel, CenterLabel, ControlButton, MediumLabel, MiniButton, SmallLabel } from '../../../static/componentSet';
import { ICON_DAY_CHECK, ICON_DAY_CLOSE, ICON_DAY_EDIT, ICON_DAY_UNDO, SIZESET_DEFAULT_INPUT_HEIGHT,  } from '../../../static/constSet';
  
import { STRING_DEFAULT_APPLY, STRING_SETTING_GROUP_ADD, STRING_SETTING_GROUP_DELETE, STRING_SETTING_GROUP_UPDATE } from '../../../static/langSet';
import { Unit, ViewModeProp } from '../../../static/types';
import { FONTSET_DEFAULT_INPUT_SIZE } from '../../../static/fontSet';
import { COLORSET_DARK_CONTROL_BG, COLORSET_GRID_CONTROL_BG, COLORSET_GRID_CONTROL_BG2, COLORSET_GROUP_CONTROL_BG, COLORSET_GROUP_CONTROL_BORDER, COLORSET_SIGNITURE_COLOR } from '../../../static/colorSet';
import { setCurrentUnit } from '../../../features/reducers/tabPageSlice';


const UnitGroupListControl: React.FC<ViewModeProp> = ({viewMode}) => {
  const dispatch = useDispatch();
  const unitGroupSlice = useSelector((state: RootStore) => state.unitGroupReducer);
  const tabPageSlice = useSelector((state: RootStore) => state.tabPageReducer);
  const [editMode, setEditMode] = useState<{ [key: string]: boolean }>({});
  const [editedNames, setEditedNames] = useState< string[] >(Array(unitGroupSlice.groups.length).fill('-'));
  const inputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});

  const toggleEdit = (index: number) => {
    setEditMode(prev => ({ ...prev, [index]: !prev[index] }));

    if (editMode[index]) {
      const updatedGroup = { ...unitGroupSlice.groups[index], name: editedNames[index] || unitGroupSlice.groups[index].name };
      dispatch(updateGroup({ index, group: updatedGroup }));
    } 

    if (!editMode[index]) {
      setTimeout(() => {
        inputRefs.current[index]?.focus();
      }, 0);
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
    console.log(index)
    dispatch(updateFromCurrent({ index }));
  };
  
  const handleDelete = (index: number) => {
    dispatch(deleteGroup(index));
  };

  const handleApply = (index: number) => {
    if (viewMode === "apply") {
      const currentTabUnit = {...tabPageSlice.currentTabPage.unitList[tabPageSlice.unitPosition.index]}
      currentTabUnit.dvList = unitGroupSlice.currentGroup.dvList

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
    <GroupContainer>
      <ListContainer>
        <BaseFlex1Column>
          <BigLabel>{"Unit Group List"}</BigLabel>
        </BaseFlex1Column>
        {unitGroupSlice.groups.length > 0
          ? unitGroupSlice.groups.map((group:Unit, index:number) => (
            <SaveUnitContainer key={index}  onDoubleClick={() => handleGroupNameClick(index)}>
              <IndexLabel heightSize="20px">{index + 1}</IndexLabel>
              <GroupNameContainer>
                <NameInput
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  disabled={!editMode[index]}
                  value={editedNames[index]}
                  onChange={(e) => handleNameChange(index, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && editMode[index]) {
                      toggleEdit(index);
                    } else if (e.key === 'Escape' && editMode[index]) {
                      editCancel(index);
                    }
                  }}
                  mode={(index) === unitGroupSlice.selectedPos ? "true" : "false"}
                />
                {viewMode === "setting" && (
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
            </SaveUnitContainer>
          ))
        : renderEmptyRows()
      }
      </ListContainer>
      {viewMode === "setting" ? (
      <ButtonsContainer>
        <BaseButton onClick={handleAdd} widthsize={"60px"}>
          {STRING_SETTING_GROUP_ADD}
        </BaseButton>
        <BaseButton onClick={() => handleDelete(unitGroupSlice.selectedPos)} widthsize={"60px"}>
          {STRING_SETTING_GROUP_DELETE}
        </BaseButton>
        <ActiveButton onClick={() => handleUpdate(unitGroupSlice.selectedPos)} widthsize={"60px"}>
          {STRING_SETTING_GROUP_UPDATE}
        </ActiveButton>
      </ButtonsContainer>
      ): <ButtonsContainer>
        <ActiveButton onClick={() => handleApply(unitGroupSlice.selectedPos)}>
          {STRING_DEFAULT_APPLY}
        </ActiveButton>
      </ButtonsContainer>}
    </GroupContainer>
  );  
};

const GroupContainer = styled(BaseFlexDiv)`
  flex-direction: column;

  padding: 15px 10px;

  background-color: ${COLORSET_GROUP_CONTROL_BG};
  border: 1px solid ${COLORSET_GROUP_CONTROL_BORDER};
`;

const ListContainer = styled(BaseFlex1Column)`
  justify-content: flex-start;
  margin-top: auto;

  gap: 5px;

  background-color: transparent;
`;

const SaveUnitContainer = styled(BaseFlex1Row)`
  justify-content: space-between;
  align-items: flex-start;

  background-color: transparent;
`;

const ButtonsContainer = styled(BaseFlexDiv)`
  align-items: flex-end;
  justify-content: center;

  margin-top: auto;
  height: 30px;
  background-color: transparent;
`;

const EditButtonsContainer = styled(BaseFlexDiv)`
  align-items: flex-end;
  justify-content: start;

  gap: 3px;
  
  width: 55px;

  background-color: transparent;
`;

const GroupNameContainer = styled(BaseFlex1Div)`
  justify-content: space-between;
  align-items: center;

  background-color: transparent;
`;

const IndexLabel = styled(MediumLabel)`  
  text-align: center;
  width: 10px;
`;

const NameInput = styled.input<{ mode: string, heightsize?: string, fontsize?: string }>`
  height: ${(props) => props.heightsize || SIZESET_DEFAULT_INPUT_HEIGHT};

  color: ${(props) => (props.mode === "true" ? "white" : "black")};
  font-size: ${(props) => props.fontsize || FONTSET_DEFAULT_INPUT_SIZE};
  
  background-color: ${COLORSET_DARK_CONTROL_BG};
  border: 1px solid ${COLORSET_GROUP_CONTROL_BORDER};
  pointer-events: ${(props) => (props.mode === "true" ? "true" : "none")}; 
`;

export default UnitGroupListControl;
