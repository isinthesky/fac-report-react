import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { IStation, IDivision, SetDeviceType, Unit } from "../../../static/types";
import DeviceAutoSelect from "./DeviceAutoSelect";
import { RootStore } from "../../../store/congifureStore";


const SetDeviceTypeV: React.FC<SetDeviceType> = ({ id }) => {
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


  return (
    <Container>
       <Section>
         <MiddleColumn>{"V"}</MiddleColumn>
       </Section>

       {unitKeys.map((value, idx) => {
        
        const deviceKey = `dv${String(idx + 1)}` as keyof Unit;
        const device = tabPageSet.currentTabPage.unitList[idx];
        const initStationId = Number(device[deviceKey]) !== 0 ? deviceinfo(Number(device[deviceKey])).stationId : currUnit.st;
        const initDivisionId = Number(device[deviceKey]) !== 0 ? deviceinfo(Number(device[deviceKey])).divisionId : currUnit.div;

        return(
        <ValueSection key={idx}>
          <ValueColumn>{value}</ValueColumn>
          <DeviceAutoSelect
            pos={tabPageSet.unitPosition.index}
            devKey={`dv${String(idx+1)}`}
            devicelist={deviceSet}
            initStationId={initStationId}
            stationValue={device.st}
            initDivisionId={initDivisionId}
            divisionValue={device.div}
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

const Row = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
  margin-bottom: 10px;
`;

const MiddleColumn = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px;
  border: 1px solid #ccc;
`;

const ValueColumn = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px;
  border: 1px solid #ccc;
  width: 70px;
`;

const Section = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ValueSection = styled(Row)`
  margin: 10px;
`;

export default SetDeviceTypeV;
