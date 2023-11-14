import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { IStation, IDivision, SetDeviceType, Unit } from "../../static/types";
import DeviceAutoSelect from "./DeviceAutoSelect";
import { updateCurrentTab } from "../../features/reducers/tabPageSlice";
import { RootStore } from "../../store/congifureStore";


const SetDeviceTypeV: React.FC<SetDeviceType> = ({ id, device }) => {
  const dispatch = useDispatch();
  const deviceSet = useSelector((state: RootStore) => state.deviceReducer.value);
  const tabPageSet = useSelector((state: RootStore) => state.tabPageReducer);

  const [selectedStation, setSelectedStation] = useState<number>(0);
  const [selectedDivision, setSelectedDivision] = useState<number>(0);
  const [deviceName, setDeviceName] = useState<string>(tabPageSet.currentTabPage.unitList[id].name);


  useEffect(() => {
    const newStation = tabPageSet.currentTabPage.unitList[id].st;
    setSelectedStation(newStation);
  }, [tabPageSet.currentTabPage, id]);

  useEffect(() => {
    const relatedDivisions = deviceSet.divisions.filter(div => div.stationId === selectedStation);
    if (relatedDivisions.length > 0) {
      setSelectedDivision(relatedDivisions[0].id);
    } else {
      setSelectedDivision(0); // or a default value indicating no division is selected
    }
  }, [selectedStation, deviceSet.divisions]);


  const handleStationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStation(Number(e.target.value));
    dispatch(
      updateCurrentTab({
        arrPos: id,
        arrKey: "st",
        deviceId: Number(e.target.value),
      })
    );
  };

  const handleDivisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDivision(Number(e.target.value));
    dispatch(
      updateCurrentTab({
        arrPos: id,
        arrKey: "div",
        deviceId: Number(e.target.value),
      })
    );
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeviceName(e.target.value);
    dispatch(
      updateCurrentTab({
        arrPos: id,
        arrKey: "name",
        deviceId: e.target.value,
      })
    );
  };

  console.log("optionSet", tabPageSet);

  const deviceinfo = (deviceId: number) => {
    return deviceSet.devices[deviceId]
  }


  const renderSection = (index1: number, typeDev: string, values: string[]) => (
    <Section>
      <MiddleColumn>{typeDev}</MiddleColumn>
      {values.map((value, idx) => {
        
        const deviceKey = `dv${String(idx + 1)}` as keyof Unit;
        const device = tabPageSet.currentTabPage.unitList[idx];
        const initStationId = device[deviceKey] !== 0 ? deviceinfo(Number( device[deviceKey])).stationId : selectedStation;

        return(
        <ValueSection key={idx}>
          <ValueColumn>{value}</ValueColumn>
          <DeviceAutoSelect
            pos={index1}
            devKey={`dv${String(idx+1)}`}
            devicelist={deviceSet}
            initStationId={initStationId}
            stationValue={device.st}
            initDivisionId={selectedDivision}
            divisionValue={device.div}
            currentDevice={tabPageSet.currentTabPage.unitList[idx]}
          />
        </ValueSection>
      )}
      )}
    </Section>
  );

  return (
    <Container>
      <InnerDiv>
        <Row>
          <Select onChange={handleStationChange} value={selectedStation}>
            {deviceSet.stations.map((st: IStation) => (
              <option key={st.id} value={st.id}>
                {st.name}
              </option>
            ))}
          </Select>
          <Select onChange={handleDivisionChange} value={selectedDivision}>
            {deviceSet.divisions.filter((item) => item.stationId === selectedStation).map(
              (div: IDivision) => (
                <option key={div.id} value={div.id}>
                  {div.name}
                </option>
              )
            )}
          </Select>
          <TitleInput type="text" onChange={handleNameChange} value={deviceName} />
        </Row>
      </InnerDiv>
      {renderSection(id, "V", ["R-S", "S-T", "T-R", "R", "S", "T", "PF", "Hz", "kW"])}
    </Container>
  );
};

const Container = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: stretch;
`;

const Row = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
  margin-bottom: 10px;
`;

const InnerDiv = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
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
  max-width: 70px;
`;

const TitleInput = styled.input`
  margin: 0px 30px;
  font-size: 1em;
`;

const Select = styled.select`
  margin: 0px 10px;
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
