import React, {useEffect, useState} from "react";
import { DeviceSelectProps, IDevice, IDivision, IStation, Unit } from "../../../static/types";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { BaseFlex1Row, BaseOption, BaseSelect } from "../../../static/componentSet";
import { setCurrentUnitDevice } from "../../../features/reducers/tabPageSlice";
import { updateCurrentGroup, updateCurrentGroupUnit, updateCurrentUnitDevice } from "../../../features/reducers/unitGroupSlice";
import { useSelector } from "react-redux";
import { RootStore } from "../../../store/congifureStore";
import { DeviceState } from "../../../features/reducers/deviceSlice";


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


  const deviceinfo = (deviceId: number) => {
    if (!deviceId)
      return null;

    return devicelist.devices[deviceId.toString()];
  };

  console.log("UnitGroupAutoSelect",devicePosition, selectedSt)

  useEffect(() => {
    const st = devicelist.devices[currentDeviceId]?.divisionId === 0 
                ? initStationId
                : deviceinfo(devicelist.devices[currentDeviceId]?.divisionId)?.stationId;
    
    if (st) {
      setSelectedStation(st);
    }
  }, [initStationId]);

  useEffect(() => {
    const div = devicelist.devices[currentDeviceId]?.divisionId === 0 
                ? initDivisionId 
                : deviceinfo(devicelist.devices[currentDeviceId]?.divisionId)?.divisionId

    if (div) {
      setSelectedDivision(div)
    }
  }, [initDivisionId]);

  useEffect(() => {
    // division 바뀌어도 device가 선택되어 있으면 selected device 유지
    if (currentDeviceId === 0) {
      setSelectedDevice(0); 
      return;
    }

    setSelectedDevice(currentDeviceId)
  }, [selectedDiv, currentDeviceId]);

  const handleStationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStation(Number(e.target.value));
  };

  const handleDivisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDivision(Number(e.target.value));
  };

  const handleDeviceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const devId = Number(e.target.value);

    setSelectedDevice(devId);
    dispatch(updateCurrentUnitDevice({unitPosition : 0,
                                      devicePosition: devicePosition, 
                                      deviceId: devId }))
  };
  
  return (
    <InnerDiv>
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
        <BaseOption key={selectedDevice} value={selectedDevice}>
          {selectedDevice === 0 
            ? "Select a device" 
            : devicelist.devices[selectedDevice.toString()]?.name}
        </BaseOption>
        {Object.values(devicelist.devices)
          .filter(
            (dev: IDevice) => 
              dev.stationId === selectedSt && dev.divisionId === selectedDiv
          ).filter((dev:IDevice) => {
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
    </InnerDiv>
  );
};


const InnerDiv = styled(BaseFlex1Row)`
  justify-content: center;
  align-items: stretch;
  text-align: center;
`;


const SelectDivision = styled(BaseSelect)`
  min-width: 70px;
  text-align: center;
`

const SelectDevice = styled(BaseSelect)`
  flex: 1;
  min-width: 200px;
  text-align: center;
`

export default UnitGroupAutoSelect;
