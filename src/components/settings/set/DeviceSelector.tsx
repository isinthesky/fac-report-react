import React, { useEffect, useState } from "react";
import { Unit, IDivision, IStation, IDevice, DeviceSelectProps } from "../../../static/types";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  updateCurrentUnit,
  setCurrentUnit,
  setCurrentUnitDevice,
} from "../../../features/reducers/tabPageSlice";
import { BaseOption, BaseFlex1Row, BaseSelect } from "../../../static/componentSet";
import { DeviceState } from "../../../features/reducers/deviceSlice";
import { RootStore } from "../../../store/congifureStore";


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
    // division 바뀌어도 device가 선택되어 있으면 selected device 유지
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
    setSelectedDevice(Number(e.target.value));    
    dispatch(setCurrentUnitDevice({ unitPosition, 
                                    devicePosition, 
                                    deviceId: Number(e.target.value) }));
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
            </BaseOption>
          ))}
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
            return true;
          })
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
`;

const SelectDevice = styled(BaseSelect)`
  flex: 1;
  min-width: 200px;
  text-align: center;
`;

export default DeviceAutoSelect;
