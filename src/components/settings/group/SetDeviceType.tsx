import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { IStation, IDivision } from "../../../static/types";
import { RootStore } from "../../../store/congifureStore";
import { BaseButton, BaseColumn, BaseOption, BaseRow, BaseSelect } from "../../../static/styledComps";
import UnitGroupAutoSelect from "./UnitGroupAutoSelect";


const SetDeviceType: React.FC = () => {
  const dispatch = useDispatch();
  const deviceSet = useSelector((state: RootStore) => state.deviceReducer);

  const [selectedStation, setSelectedStation] = useState<number>(0);
  const [selectedDivision, setSelectedDivision] = useState<number>(0);

  const handleStationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStation(Number(e.target.value));
  };

  const handleDivisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDivision(Number(e.target.value));
  };

  const renderSection = (index1: number, values: string[]) => (
    <BaseColumn>
      {values.map((value, idx) => {
        return(
        <ValueSection key={idx}>
          <ValueColumn>{value}</ValueColumn>
          <UnitGroupAutoSelect
            pos={index1}
            devicelist={deviceSet}
            initStationId={selectedStation}
            stationValue={selectedStation}
            initDivisionId={selectedDivision}
            divisionValue={selectedDivision}
          />
        </ValueSection>
      )}
      )}
    </BaseColumn>
  );

  return (
    <Container>
      <CenterRow>
        <BaseSelect onChange={handleStationChange} value={selectedStation}>
          {deviceSet.stations.map((st: IStation) => (
            <BaseOption key={st.id} value={st.id}>
              {st.name}
            </BaseOption>
          ))}
        </BaseSelect>
        <BaseSelect onChange={handleDivisionChange} value={selectedDivision}>
          {deviceSet.divisions.filter((item) => item.stationId === selectedStation).map(
            (div: IDivision) => (
              <BaseOption key={div.id} value={div.id}>
                {div.name}
              </BaseOption>
            )
          )}
        </BaseSelect>
      </CenterRow>
      {renderSection(0, ["dv1", "dv2", "dv3", "dv4", "dv5", "dv6", "dv7", "dv8", "dv9"])}
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


const CenterRow = styled(BaseRow)`
  justify-content: center;
  align-items: stretch;

  bottom-margin: 10px;
`;


const ValueColumn = styled(BaseButton)`
  border: 1px solid #ccc;
  max-width: 70px;
`;


const ValueSection = styled(BaseRow)`
  margin: 10px;
`;

export default SetDeviceType;
