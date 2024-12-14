import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Filter from "@/components/settings/group/Filter";
import { ActiveButton, BaseButton, BaseFlex1Column, BaseFlex1Row, BaseFlexCenterDiv, BigLabel } from "@/static/componentSet";
import UnitGroupListControl from "@/components/features/settings/group/UnitGroupListControl";
import { STRING_DEFAULT_CANCEL, STRING_DEFAULT_SAVE, STRING_SETTING_GROUP_DEVICE_LIST } from "@/static/langSet";
import { STRING_SETTING_GROUP_ADD, STRING_SETTING_GROUP_DELETE } from "@/static/langSet";
import { RootStore } from "@/store/congifureStore";
import { Item, Preset } from "@/types/types";
import UnitGroupAutoSelect from "@/components/settings/group/UnitGroupSelector";
import { COLORSET_GRID_CONTROL_BG2, COLORSET_GRID_CONTROL_BORDER } from "@/static/colorSet";
import { addDevice, setCurrentGroup, updateDevice, deleteDevice, updateGroup, updateFromCurrent, updateCurrentGroup } from "@/entities/reducers/unitGroupSlice";
import { updatePresetDevices } from "@/features/preset";
import { updatePresetTable } from "@/entities/api/device";

const UnitGroupSet: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const presetSlice = useSelector((state: RootStore) => state.unitGroupReducer);
  const deviceSet = useSelector((state: RootStore) => state.deviceReducer);

  useEffect(() => {
    dispatch(setCurrentGroup(presetSlice.selectedPos));
  }, [dispatch, presetSlice.selectedPos]);

  const handleAdd = () => {
    dispatch(addDevice());
  };

  const handleDelete = (index: number) => {
    dispatch(deleteDevice(index));
  };

  const handleSave = async () => {
    try {
      const currentPreset = presetSlice.currentPresetTable;
      const hasNewDevices = currentPreset.tab_device_presets.some(device => device.id === 0);
  
      console.log(currentPreset);

      // Update preset table
      const tabUpdateResult = await updatePresetTable(
        currentPreset.id,
        currentPreset.name,
        currentPreset.type,
        currentPreset.tab_device_presets.length,
        currentPreset.search_st,
        currentPreset.search_div
      );
  
      if (!tabUpdateResult) {
        alert("프리셋 탭 업데이트에 실패했습니다.");
        return;
      }

      console.log(tabUpdateResult, tabUpdateResult.data);

      // Find updated preset in the result
      const updatedPreset = tabUpdateResult.data.find((item: Preset) => item.id === currentPreset.id);
      if (!updatedPreset) {
        alert("업데이트된 프리셋을 찾을 수 없습니다.");
        return;
      }

      if (hasNewDevices) {
        // Merge new device data
        updatedPreset.tab_device_presets = updatedPreset.tab_device_presets.map((device: Item, index: number) => {
          const currentDevice = currentPreset.tab_device_presets[index];
          if (currentDevice.id === 0 && currentDevice.path_id > 0) {
            return {
              ...device,
              station_id: currentDevice.station_id,
              division_id: currentDevice.division_id,
              path_id: currentDevice.path_id,
            };
          }
          return device;
        });
      }

      // Update Redux store
      dispatch(updateGroup({ index: presetSlice.selectedPos, group: updatedPreset }));
      dispatch(updateFromCurrent(presetSlice.selectedPos));

      // Save updated devices
      const result = await updatePresetDevices(updatedPreset);
      if (result) {
        alert("저장 되었습니다.");
      } else {
        alert("디바이스 프리셋 업데이트에 실패했습니다.");
      }
    } catch (error) {
      console.error('Failed to update preset:', error);
      alert("프리셋 업데이트 중 오류가 발생했습니다.");
    }
  };

  const handleCancel = () => {
    navigate("/settings", { state: { fromNavigate: true } });
  }

  const renderSection = (index: number, unit: Preset) => {
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
            { renderSection(0, presetSlice.currentPresetTable) }
          </BaseFlex1Column>
          <ButtonsContainer>
            <BaseButton onClick={handleAdd} widthsize={"50px"}>
              {STRING_SETTING_GROUP_ADD}
            </BaseButton>
            <BaseButton onClick={() => handleDelete(presetSlice.currentPresetTable.tab_device_presets.length - 1)} widthsize={"50px"}>
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
