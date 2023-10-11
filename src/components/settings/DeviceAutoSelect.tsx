import React from "react";
import { DeviceInfoType, IDevice, IDivision, IStation } from "../../static/types";
import styled from "styled-components";

type DeviceSelectProps = {
  id: number;
  devicelist: any;
  station: number;
  stationValue:number;
  division: number;
  divisionValue: number;
  currentDevice: DeviceInfoType;
  onDeviceChange?: (id: number, deviceId: number) => void;
};

const DeviceAutoSelect: React.FC<DeviceSelectProps> = ({
  id,
  devicelist,
  station,
  division,
  currentDevice,
  onDeviceChange,
}) => {
  const handleDeviceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDeviceId = Number(e.target.value);
    onDeviceChange?.(id, selectedDeviceId); // Notify parent component
  };

  const key = `dv${String(id+1)}`

  return (
    <InnerDiv>
      <SelectDevice value={station}>
        {devicelist.stations.map((st: IStation) => (
          <option key={st.id} value={st.id}>
            {st.name}
          </option>
        ))}
      </SelectDevice>
      <SelectDevice value={division}>
        {devicelist.divisions
          .filter((div: IDivision) => div.stationId === station)
          .map((div: IDivision) => (
            <option key={div.id} value={div.id}>
              {div.name}
            </option>
          ))}
      </SelectDevice> 
      <SelectDevice onChange={handleDeviceChange} value={(currentDevice as any)[key]}>
        {devicelist.devices
          .filter(
            (dev: IDevice) =>
              dev.stationId === station && dev.divisionId === division
          )
          .map((dev: IDevice) => (
            <option key={dev.id} value={dev.id}>
              {dev.name}
            </option>
          ))}
      </SelectDevice>
    </InnerDiv>
  );
};

export default DeviceAutoSelect;

const InnerDiv = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
`;

const SelectDevice = styled.select`
  margin: 0px 10px;
`