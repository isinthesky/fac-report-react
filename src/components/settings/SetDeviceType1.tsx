import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Device from "./Device";
import { IStation, IDivision } from "../../features/types";
import DeviceAutoSelect from "./DeviceAutoSelect";

interface RootState {
  deviceReducer: {
    value: any;
  };
}

const SetDeviceType1: React.FC = () => {
  const devicelist = useSelector(
    (state: RootState) => state.deviceReducer.value
  );

  const [selectedStation, setSelectedStation] = useState<number>(0);
  const [selectedDivision, setSelectedDivision] = useState<number>(0);

  const handleStationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStation(Number(e.target.value));
    console.log("Selected Station:", e.target.value);
  };

  const handleDivisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDivision(Number(e.target.value));
    console.log("Selected Division:", e.target.value);
  };

  return (
    <Container2>
      <Row3 key="r01">
        <InnerDiv1>
          <TitleColumn key="c01">{"NAME"}</TitleColumn>
          <Row2 key="r03">
            <select onChange={handleStationChange} value={selectedStation}>
              {devicelist.stations.map((st: IStation, index: number) => (
                <option key={index} value={st.id ? st.id : 0}>
                  {st.name}
                </option>
              ))}
            </select>
            <select onChange={handleDivisionChange} value={selectedDivision}>
              {devicelist.divisions.map((div: IDivision, index: number) => {
                if (div.stationId === selectedStation) {
                  return (
                    <option key={index} value={div.id ? div.id : 0}>
                      {div.name}
                    </option>
                  );
                }
              })}
            </select>
            <TitleInput type="text"></TitleInput>
          </Row2>
        </InnerDiv1>
      </Row3>
      <Row3 key="r02">
        <InnerDiv1>
          <Row2 key="r03">
            <MiddleColumn key="c11">{"KV"}</MiddleColumn>
          </Row2>
          <Row2 key="r04">
            <InnerDiv1>
              <ValueColumn key="c11">{"R-S"}</ValueColumn>
              <DeviceAutoSelect
                devicelist={devicelist}
                station={selectedStation}
                division={selectedDivision}
              />
            </InnerDiv1>
            <InnerDiv1>
              <ValueColumn key="c12">{"S-T"}</ValueColumn>
              <DeviceAutoSelect
                devicelist={devicelist}
                station={selectedStation}
                division={selectedDivision}
              />
            </InnerDiv1>
            <InnerDiv1>
              <ValueColumn key="c13">{"T-R"}</ValueColumn>
              <DeviceAutoSelect
                devicelist={devicelist}
                station={selectedStation}
                division={selectedDivision}
              />
            </InnerDiv1>
          </Row2>
        </InnerDiv1>
      </Row3>
      <Row3>
        <InnerDiv1>
          <Row2 key="r03">
            <MiddleColumn key="c21">{"A"}</MiddleColumn>
          </Row2>
          <Row2 key="r04">
            <InnerDiv1>
              <ValueColumn key="c21">{"R-S"}</ValueColumn>
              <DeviceAutoSelect
                devicelist={devicelist}
                station={selectedStation}
                division={selectedDivision}
              />
            </InnerDiv1>
            <InnerDiv1>
              <ValueColumn key="c22">{"S-T"}</ValueColumn>
              <DeviceAutoSelect
                devicelist={devicelist}
                station={selectedStation}
                division={selectedDivision}
              />
            </InnerDiv1>
            <InnerDiv1>
              <ValueColumn key="c23">{"T-R"}</ValueColumn>
              <DeviceAutoSelect
                devicelist={devicelist}
                station={selectedStation}
                division={selectedDivision}
              />
            </InnerDiv1>
          </Row2>
        </InnerDiv1>
      </Row3>
      <Row3>
        <InnerDiv1>
          <Row2 key="r03">
            <MiddleColumn key="c21">{"ETC"}</MiddleColumn>
          </Row2>
          <Row2 key="r04">
            <InnerDiv1>
              <ValueColumn key="c32">{"PF"}</ValueColumn>{" "}
              <DeviceAutoSelect
                devicelist={devicelist}
                station={selectedStation}
                division={selectedDivision}
              />
            </InnerDiv1>
            <InnerDiv1>
              <ValueColumn key="c34">{"Hz"}</ValueColumn>{" "}
              <DeviceAutoSelect
                devicelist={devicelist}
                station={selectedStation}
                division={selectedDivision}
              />
            </InnerDiv1>
            <InnerDiv1>
              <ValueColumn key="c36">{"kW"}</ValueColumn>{" "}
              <DeviceAutoSelect
                devicelist={devicelist}
                station={selectedStation}
                division={selectedDivision}
              />
            </InnerDiv1>
          </Row2>
        </InnerDiv1>
      </Row3>
    </Container2>
  );
};

const Container2 = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: stretch;
`;

const Row2 = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
`;

const Row3 = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
  margin-bottom: 10px;
`;

const InnerDiv1 = styled.div`
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
  align-items: stretch;
  justify-content: center;

  padding: 3px;
  border: 1px solid #ccc;
`;

const ValueColumn = styled.div`
  flex: 1;
  display: flex;
  align-items: stretch;
  justify-content: center;

  padding: 3px;
  border: 1px solid #ccc;

  min-width: 20px;
`;

export default SetDeviceType1;
