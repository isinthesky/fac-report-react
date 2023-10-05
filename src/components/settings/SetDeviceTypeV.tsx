import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import DeviceAutoSelect from "./DeviceAutoSelect";
import { IStation, IDivision, SetDeviceType } from "../../static/types";
import { useDispatch } from "react-redux";
import { updateCurrentDevice } from "../../features/reducers/optionSlice";
import optionSlice from "../../features/reducers/optionSlice";

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

const SetDeviceTypeV: React.FC<SetDeviceType> = ({ id }) => {
  const dispatch = useDispatch();
  const deviceSet = useSelector(
    (state: RootState) => state.deviceReducer.value
  );

  const optionlist = useSelector(
    (state: optionState) => state.optionReducer.value
  );

  const [selectedStation, setSelectedStation] = useState<number>(0);
  const [selectedDivision, setSelectedDivision] = useState<number>(0);

  const handleStationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStation(Number(e.target.value));
  };

  const handleDivisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDivision(Number(e.target.value));
  };

  console.log("optionSet", optionlist);

  const renderSection = (typeDev: string, values: string[]) => (
    <Section>
      <MiddleColumn>{typeDev}</MiddleColumn>
      {values.map((value, idx) => (
        <ValueSection key={idx}>
          <ValueColumn>{value}</ValueColumn>
          <DeviceAutoSelect
            station={selectedStation}
            division={selectedDivision}
            devicelist={deviceSet}
            type={typeDev}
            valueType={value}
            onDeviceChange={(type1, type2, deviceId) => {
              console.log(
                "Selected device ID in parent:",
                id,
                type1,
                type2,
                deviceId
              );

              dispatch(
                updateCurrentDevice({
                  idx: id,
                  type1: type1,
                  type2: type2,
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
      <Row>
        <InnerDiv>
          <TitleColumn>{"NAME"}</TitleColumn>
          <Row>
            <Select onChange={handleStationChange} value={selectedStation}>
              {deviceSet.stations.map((st: IStation) => (
                <option key={st.id} value={st.id}>
                  {st.name}
                </option>
              ))}
            </Select>
            <Select onChange={handleDivisionChange} value={selectedDivision}>
              {deviceSet.divisions.map((div: IDivision) => (
                <option key={div.id} value={div.id}>
                  {div.name}
                </option>
              ))}
            </Select>
            <TitleInput type="text" />
          </Row>
        </InnerDiv>
      </Row>
      {renderSection("V", ["dv1", "dv2", "dv3"])}
      {renderSection("A", ["dv4", "dv5", "dv6"])}
      {renderSection("ETC", ["dv7", "dv8", "dv9"])}
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
