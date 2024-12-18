import React, { useEffect, useState } from "react";
import { IDivision, IStation, IDevice, DeviceSelectProps, Item } from "@/types/types";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUnitDevice } from "@/entities/reducers/tabPageSlice";
import { BaseOption, BaseFlex1Row, BaseSelect } from "@/static/componentSet";
import { RootStore } from "@/store/congifureStore";
import { COLORSET_DARK_CONTROL_BG, COLORSET_DARK_CONTROL_FONT } from "@/static/colorSet";
import { STRING_SETTING_DEVICE_FOUND, STRING_SETTING_DEVICE_SELECT } from "@/static/langSet";


const DeviceAutoSelect: React.FC<DeviceSelectProps> = ({
  unitPosition,
  devicePosition,
  devicelist,
  initStationId,
  initDivisionId,
  currentDevice,
}) => {
  const dispatch = useDispatch();
  const [selectedSt, setSelectedStation] = useState<number>(initStationId);
  const [selectedDiv, setSelectedDivision] = useState<number>(initDivisionId);
  const [selectedDevice, setSelectedDevice] = useState<Item | null>(currentDevice);
  const [searchedNumber, setSearchedNumber] = useState<number>(0);
  const searchWord = useSelector((state: RootStore) => state.settingReducer.deviceSearchWord);

  useEffect(() => {
    setSelectedStation( (initStationId === 0) 
                        ? devicelist.stations[0].id
                        : initStationId);
  }, [initStationId, devicelist.stations]);

  useEffect(() => {
    setSelectedDivision( (currentDevice.path_id === 0) 
                         ? initDivisionId
                         : devicelist.devices[currentDevice.path_id].division_id);
  }, [initDivisionId, devicelist.devices]);

  useEffect(() => {
    setSelectedDevice(currentDevice)
  }, [selectedDiv, currentDevice]);

  useEffect(() => {
    setSelectedDevice(currentDevice);
  }, [currentDevice]);

  useEffect(() => {
    const size = Object.values(devicelist.devices)
      .filter((dev: IDevice) =>
        dev.station_id === selectedSt && dev.division_id === selectedDiv)
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
    if (selectedDevice) {
      const updatedDevice: Item = {
        ...selectedDevice,
        station_id: Number(e.target.value),
        id: selectedDevice.id || 0
      };
      setSelectedDevice(updatedDevice);
    }
  };

  const handleDivisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDivision(Number(e.target.value));
    if (selectedDevice) {
      const updatedDevice: Item = {
        ...selectedDevice,
        division_id: Number(e.target.value),
        id: selectedDevice.id || 0
      };
      setSelectedDevice(updatedDevice);
    }
  };
  
  const handleDeviceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (selectedDevice) {
      const newPathId = Number(e.target.value);
      const updatedDevice = { ...selectedDevice, 
                              path_id: newPathId,
                              station_id: selectedSt,
                              division_id: selectedDiv,
                              id: selectedDevice.id || 0,
                              decimal_part_digits: selectedDevice.decimal_part_digits || 1 };
      setSelectedDevice(updatedDevice);    
  
      dispatch(setCurrentUnitDevice({ 
        unitPosition, 
        devicePosition, 
        device: updatedDevice 
      }));
    }
  };

  const handleDeviceDigitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (selectedDevice) {
      const updatedDevice: Item = { ...selectedDevice, decimal_part_digits: Number(e.target.value) };
      setSelectedDevice(updatedDevice);

      dispatch(setCurrentUnitDevice({ 
        unitPosition, 
        devicePosition, 
        device: updatedDevice
      }));
    }
  };

  return (
    <DeviceInfoContainer>
      {selectedDevice && (
        <>
        <DivisionSelector onChange={handleStationChange} value={selectedSt}>
        {devicelist.stations.map((st: IStation) => (
          <BaseOption key={st.id} value={st.id}>
            {st.name}
          </BaseOption>
        ))}
      </DivisionSelector>
      <DivisionSelector onChange={handleDivisionChange} value={selectedDiv}>
        {devicelist.divisions
          .filter((div: IDivision) => div.station_id === selectedSt)
          .map((div: IDivision) => (
            <BaseOption key={div.id} value={div.id}>
              {div.name}
            </BaseOption>
          ))}
      </DivisionSelector>
      <DeviceSelector onChange={handleDeviceChange} value={selectedDevice?.path_id}>
        {(selectedDevice?.path_id === 0)
          ? (searchWord.length > 0)
            ? <BaseOption key={selectedDevice?.path_id} value={selectedDevice?.path_id}>
                {searchedNumber} {STRING_SETTING_DEVICE_FOUND}
              </BaseOption>
            : <BaseOption key={selectedDevice?.path_id} value={selectedDevice?.path_id}>
                {STRING_SETTING_DEVICE_SELECT}
              </BaseOption>
          : <BaseOption key={selectedDevice?.path_id} value={selectedDevice?.path_id}>
              {selectedDevice?.path_id !== undefined && devicelist.devices[selectedDevice.path_id]?.name}
            </BaseOption>}

        {Object.values(devicelist.devices)
          .filter(
            (dev: IDevice) =>
              dev.station_id === selectedSt && dev.division_id === selectedDiv)
          .filter((dev:IDevice) => {
            if (searchWord.length > 0) {
              return (dev.name.toLowerCase().includes(searchWord.toLowerCase())
                      ? true : false);
            }
            return true;
          })
          .map((dev: IDevice) => (
            <BaseOption key={dev.path_id} value={dev.path_id}>
              {dev.name}
            </BaseOption>
          ))}
          </DeviceSelector>
        </>
      )}

      <DeviceDigitSelector onChange={handleDeviceDigitChange} value={selectedDevice?.decimal_part_digits}>
        <BaseOption value={0}>0</BaseOption>
        <BaseOption value={1}>1</BaseOption>
        <BaseOption value={2}>2</BaseOption>
        <BaseOption value={3}>3</BaseOption>
      </DeviceDigitSelector>
      
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
  flex: 2;
  min-width: 70px;
  text-align: center;
  color: ${COLORSET_DARK_CONTROL_FONT};
  background-color: ${COLORSET_DARK_CONTROL_BG};
`;

const DeviceSelector = styled(BaseSelect)`
  flex: 5;
  width: 100%;
  text-align: center;
  color: ${COLORSET_DARK_CONTROL_FONT};
  background-color: ${COLORSET_DARK_CONTROL_BG};
`;

const DeviceDigitSelector = styled(BaseSelect)`
  flex: 1;
  min-width: 70px;
  text-align: center;
  color: ${COLORSET_DARK_CONTROL_FONT};
  background-color: ${COLORSET_DARK_CONTROL_BG};
`;

export default DeviceAutoSelect;
