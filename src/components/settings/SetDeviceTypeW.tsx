import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { IStation, IDivision, SetDeviceType } from "../../static/types";
import DeviceAutoSelect from "./DeviceAutoSelect";
import { updateCurrentDevice } from "../../features/reducers/optionSlice";
import { RootState, optionState } from "../../static/interface";


const SetDeviceTypeW: React.FC<SetDeviceType> = ({ id, device }) => {
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
            pos={index1}
            devKey={`dv${String(idx+1)}`}
            devicelist={deviceSet}
            initStationId={selectedStation}
            stationValue={device.st}
            initDivisionId={selectedDivision}
            divisionValue={device.div}
            currentDevice={optionlist.currentDevice[id]}
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
      {renderSection(id, "W", ["R-S", "S-T", "T-R", "R", "S", "T", "PF", "Hz", "kW"])}
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

export default SetDeviceTypeW;