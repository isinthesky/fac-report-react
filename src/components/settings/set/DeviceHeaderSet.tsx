
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { updateCurrentUnit } from "../../../features/reducers/tabPageSlice";
import { RootStore } from "../../../store/congifureStore";
import { BaseInput, BaseSelect, BaseOption, BaseFlex1Column, BaseFlex1Row, BaseLabel, BaseButton, ControlButton, MiniButton } from "../../../static/componentSet";
import { IDivision, IStation } from "../../../static/types";

const DeviceHeaderSet = () => {
  const dispatch = useDispatch();
  const deviceSet = useSelector((state: RootStore) => state.deviceReducer);
  const tabPageSlice = useSelector((state: RootStore) => state.tabPageReducer);
  const [deviceType, setDeviceType] = useState(tabPageSlice.currentTabPage.unitList[tabPageSlice.unitPosition.index].type);
  const [selectedStation, setSelectedStation] = useState<number>(tabPageSlice.currentTabPage.unitList[tabPageSlice.unitPosition.index].st);
  const [selectedDivision, setSelectedDivision] = useState<number>(tabPageSlice.currentTabPage.unitList[tabPageSlice.unitPosition.index].div);
  const [deviceName, setDeviceName] = useState<string>(tabPageSlice.currentTabPage.unitList[tabPageSlice.unitPosition.index].name);

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = Number(e.target.value);
    setDeviceType(newType);
    dispatch(updateCurrentUnit({arrPos:tabPageSlice.unitPosition.index,
        arrKey:"type",
        deviceId: newType
    }));
  };

  const handleStationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStation(Number(e.target.value));
    dispatch(
      updateCurrentUnit({
        arrPos: tabPageSlice.unitPosition.index,
        arrKey: "st",
        deviceId: Number(e.target.value),
      })
    );
  };

  const handleDivisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDivision(Number(e.target.value));
    dispatch(
      updateCurrentUnit({
        arrPos: tabPageSlice.unitPosition.index,
        arrKey: "div",
        deviceId: Number(e.target.value),
      })
    );
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeviceName(e.target.value);
    dispatch(
      updateCurrentUnit({
        arrPos: tabPageSlice.unitPosition.index,
        arrKey: "name",
        deviceId: e.target.value,
      })
    );
  };

  return (
    <Container>
      <BaseFlex1Column>
        <BaseFlex1Row>
          <NameButton>Name</NameButton>
          <BaseInput type="text" onChange={handleNameChange} value={deviceName} />
          <NameButton>Type</NameButton>
          <BaseSelect onChange={handleTypeChange} value={deviceType}>
            <BaseOption value={1}>Type 1</BaseOption>
            <BaseOption value={2}>Type 2</BaseOption>
          </BaseSelect>
        </BaseFlex1Row>
        <BaseFlex1Row>
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
        </BaseFlex1Row>
      </BaseFlex1Column>
    </Container>
  );
};

const Container = styled(BaseFlex1Column)`
  justify-content : end;
  gap: 10px;

  border: 1px solid #ccc;
`;

const NameButton = styled(MiniButton)`

  border: 0px solid #ccc;
`

export default DeviceHeaderSet;