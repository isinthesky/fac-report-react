import React, { useEffect, useState } from "react";
import { IDivision, IStation, IDevice, DeviceSelectProps } from "../../../static/types";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUnitDevice } from "../../../features/reducers/tabPageSlice";
import { BaseOption, BaseFlex1Row, BaseSelect } from "../../../static/componentSet";
import { RootStore } from "../../../store/congifureStore";
import { COLORSET_DARK_CONTROL_BG, COLORSET_DARK_CONTROL_FONT } from "../../../static/colorSet";
import { STRING_SETTING_DEVICE_FOUND, STRING_SETTING_DEVICE_SELECT } from "../../../static/langSet";


const DeviceAutoSelect: React.FC<DeviceSelectProps> = ({
  unitPosition,
  devicePosition,
  devicelist,
  initStationId,
  initDivisionId,
  currentDeviceId,
}) => {
  const dispatch = useDispatch();
  const [selectedSt, setSelectedStation] = useState<number>(initStationId);
  const [selectedDiv, setSelectedDivision] = useState<number>(initDivisionId);
  const [selectedDevice, setSelectedDevice] = useState<number>(currentDeviceId);
  const [searchedNumber, setSearchedNumber] = useState<number>(0);
  const searchWord = useSelector((state: RootStore) => state.settingReducer.deviceSearchWord);

  useEffect(() => {
    setSelectedStation( (initStationId === 0) 
                        ? devicelist.stations[0].id
                        : initStationId);
  }, [initStationId]);

  useEffect(() => {
    setSelectedDivision( (currentDeviceId === 0) 
                         ? initDivisionId
                         : devicelist.devices[currentDeviceId].divisionId);
  }, [initDivisionId]);

  useEffect(() => {
    if (currentDeviceId === 0) {
      setSelectedDevice(0); 
      return;
    }

    setSelectedDevice(currentDeviceId)
  }, [selectedDiv]);

  useEffect(() => {
    const size = Object.values(devicelist.devices)
      .filter((dev: IDevice) =>
        dev.stationId === selectedSt && dev.divisionId === selectedDiv)
      .filter((dev:IDevice) => {
        if (searchWord.length > 0) {
          return (dev.name.toLowerCase().includes(searchWord.toLowerCase())
                  ? true : false);
        }
        return true;
      })
      setSearchedNumber(size.length);
    }, [searchWord]);


  const handleStationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStation(Number(e.target.value));
  };

  const handleDivisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDivision(Number(e.target.value));
  };

  const handleDeviceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDevice(Number(e.target.value));    
    dispatch(setCurrentUnitDevice({ unitPosition, 
                                    devicePosition, 
                                    deviceId: Number(e.target.value) }));
  };

  return (
    <DeviceInfoContainer>
      <DivisionSelector onChange={handleStationChange} value={selectedSt}>
        {devicelist.stations.map((st: IStation) => (
          <BaseOption key={st.id} value={st.id}>
            {st.name}
          </BaseOption>
        ))}
      </DivisionSelector>
      <DivisionSelector onChange={handleDivisionChange} value={selectedDiv}>
        {devicelist.divisions
          .filter((div: IDivision) => div.stationId === selectedSt)
          .map((div: IDivision) => (
            <BaseOption key={div.id} value={div.id}>
              {div.name}
            </BaseOption>
          ))}
      </DivisionSelector>
      <DeviceSelector onChange={handleDeviceChange} value={selectedDevice}>

        {selectedDevice === 0 
          ? (searchWord.length > 0
              ? <BaseOption key={selectedDevice} value={selectedDevice}>
                  {searchedNumber} {STRING_SETTING_DEVICE_FOUND}
                </BaseOption>
              : <BaseOption key={selectedDevice} value={selectedDevice}>
                  {STRING_SETTING_DEVICE_SELECT}
                </BaseOption>)
          : <BaseOption key={selectedDevice} value={selectedDevice}>
              {devicelist.devices[selectedDevice.toString()]?.name}
            </BaseOption>}

        {Object.values(devicelist.devices)
          .filter(
            (dev: IDevice) =>
              dev.stationId === selectedSt && dev.divisionId === selectedDiv)
          .filter((dev:IDevice) => {
            if (searchWord.length > 0) {
              return (dev.name.toLowerCase().includes(searchWord.toLowerCase())
                      ? true : false);
            }
            return true;
          })
          .map((dev: IDevice) => (
            <BaseOption key={dev.id} value={dev.id}>
              {dev.name}
            </BaseOption>
          ))}
      </DeviceSelector>
    </DeviceInfoContainer>
  );
};

const DeviceInfoContainer = styled(BaseFlex1Row)`
  justify-content: center;
  align-items: stretch;
  text-align: center;
  background-color: transparent;
`;

const DivisionSelector = styled(BaseSelect)`
  flex: 1;
  min-width: 70px;
  text-align: center;
  color: ${COLORSET_DARK_CONTROL_FONT};
  background-color: ${COLORSET_DARK_CONTROL_BG};
`;

const DeviceSelector = styled(BaseSelect)`
  flex: 3;
  width: 100%;
  text-align: center;
  color: ${COLORSET_DARK_CONTROL_FONT};
  background-color: ${COLORSET_DARK_CONTROL_BG};
`;

export default DeviceAutoSelect;
