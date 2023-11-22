import React, {useEffect, useState} from "react";
import { Unit, IDivision, IStation, IDevice } from "../../../static/types";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { updateCurrentUnit, setCurrentUnit } from "../../../features/reducers/tabPageSlice";
import { BaseOption, BaseFlexRow, BaseSelect } from "../../../static/styledComps";

type DeviceSelectProps = {
  unitPosition: number;
  devicePosition: number;
  devicelist: any;
  initStationId: number;
  stationValue:number;
  initDivisionId: number;
  divisionValue: number;
  currentDevice: Unit;
};


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
  const [selecteddevice, setSelectedDevice] = useState<number>((currentDevice as any));

  useEffect(() => {
    setSelectedStation(initStationId)
  }, [initStationId]);

  useEffect(() => {
    setSelectedDivision(initDivisionId)
  }, [initDivisionId]);
  
  const handleStationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStation(Number(e.target.value));
  };

  const handleDivisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDivision(Number(e.target.value));
  };

  const handleDeviceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //setSelectedDevice(Number(e.target.value));
    const newDeviceId = Number(e.target.value);
    setSelectedDevice(newDeviceId);


    const updatedDeviceList = [...currentDevice.dvList];
    updatedDeviceList[devicePosition] = newDeviceId;

    const updatedCurrentDevice = { ...currentDevice, dvList: updatedDeviceList };
    dispatch(setCurrentUnit({ position: unitPosition, unit: updatedCurrentDevice }));
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
      <SelectDevice onChange={handleDeviceChange} value={selecteddevice}>
        {
          Object.values(devicelist.devices).filter((dev:any) =>
              dev.stationId === selectedSt && dev.divisionId === selectedDiv
          ).map((dev:any) => (
            <BaseOption key={dev.id} value={dev.id}>
              {dev.name}
            </BaseOption>
          ))
          }
      </SelectDevice>
    </InnerDiv>
  );
};


const InnerDiv = styled(BaseFlexRow)`
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

export default DeviceAutoSelect;
