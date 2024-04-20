import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { SetDeviceType, Unit } from "../../../static/types";
import DeviceAutoSelect from "./DeviceSelector";
import { RootStore } from "../../../store/congifureStore";
import { BaseFlex1Column, BaseFlex1Div, BaseFlexColumn, BaseFlexDiv, SmallLabel } from "../../../static/componentSet";
import { COLORSET_GRID_CONTROL_BG2, COLORSET_GRID_HEADER_BG } from "../../../static/colorSet";

const UnitTypeV: React.FC<SetDeviceType> = ({ name }) => {
  const deviceSet = useSelector((state: RootStore) => state.deviceReducer);
  const tabPageSlice = useSelector((state: RootStore) => state.tabPageReducer);
  const [currUnit, setCurrUnit] = useState<Unit>(
    tabPageSlice.currentTabPage.unitList[tabPageSlice.unitPosition.index]
  );
  
  const unitKeys = ["R-S", "S-T", "T-R", "R", "S", "T", "PF", "Hz", "kW"];
  
  useEffect(() => {
    setCurrUnit(tabPageSlice.currentTabPage.unitList[tabPageSlice.unitPosition.index]);
  }, [tabPageSlice.currentTabPage, tabPageSlice.unitPosition]);
  
  const deviceinfo = (deviceId: number) => {
    return deviceSet.devices[deviceId.toString()];
  };

  return (
    <UnitContainer>
      <Section>
        <TitleDiv>{name}</TitleDiv>
      </Section>
      <DivicesContainer>
        {unitKeys.map((value, idx) => {
          const initStationId =
            currUnit.dvList[idx] !== 0
              ? deviceinfo(currUnit.dvList[idx]).stationId
              : currUnit.st;
          const initDivisionId =
            currUnit.dvList[idx] !== 0
              ? deviceinfo(currUnit.dvList[idx]).divisionId
              : currUnit.div;

          return (
            <DiviceDiv key={idx}>
              <ValueColumn>{value}</ValueColumn>
              <DeviceAutoSelect
                unitPosition={tabPageSlice.unitPosition.index}
                devicePosition={idx}
                devicelist={deviceSet}
                initStationId={initStationId}
                stationValue={currUnit.st}
                initDivisionId={initDivisionId}
                divisionValue={currUnit.div}
                currentDeviceId={currUnit.dvList[idx]}
              />
            </DiviceDiv>
          );
        })}
      </DivicesContainer>
      
    </UnitContainer>
  );
};

const UnitContainer = styled(BaseFlex1Column)`
  justify-content: space-between;
  flex-direction: column;
  align-items: stretch;
  gap: 0px;

  background-color: ${COLORSET_GRID_CONTROL_BG2};
`;

const TitleDiv = styled(BaseFlex1Div)`
  align-items: center;
  justify-content: start;
  
  padding: 0px 10px;

  background-color: ${COLORSET_GRID_HEADER_BG};
`;

const ValueColumn = styled(SmallLabel)`
  padding: 0px 3px;
  width: 40px;
`;

const Section = styled(BaseFlexDiv)`
  height: 25px;
`;

const DivicesContainer = styled(BaseFlex1Column)`
  padding: 10px;
  gap: 7px;

  background-color: ${COLORSET_GRID_CONTROL_BG2};
`;

const DiviceDiv = styled(BaseFlexColumn)`
  gap: 0px;
`;

export default UnitTypeV;
