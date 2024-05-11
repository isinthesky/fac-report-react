import React, {useEffect, useState} from "react";
import { DeviceSelectProps, IDevice, IDivision, IStation } from "../../../static/types";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { BaseFlex1Row, BaseOption, BaseSelect } from "../../../static/componentSet";
import { updateCurrentUnitDevice, updateFromCurrent } from "../../../features/reducers/unitGroupSlice";
import { useSelector } from "react-redux";
import { RootStore } from "../../../store/congifureStore";
import {COLORSET_DARK_CONTROL_FONT, COLORSET_DARK_CONTROL_BG} from "../../../static/colorSet"


const UnitGroupAutoSelect: React.FC<DeviceSelectProps> = ({
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

  const handleStationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStation(Number(e.target.value));
  };

  const handleDivisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDivision(Number(e.target.value));
  };

  const handleDeviceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("handleDeviceChange", e.target.value);
    setSelectedDevice(Number(e.target.value));    
    dispatch(updateCurrentUnitDevice({ unitPosition, 
                                       devicePosition, 
                                       deviceId: Number(e.target.value) }));

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
          .filter((div: IDivision) => div.stationId === selectedSt)
          .map((div: IDivision) => (
            <BaseOption key={div.id} value={div.id}>
              {div.name}
            </BaseOption>)
          )}
      </SelectDivision> 
      <SelectDevice onChange={handleDeviceChange} value={selectedDevice}>
        {selectedDevice === 0 
          ? ( searchWord.length > 0
              ? null
              : <BaseOption key={selectedDevice} value={selectedDevice}>
                  Select a device
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
            return true;})
          .map((dev: IDevice) => (
            <BaseOption key={dev.id} value={dev.id}>
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
  min-width: 70px;
  text-align: center;
  color: ${COLORSET_DARK_CONTROL_FONT};
  background-color: ${COLORSET_DARK_CONTROL_BG};
`

const SelectDevice = styled(BaseSelect)`
  flex: 1;
  min-width: 200px;
  text-align: center;
  color: ${COLORSET_DARK_CONTROL_FONT};
  background-color: ${COLORSET_DARK_CONTROL_BG};
`

export default UnitGroupAutoSelect;
