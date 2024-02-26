import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { IStation, IDivision, SetDeviceType, Unit } from "../../../static/types";
import DeviceAutoSelect from "./DeviceSelector";
import { RootStore } from "../../../store/congifureStore";
import { BaseFlex1Div, BaseFlex1Row } from "../../../static/componentSet";


const SetDeviceTypeW: React.FC<SetDeviceType> = ({ name }) => {
  const deviceSet = useSelector((state: RootStore) => state.deviceReducer);
  const tabPageSlice = useSelector((state: RootStore) => state.tabPageReducer);
  const [currUnit, setCurrUnit] = useState<Unit>(tabPageSlice.currentTabPage.unitList[tabPageSlice.unitPosition.index])

  const deviceinfo = (deviceId: number) => {
    return deviceSet.devices[deviceId.toString()]
  }
  const unitKeys = ["R-S", "S-T", "T-R", "R", "S", "T", "PF", "Hz", "kW"];

  useEffect(() => {
    const unit = tabPageSlice.currentTabPage.unitList[tabPageSlice.unitPosition.index]
    setCurrUnit(unit)
  }, [tabPageSlice.currentTabPage, tabPageSlice.unitPosition]);


  return (
    <Container>
       <Section>
         <TitleDiv>{name}</TitleDiv>
       </Section>

       {unitKeys.map((value, idx) => {
        const initStationId = currUnit.dvList[idx] !== 0 ? deviceinfo(currUnit.dvList[idx]).stationId : currUnit.st;
        const initDivisionId = currUnit.dvList[idx] !== 0 ? deviceinfo(currUnit.dvList[idx]).divisionId : currUnit.div;

        return(
        <ValueSection key={idx}>
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

const TitleDiv = styled(BaseFlex1Div)`
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

const ValueSection = styled(BaseFlex1Row)`
  margin: 10px;
  gap 20px;
`;

export default SetDeviceTypeW;
