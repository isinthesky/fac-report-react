import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { IStation, IDivision, Unit } from "../../../static/types";
import { RootStore } from "../../../store/congifureStore";
import { BaseButton, BaseFlex1Column, BaseOption, BaseFlex1Row, BaseSelect, ControlButton } from "../../../static/componentSet";
import UnitGroupAutoSelect from "../group/UnitGroupSelector";
import { updateCurrentGroup } from "../../../features/reducers/unitGroupSlice";


const DeviceType1234: React.FC = () => {
  const dispatch = useDispatch();
  const deviceSet = useSelector((state: RootStore) => state.deviceReducer);
  const currentGroup = useSelector((state: RootStore) => state.unitGroupReducer.currentGroup);


  const [selectedStation, setSelectedStation] = useState<number>(currentGroup.st);
  const [selectedDivision, setSelectedDivision] = useState<number>(currentGroup.div);

  console.log("currentGroup", currentGroup)

  const handleStationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStationId = Number(e.target.value);
    setSelectedStation(newStationId);

    const updatedCurrentGroup = { ...currentGroup, st: newStationId };
    dispatch(updateCurrentGroup(updatedCurrentGroup))
  };

  const handleDivisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSDivisionId = Number(e.target.value);
    setSelectedDivision(newSDivisionId);

    const updatedCurrentGroup = { ...currentGroup, div: newSDivisionId };
    dispatch(updateCurrentGroup(updatedCurrentGroup))
  };

  const renderSection = (index1: number, unit: Unit) => (
    <BaseFlex1Column>
     {unit.dvList.map((value: number, idx: number) => (
        <ValueSection key={idx}>
          <ControlButton>{idx + 1}</ControlButton>
          <UnitGroupAutoSelect
            unitPosition={0}
            devicePosition={idx}
            initStationId={unit.st}
            initDivisionId={unit.div}
            devicelist={deviceSet}
            stationValue={unit.st}
            divisionValue={unit.div}
            currentDeviceId={value}
          />
        </ValueSection>
      ))}
    </BaseFlex1Column>
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
      { renderSection(0, currentGroup)}
    </Container>
  );
};

const Container = styled(BaseFlex1Column)`
  justify-content: center;
  align-items: stretch;
  border: 1px solid #ccc;
`;


const CenterRow = styled(BaseFlex1Row)`
  justify-content: center;
  align-items: stretch;

  bottom-margin: 10px;
`;


const ValueColumn = styled(ControlButton)`
  border: 1px solid #ccc;
  max-width: 70px;
`;


const ValueSection = styled(BaseFlex1Row)`
  margin: 10px;
`;

export default DeviceType1234;
