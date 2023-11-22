import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { IStation, IDivision } from "../../../static/types";
import { RootStore } from "../../../store/congifureStore";
import { BaseButton, BaseFlexColumn, BaseOption, BaseFlexRow, BaseSelect } from "../../../static/styledComps";
import UnitGroupAutoSelect from "./UnitGroupAutoSelect";


const SetDeviceType: React.FC = () => {
  const deviceSet = useSelector((state: RootStore) => state.deviceReducer);
  const currentGroup = useSelector((state: RootStore) => state.unitGroupReducer.currentGroup);


  const [selectedStation, setSelectedStation] = useState<number>(deviceSet.stations[0].id);
  const [selectedDivision, setSelectedDivision] = useState<number>(deviceSet.divisions[0].id);

  console.log("currentGroup", currentGroup)

  const handleStationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStation(Number(e.target.value));
  };

  const handleDivisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDivision(Number(e.target.value));
  };

  const renderSection = (index1: number, values: number[]) => (
    <BaseFlexColumn>
     {values.map((value, idx) => (
      <ValueSection key={idx}>
        <ValueColumn>{idx + 1}</ValueColumn>
        <UnitGroupAutoSelect
          pos={index1}
          devicelist={deviceSet}
          initStationId={selectedStation}
          initDivisionId={selectedDivision}
          currentGroup={currentGroup} // Pass the currentGroup here
        />
      </ValueSection>
    ))}
    </BaseFlexColumn>
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
      { renderSection(0, currentGroup.dvList)}
    </Container>
  );
};

const Container = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: stretch;
  border: 1px solid #ccc;
`;


const CenterRow = styled(BaseFlexRow)`
  justify-content: center;
  align-items: stretch;

  bottom-margin: 10px;
`;


const ValueColumn = styled(BaseButton)`
  border: 1px solid #ccc;
  max-width: 70px;
`;


const ValueSection = styled(BaseFlexRow)`
  margin: 10px;
`;

export default SetDeviceType;
