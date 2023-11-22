import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { IStation, IDivision, SetDeviceType, Unit } from "../../../static/types";
import DeviceAutoSelect from "./DeviceAutoSelect";
import { RootStore } from "../../../store/congifureStore";
import { BaseFlexDiv, BaseFlexRow } from "../../../static/styledComps";


const SetDeviceTypeV: React.FC<SetDeviceType> = ({ unitPos }) => {
  const deviceSet = useSelector((state: RootStore) => state.deviceReducer);
  const tabPageSet = useSelector((state: RootStore) => state.tabPageReducer);
  const [currUnit, setCurrUnit] = useState<Unit>(tabPageSet.currentTabPage.unitList[tabPageSet.unitPosition.index])

  const deviceinfo = (deviceId: number) => {
    return deviceSet.devices[deviceId]
  }
  const unitKeys = ["R-S", "S-T", "T-R", "R", "S", "T", "PF", "Hz", "kW"];

  useEffect(() => {
    const unit = tabPageSet.currentTabPage.unitList[tabPageSet.unitPosition.index]
    setCurrUnit(unit)
  }, [tabPageSet.currentTabPage, tabPageSet.unitPosition]);

  console.log("tabPageSet", tabPageSet)
  console.log("currUnit", currUnit)

  return (
    <Container>
    <Section>
      <TitleDiv>{"W"}</TitleDiv>
    </Section>

    {unitKeys.map((value, idx) => {
     const initStationId = currUnit.dvList[idx] !== 0 ? deviceinfo(currUnit.dvList[idx]).stationId : currUnit.st;
     const initDivisionId = currUnit.dvList[idx] !== 0 ? deviceinfo(currUnit.dvList[idx]).divisionId : currUnit.div;

     return(
     <ValueSection key={idx}>
       <ValueColumn>{value}</ValueColumn>
       <DeviceAutoSelect
         unitPosition={tabPageSet.unitPosition.index}
         devicePosition={idx}
         devicelist={deviceSet}
         initStationId={initStationId}
         stationValue={currUnit.st}
         initDivisionId={initDivisionId}
         divisionValue={currUnit.div}
         currentDevice={tabPageSet.currentTabPage.unitList[idx]}
       />
     </ValueSection>
   )}
   )}
   
 </Container>
  );
};

const Container = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: stretch;
  
  border: 1px solid #111;
`;

const TitleDiv = styled(BaseFlexDiv)`
  align-items: center;
  justify-content: center;
  padding: 3px;
  border: 1px solid #ccc;
`;

const ValueColumn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px;
  border: 1px solid #ccc;
  width: 50px;
`;

const Section = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ValueSection = styled(BaseFlexRow)`
  margin: 10px;
  gap 20px;
`;

export default SetDeviceTypeV;
