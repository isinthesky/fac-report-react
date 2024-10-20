import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Filter from "./Filter";
import { ActiveButton, BaseButton, BaseFlex1Column, BaseFlex1Row, BaseFlexCenterDiv, BigLabel } from "../../../static/componentSet";
import UnitGroupListControl from "./UnitGroupListControl";
import { STRING_DEFAULT_CANCEL, STRING_DEFAULT_SAVE, STRING_SETTING_GROUP_DEVICE_LIST } from "../../../static/langSet";
import { STRING_SETTING_GROUP_ADD, STRING_SETTING_GROUP_DELETE, STRING_SETTING_GROUP_UPDATE } from '../../../static/langSet';  
import { updatePresetTab, updatePresetDevice } from "../../../features/api/device";
import { RootStore } from "../../../store/congifureStore";
import { Item, Preset } from "../../../static/types";
import UnitGroupAutoSelect from "./UnitGroupSelector";
import { COLORSET_GRID_CONTROL_BG2, COLORSET_GRID_CONTROL_BORDER } from "../../../static/colorSet";
import { addDevice, setCurrentGroup, updateDevice, deleteDevice } from "../../../features/reducers/unitGroupSlice";

const UnitGroupSet: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const presetSlice = useSelector((state: RootStore) => state.unitGroupReducer);
  const deviceSet = useSelector((state: RootStore) => state.deviceReducer);

  useEffect(() => {
    dispatch(setCurrentGroup(presetSlice.selectedPos));
  }, [dispatch, presetSlice.selectedPos]);

  const handleAdd = () => {
    const newGroup = {idx: 0, station_id: 0, division_id: 0, path_id: 0} as Item;
    dispatch(addDevice(newGroup));
  };

  const handleDelete = (index: number) => {
    console.log(index)
    dispatch(deleteDevice(index));
  };

  const handleSave = async  () => {
    dispatch(updateDevice(presetSlice.selectedPos));
  };

  const handleCancel = () => {
    navigate("/settings", { state: { fromNavigate: true } });
  }

  const renderSection = (index1: number, unit: Preset) => {
    return <>
      {unit.tab_device_presets.map((device: Item, idx: number) => {
          const initStationId = (device.path_id !== 0) ? device.station_id : unit.search_st;
          const initDivisionId = (device.path_id !== 0) ? device.division_id : unit.search_div;
                                
          return( 
          <ValueSection key={idx}>
            <IndexLabel>{idx + 1}</IndexLabel>
            <UnitGroupAutoSelect
              unitPosition={presetSlice.selectedPos}
              devicePosition={idx}
              initStationId={initStationId}
              initDivisionId={initDivisionId}
              devicelist={deviceSet}
              stationValue={unit.search_st}
              divisionValue={unit.search_div}
              currentDevice={device}
            />
          </ValueSection>)
      })}
    </>
  }

  return (
    <UnitGroupContainer>
      <BaseFlex1Row>
        <UnitGroupListControl settingMode={"setting"} />
        <Filter />
        <DevicesContainer>
          <BigLabel>{STRING_SETTING_GROUP_DEVICE_LIST}</BigLabel>
          <BaseFlex1Column>
            { renderSection(0, presetSlice.currentGroup) }
          </BaseFlex1Column>
          <ButtonsContainer>
            <BaseButton onClick={handleAdd} widthsize={"50px"}>
              {STRING_SETTING_GROUP_ADD}
            </BaseButton>
            <BaseButton onClick={() => handleDelete(presetSlice.currentGroup.tab_device_presets.length - 1)} widthsize={"50px"}>
              {STRING_SETTING_GROUP_DELETE}
            </BaseButton>
          </ButtonsContainer>
        </DevicesContainer>
      </BaseFlex1Row>
      <ButtonsContainer>
        <BaseButton onClick={handleCancel}>{STRING_DEFAULT_CANCEL}</BaseButton>
        <ActiveButton onClick={handleSave}>{STRING_DEFAULT_SAVE}</ActiveButton>
      </ButtonsContainer>
    </UnitGroupContainer>
  );
};

const UnitGroupContainer = styled(BaseFlex1Column)`
  margin: 0px 20px;
  padding: 10px;
`;

const DevicesContainer = styled(BaseFlex1Column)`
  padding: 10px;
  background-color: ${COLORSET_GRID_CONTROL_BG2};
  border: 1px solid ${COLORSET_GRID_CONTROL_BORDER};
`;

const IndexLabel = styled(BigLabel)`
  text-align: center;
  width: 10px;
`;

const ButtonsContainer = styled(BaseFlexCenterDiv)`
  flex-wrap: wrap;
  padding: 10px;
  gap: 50px;
`;

const ValueSection = styled(BaseFlex1Row)`
  margin-top: 10px;
`;

export default UnitGroupSet;
