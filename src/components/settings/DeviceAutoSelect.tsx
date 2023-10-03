import React from "react";
import { IDevice, IDivision, IStation } from "../../static/types";
import styled from "styled-components";

type DeviceSelectProps = {
  devicelist: any;
  station: number;
  division: number;
  type: string;
  valueType: string;
  onDeviceChange?: (deviceId: number) => void; // Callback prop
};

const DeviceAutoSelect: React.FC<DeviceSelectProps> = ({
  devicelist,
  station,
  division,
  type,
  valueType,
  onDeviceChange,
}) => {
  const handleDeviceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDeviceId = Number(e.target.value);
    onDeviceChange?.(selectedDeviceId); // Notify parent component
  };

  return (
    <InnerDiv>
      <select value={station}>
        {devicelist.stations.map((st: IStation) => (
          <option key={st.id} value={st.id}>
            {st.name}
          </option>
        ))}
      </select>
      <select value={division}>
        {devicelist.divisions
          .filter((div: IDivision) => div.stationId === station)
          .map((div: IDivision) => (
            <option key={div.id} value={div.id}>
              {div.name}
            </option>
          ))}
      </select>
      <select onChange={handleDeviceChange}>
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
      </select>
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
