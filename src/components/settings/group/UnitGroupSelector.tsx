import React, {useEffect, useState} from "react";
import { DeviceSelectProps, IDevice, IDivision, IStation, Item } from "@/types/types";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { BaseFlex1Row, BaseOption, BaseSelect } from "@/static/componentSet";
import { updateCurrentUnitDevice, updateFromCurrent } from "@/entities/reducers/unitGroupSlice";
import { useSelector } from "react-redux";
import { RootStore } from "@/store/congifureStore";
import {COLORSET_DARK_CONTROL_FONT, COLORSET_DARK_CONTROL_BG} from "@/static/colorSet"
import { STRING_SETTING_DEVICE_FOUND, STRING_SETTING_DEVICE_SELECT } from "@/static/langSet";


const UnitGroupAutoSelect: React.FC<DeviceSelectProps> = ({
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
  }, [initStationId]);

  useEffect(() => {
    setSelectedDivision( (currentDevice.path_id === 0) 
                         ? initDivisionId
                         : currentDevice.division_id);
  }, [initDivisionId]);

  useEffect(() => {
    setSelectedDevice(currentDevice)
  }, [selectedDiv]);

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

  useEffect(() => {
    setSelectedDevice(currentDevice);
  }, [currentDevice]);

  const handleStationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStation(Number(e.target.value));
  };

  const handleDivisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDivision(Number(e.target.value));
  };

  const handleDeviceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (selectedDevice) {
      const newPathId = Number(e.target.value);
      const updatedDevice = { ...selectedDevice, path_id: newPathId, station_id: selectedSt, division_id: selectedDiv };
      setSelectedDevice(updatedDevice);    
  
      dispatch(updateCurrentUnitDevice({ 
        unitPosition, 
        devicePosition, 
        device: updatedDevice 
      }));
    }
    
    dispatch(updateFromCurrent(unitPosition));
  };
  
  return (
    <DeviceContainer>
      <SelectDivision onChange={handleStationChange} value={selectedSt}>
        {devicelist.stations.map((st: IStation) => (
          <BaseOption key={st.id} value={st.id}>
            {st.name}
          </BaseOption>
        ))}
      </SelectDivision>
      <SelectDivision onChange={handleDivisionChange} value={selectedDiv}>
        {devicelist.divisions
          .filter((div: IDivision) => div.station_id === selectedSt)
          .map((div: IDivision) => (
            <BaseOption key={div.id} value={div.id}>
              {div.name}
            </BaseOption>)
          )}
      </SelectDivision> 
      <SelectDevice onChange={handleDeviceChange} value={selectedDevice?.path_id}>
      {selectedDevice?.path_id === 0 
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
            return true;})
          .map((dev: IDevice) => (
            <BaseOption key={dev.path_id} value={dev.path_id}>
              {dev.name}
            </BaseOption>
          ))}
      </SelectDevice>
    </DeviceContainer>
  );
};

const DeviceContainer = styled(BaseFlex1Row)`
  justify-content: center;
  align-items: stretch;
  text-align: center;
`;

const SelectDivision = styled(BaseSelect)`
  flex: 1;
  min-width: 70px;
  text-align: center;
  color: ${COLORSET_DARK_CONTROL_FONT};
  background-color: ${COLORSET_DARK_CONTROL_BG};
`

const SelectDevice = styled(BaseSelect)`
  flex: 3;
  min-width: 200px;
  text-align: center;
  color: ${COLORSET_DARK_CONTROL_FONT};
  background-color: ${COLORSET_DARK_CONTROL_BG};
`

export default UnitGroupAutoSelect;
