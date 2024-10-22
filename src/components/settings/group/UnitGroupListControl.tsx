import React, {useEffect, useState, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { addUnitGroup, updateGroup, updateFromCurrent, updateCurrentGroup, deleteGroup, setCurrentGroup, setSelectedGroup } from '../../../features/reducers/unitGroupSlice';
import { RootStore } from '../../../store/congifureStore';
import { ActiveButton, BaseButton, BaseFlex1Column, BaseFlex1Div, BaseFlex1Row, BaseFlexDiv, BigLabel, ControlButton, MediumLabel } from '../../../static/componentSet';
import { ICON_DAY_CHECK, ICON_DAY_EDIT, ICON_DAY_UNDO, SIZESET_DEFAULT_INPUT_HEIGHT,  } from '../../../static/constSet';
import { STRING_SETTING_GROUP_ADD, STRING_SETTING_GROUP_APPLY, STRING_SETTING_GROUP_DELETE, STRING_SETTING_GROUP_LIST, STRING_SETTING_GROUP_SETTING, STRING_SETTING_GROUP_UPDATE } from '../../../static/langSet';
import { Preset, ViewModeProp } from '../../../static/types';
import { FONTSET_DEFAULT_INPUT_SIZE } from '../../../static/fontSet';
import { COLORSET_GROUP_INPUT_NOMAL_BG, COLORSET_DARK_CONTROL_BG, COLORSET_GROUP_CONTROL_BG, COLORSET_GROUP_CONTROL_BORDER, COLORSET_GROUP_INPUT_ACTIVE_BORDER, COLORSET_GROUP_INPUT_ACTIVE_FONT, COLORSET_GROUP_INPUT_NOMAL_BORDER, COLORSET_GROUP_INPUT_NOMAL_FONT } from '../../../static/colorSet';
import { setCurrentUnit } from '../../../features/reducers/tabPageSlice';
import { setdeviceSearchWord } from '../../../features/reducers/settingSlice';


const UnitGroupListControl: React.FC<ViewModeProp> = ({settingMode}) => {
  const dispatch = useDispatch();
  const unitGroupSlice = useSelector((state: RootStore) => state.unitGroupReducer);
  const tabPageSlice = useSelector((state: RootStore) => state.tabPageReducer);
  const [editMode, setEditMode] = useState<{ [key: string]: boolean }>({});
  const [editedNames, setEditedNames] = useState< string[] >(Array(unitGroupSlice.groups.length).fill('-'));
  const inputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});

  const toggleEdit = (index: number) => {
    setEditMode(prev => {
      const newEditMode: { [key: number]: boolean } = { ...prev, [index]: !prev[index] };
  
      if (!newEditMode[index]) {
        const updatedGroup = { ...unitGroupSlice.groups[index], name: editedNames[index] };
        dispatch(updateGroup({ index, group: updatedGroup }));
  
        if (unitGroupSlice.selectedPos === index) {
          dispatch(updateCurrentGroup(updatedGroup));
        }
      } else {
        setTimeout(() => {
          inputRefs.current[index]?.focus();
        }, 0);
      }
  
      return newEditMode;
    });
  };

  const editCancel = (index: number) => {
    setEditMode(prev => ({ ...prev, [index]: !prev[index] }));
  
    if (editMode[index]) {
      const arrName = unitGroupSlice.groups.map((obj) => {
        return obj.name;
      });

      setEditedNames(arrName);
    }
  };

  useEffect(() => {
    const arrName = unitGroupSlice.groups.map((obj) => {
      return obj.name;
    })

    setEditedNames(arrName)
  }, [unitGroupSlice]);

  const handleGroupNameClick = (position: number) => {
    dispatch(setSelectedGroup(position));
    dispatch(setCurrentGroup(position));
    handleClearInput();
  };

  const handleNameChange = (position: number, name: string) => {
    const res = [...editedNames]
    res[position] = name
    setEditedNames(res);
  };

  const handleAdd = () => {
    const newGroup = { id: 0, tab_name: " ", name: "", type: 1, idx: 0, search_st: 0, search_div: 0, tab_device_presets: Array(9).fill(0), max_device: 0, disable:0};
    dispatch(addUnitGroup(newGroup));
  };

  const handleUpdate = (index: number) => {
    dispatch(updateFromCurrent(index));
  };
  
  const handleDelete = (index: number) => {
    dispatch(deleteGroup(index));
  };

  const handleApply = () => {
    if (settingMode === "apply") {
      const currentTabUnit = tabPageSlice.currentTabPage?.tables[tabPageSlice.unitPosition.index];

      if (currentTabUnit) {
        const updatedDevices = currentTabUnit.devices?.map((device, i) => ({
          ...device,
          division_id: unitGroupSlice.currentGroup.tab_device_presets[i].division_id,
          path_id: unitGroupSlice.currentGroup.tab_device_presets[i].path_id,
          station_id: unitGroupSlice.currentGroup.tab_device_presets[i].station_id,
        }));

        const updatedUnit = {
          ...currentTabUnit,
          devices: updatedDevices,
        };

        dispatch(setCurrentUnit({position: tabPageSlice.unitPosition.index, unit: updatedUnit}));
      }
    }
  };

  const handleClearInput = () => {
    dispatch(setdeviceSearchWord(""))
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
          <BigLabel>{ settingMode === "setting" ? STRING_SETTING_GROUP_SETTING : STRING_SETTING_GROUP_LIST}</BigLabel>
        </BaseFlex1Column>
        {unitGroupSlice.groups.length > 0
          ? unitGroupSlice.groups.map((group:Preset, index:number) => (
            <SaveUnitContainer key={index}  onClick={() => handleGroupNameClick(index)}>
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
                {settingMode === "setting" && (
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
      {settingMode === "setting" ? (
      <ButtonsContainer>
        <BaseButton onClick={handleAdd} widthsize={"50px"}>
          {STRING_SETTING_GROUP_ADD}
        </BaseButton>
        <BaseButton onClick={() => handleDelete(unitGroupSlice.selectedPos)} widthsize={"50px"}>
          {STRING_SETTING_GROUP_DELETE}
        </BaseButton>
        <ActiveButton onClick={() => handleUpdate(unitGroupSlice.selectedPos)} widthsize={"60px"}>
          {STRING_SETTING_GROUP_UPDATE}
        </ActiveButton>
      </ButtonsContainer>
      ): <ButtonsContainer>
        <ActiveButton onClick={() => handleApply()}>
          {STRING_SETTING_GROUP_APPLY}
        </ActiveButton>
      </ButtonsContainer>}
    </GroupContainer>
  );  
};

const GroupContainer = styled(BaseFlexDiv)`
  flex-direction: column;

  padding: 10px;

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
  gap: 10px;
  padding: 0px 10px;

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
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;

  width: 10px;
`;

const NameInput = styled.input<{ mode: string, heightsize?: string, fontSize?: string }>`
  height: ${(props) => props.heightsize || SIZESET_DEFAULT_INPUT_HEIGHT};
  font-size: ${(props) => props.fontSize? props.fontSize : FONTSET_DEFAULT_INPUT_SIZE};
  width: 100px;
  
  color: ${(props) => (props.mode === "true" ? COLORSET_GROUP_INPUT_ACTIVE_FONT : COLORSET_GROUP_INPUT_NOMAL_FONT)};
  background-color: ${(props) => (props.mode === "true" ? COLORSET_DARK_CONTROL_BG : COLORSET_GROUP_INPUT_NOMAL_BG)};
  border: 1px solid ${(props) => (props.mode === "true" ? COLORSET_GROUP_INPUT_ACTIVE_BORDER : COLORSET_GROUP_INPUT_NOMAL_BORDER)};
  pointer-events: ${(props) => (props.mode === "true" ? "true" : "none")}; 
`;

export default UnitGroupListControl;
