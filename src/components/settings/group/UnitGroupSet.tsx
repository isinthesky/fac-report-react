import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Filter from "./Filter";
import { ActiveButton, BaseButton, BaseFlex1Column, BaseFlex1Row, BaseFlexCenterDiv, BigLabel } from "../../../static/componentSet";
import UnitGroupListControl from "./UnitGroupListControl";
import { STRING_DEFAULT_CANCEL, STRING_DEFAULT_SAVE, STRING_SETTING_GROUP_DEVICE_LIST } from "../../../static/langSet";
import { updateUnitGroupList } from "../../../features/api/device";
import { RootStore } from "../../../store/congifureStore";
import { Item, Unit } from "../../../static/types";
import UnitGroupAutoSelect from "./UnitGroupSelector";
import { COLORSET_GRID_CONTROL_BG2, COLORSET_GRID_CONTROL_BORDER } from "../../../static/colorSet";
import { updateFromCurrent } from "../../../features/reducers/unitGroupSlice";

const UnitGroupSet: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const unitGroupSlice = useSelector((state: RootStore) => state.unitGroupReducer);
  const deviceSet = useSelector((state: RootStore) => state.deviceReducer);
  const [deviceList, setDeviceList] = useState<Unit>(unitGroupSlice.currentGroup);

  useEffect(() => {
    console.log("unitGroupSlice.currentGroup", unitGroupSlice.currentGroup);
    setDeviceList(unitGroupSlice.currentGroup);
  }, [unitGroupSlice.currentGroup, unitGroupSlice.selectedPos]);

  const handleSave = async  () => {
    try {
      await updateUnitGroupList(unitGroupSlice.groups)
      dispatch(updateFromCurrent(unitGroupSlice.selectedPos));
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    navigate("/settings");
  }

  const deviceinfo = (deviceId: number) => {
    return deviceSet.devices[deviceId];
  };

  const renderSection = (index1: number, unit: Unit) => {
    return <>
      {unit.devices.map((device: Item, idx: number) => {
          const initStationId = (device.path_id !== 0) ? device.station_id : unit.st;
          const initDivisionId = (device.path_id !== 0) ? device.division_id : unit.div;
                                
          return( <ValueSection key={idx}>
                    <IndexLabel>{idx + 1}</IndexLabel>
                    <UnitGroupAutoSelect
                      unitPosition={unitGroupSlice.selectedPos}
                      devicePosition={idx}
                      initStationId={initStationId}
                      initDivisionId={initDivisionId}
                      devicelist={deviceSet}
                      stationValue={unit.st}
                      divisionValue={unit.div}
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
            { renderSection(0, deviceList) }
          </BaseFlex1Column>
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
  margin: 10px;
`;

export default UnitGroupSet;
