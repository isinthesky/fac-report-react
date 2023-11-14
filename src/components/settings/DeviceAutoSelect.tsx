import React, {useEffect, useState} from "react";
import { Unit, IDivision, IStation } from "../../static/types";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { updateCurrentTab } from "../../features/reducers/tabPageSlice";

type DeviceSelectProps = {
  pos: number;
  devKey: string;
  devicelist: any;
  initStationId: number;
  stationValue:number;
  initDivisionId: number;
  divisionValue: number;
  currentDevice: Unit;
};

const DeviceAutoSelect: React.FC<DeviceSelectProps> = ({
  pos,
  devKey,
  devicelist,
  initStationId,
  initDivisionId,
  currentDevice,
}) => {
  const dispatch = useDispatch();
  const [selectedSt, setSelectedStation] = useState<number>(initStationId);
  const [selectedDiv, setSelectedDivision] = useState<number>(initDivisionId);
  const [selecteddevice, setSelectedDevice] = useState<number>((currentDevice as any)[devKey]);

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
    setSelectedDevice(Number(e.target.value));
    dispatch(
      updateCurrentTab({
        arrPos: pos,
        arrKey: devKey ,
        deviceId: Number(e.target.value),
      })
    );
  };

  return (
    <InnerDiv>
      <SelectDivision onChange={handleStationChange} value={selectedSt}>
        {devicelist.stations.map((st: IStation) => (
          <option key={st.id} value={st.id}>
            {st.name}
          </option>
        ))}
      </SelectDivision>
      <SelectDivision onChange={handleDivisionChange} value={selectedDiv}>
        {devicelist.divisions
          .filter((div: IDivision) => div.stationId === selectedSt)
          .map((div: IDivision) => (
            <option key={div.id} value={div.id}>
              {div.name}
            </option>
          ))}
      </SelectDivision> 
      <SelectDevice onChange={handleDeviceChange} value={selecteddevice}>
        {
          Object.values(devicelist.devices).filter((dev:any) =>
              dev.stationId === selectedSt && dev.divisionId === selectedDiv
          ).map((dev:any) => (
            <option key={dev.id} value={dev.id}>
              {dev.name}
            </option>
          ))
          }
      </SelectDevice>
    </InnerDiv>
  );
};


const InnerDiv = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
  text-align: center;
`;

const SelectDivision = styled.select`
  margin: 0px 10px;
  min-width: 70px;
  text-align: center;
`

const SelectDevice = styled.select`
  flex: 1;
  margin: 0px 10px;
  min-width: 300px;
  text-align: center;

`

export default DeviceAutoSelect;
