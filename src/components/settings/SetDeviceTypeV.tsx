import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { IStation, IDivision, SetDeviceType } from "../../static/types";
import DeviceAutoSelect from "./DeviceAutoSelect";
import { updateCurrentDevice } from "../../features/reducers/optionSlice";

interface RootState {
  deviceReducer: {
    value: any;
  };
}

interface optionState {
  optionReducer: {
    value: any;
  };
}

const SetDeviceTypeV: React.FC<SetDeviceType> = ({ id, device }) => {
  const dispatch = useDispatch();
  const deviceSet = useSelector(
    (state: RootState) => state.deviceReducer.value
  );

  const optionlist = useSelector(
    (state: optionState) => state.optionReducer.value
  );

  const [selectedStation, setSelectedStation] = useState<number>(optionlist.currentDevice[id].st);
  const [selectedDivision, setSelectedDivision] = useState<number>(optionlist.currentDevice[id].div);
  const [deviceName, setDeviceName] = useState<string>(optionlist.currentDevice[id].name);

  const handleStationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("st", e.target.value, id)
    setSelectedStation(Number(e.target.value));
    dispatch(
      updateCurrentDevice({
        arrPos: id,
        arrKey: "st",
        deviceId: Number(e.target.value),
      })
    );
  };

  const handleDivisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("div", e.target.value)
    setSelectedDivision(Number(e.target.value));
    dispatch(
      updateCurrentDevice({
        arrPos: id,
        arrKey: "div",
        deviceId: Number(e.target.value),
      })
    );
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeviceName(e.target.value);
    dispatch(
      updateCurrentDevice({
        arrPos: id,
        arrKey: "name",
        deviceId: e.target.value,
      })
    );
  };

  console.log("optionSet", optionlist);

  const renderSection = (index1: number, typeDev: string, values: string[]) => (
    <Section>
      <MiddleColumn>{typeDev}</MiddleColumn>
      {values.map((value, idx) => (
        <ValueSection key={idx}>
          <ValueColumn>{value}</ValueColumn>
          <DeviceAutoSelect
            id={idx}
            devicelist={deviceSet}
            station={selectedStation}
            stationValue={device.st}
            division={selectedDivision}
            divisionValue={device.div}
            currentDevice={optionlist.currentDevice}
            onDeviceChange={(id, deviceId) => {
              console.log(
                "Selected device ID in parent:",
                id,
                deviceId
              );

              dispatch(
                updateCurrentDevice({
                  arrPos: index1,
                  arrKey: `dv${String(id+1)}` ,
                  deviceId: deviceId,
                })
              );
            }}
          />
        </ValueSection>
      ))}
    </Section>
  );

  return (
    <Container>
        <InnerDiv>
          <TitleColumn>{"NAME"}</TitleColumn>
          <Row>
            <Select onChange={handleStationChange} value={device.st}>
              {deviceSet.stations.map((st: IStation) => (
                <option key={st.id} value={st.id}>
                  {st.name}
                </option>
              ))}
            </Select>
            <Select onChange={handleDivisionChange} value={device.div}>
              {deviceSet.divisions.map((div: IDivision) => (
                <option key={div.id} value={div.id}>
                  {div.name}
                </option>
              ))}
            </Select>
            <TitleInput type="text" onChange={handleNameChange}  value={deviceName} />
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

const TitleColumn = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px;
  border: 1px solid #ccc;
`;

const TitleInput = styled.input`
  margin: 0px 30px;
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

const Select = styled.select`
  margin: 0 10px;
`;

const Section = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ValueSection = styled(Row)``;

export default SetDeviceTypeV;
