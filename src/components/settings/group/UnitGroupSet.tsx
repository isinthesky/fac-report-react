import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SettingHeader from "./SettingHeader";
import { ActiveButton, BaseButton, BaseFlex1Column, BaseFlex1Row, BaseFlexCenterDiv, BaseFlexColumn, BigLabel, ControlButton, MediumLabel } from "../../../static/componentSet";
import UnitGroupListControl from "./UnitGroupListControl";
import { STRING_DEFAULT_CANCEL, STRING_DEFAULT_SAVE } from "../../../static/langSet";
import { updateUnitGroupList } from "../../../features/api/device";
import { RootStore } from "../../../store/congifureStore";
import { Unit } from "../../../static/types";
import UnitGroupAutoSelect from "./UnitGroupSelector";
import { COLORSET_DARK_CONTROL_BG, COLORSET_DARK_CONTROL_FONT, COLORSET_GRID_CONTROL_BG2, COLORSET_GRID_CONTROL_BORDER } from "../../../static/colorSet";

const UnitGroupSet: React.FC = () => {
  const navigate = useNavigate();
  const unitGroupSlice = useSelector((state: RootStore) => state.unitGroupReducer);
  const deviceSet = useSelector((state: RootStore) => state.deviceReducer);
  const [selectedStation, setSelectedStation] = useState<number>(unitGroupSlice.currentGroup.st);
  const [selectedDivision, setSelectedDivision] = useState<number>(unitGroupSlice.currentGroup.div);

  const handleSave = async  () => {
    try {
      await updateUnitGroupList(unitGroupSlice.groups)
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    navigate("/settings");
  }

  const renderSection = (index1: number, unit: Unit) => (
    <BaseFlex1Column>
      {unit.dvList.map((value: number, idx: number) => (
        <ValueSection key={idx}>
          <IndexLabel fontsize="14px">{idx + 1}</IndexLabel>
          <UnitGroupAutoSelect
            unitPosition={0}
            devicePosition={idx}
            initStationId={selectedStation}
            initDivisionId={selectedDivision}
            devicelist={deviceSet}
            stationValue={selectedStation}
            divisionValue={selectedDivision}
            currentDeviceId={unitGroupSlice.currentGroup.dvList[idx]}
          />
        </ValueSection>
      ))}
    </BaseFlex1Column>
  );

  return (
    <UnitGroupContainer>
      <BaseFlex1Row>
        <UnitGroupListControl viewMode={"setting"} />
        <SettingHeader />
        <DevicesContainer>
          <BigLabel>Device List</BigLabel>
          { renderSection(0, unitGroupSlice.currentGroup) }
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
