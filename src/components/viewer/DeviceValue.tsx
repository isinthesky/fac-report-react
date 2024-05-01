import React, {useEffect, useState, useCallback} from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootStore } from "../../store/congifureStore";
import { readDevicesData } from "../../features/api/device";
import { FONTSET_DEFAULT_DIV_SIZE } from "../../static/fontSet";
import { BaseFlexCenterDiv } from "../../static/componentSet";
import { COLORSET_GRID_CONTROL_BORDER } from "../../static/colorSet";
import { DeviceLog, LogData } from "../../static/types";


interface DeviceValueProps {
  mode: string;
  times: string[];
  devId: number;
}

const DeviceValue: React.FC<DeviceValueProps> = ({ mode, times, devId }) => {
  const settingSet = useSelector((state: RootStore) => state.settingReducer);
  const deviceSet = useSelector((state: RootStore) => state.deviceReducer);
  
  const [deviceSave, setDeviceSave] = useState<any[]>(Array.from({length: times.length}, () => "0")); 
  const [deviceValue, setDeviceValue] = useState<any[]>(Array.from({length: times.length}, () => "0")); 

  const getLogByTimestamp = useCallback((devLog:DeviceLog, timestamp:number) => {
    if (devLog[timestamp.toString()]) {
      return devLog[timestamp.toString()];
    }

    const precedingTimestamp = Object.keys(devLog)
      .map(Number)
      .filter(ts => ts < timestamp)
      .sort((a, b) => b - a)[0];
  
    return precedingTimestamp ? devLog[precedingTimestamp] : "-";
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try{

        let deviceData = []

        if (devId > 0) {
          const result: DeviceLog = await readDevicesData(deviceSet.devices[devId.toString()].pathId, settingSet.date);

          if (!result) {
            deviceData = times.map(() => "x") as []
            setDeviceValue(deviceData);
            setDeviceSave(deviceData);
            return;
          }

          if (Object.keys(result).length === 0) {
            deviceData = times.map(() => "x") as []
            setDeviceValue(deviceData);
            setDeviceSave(deviceData);
            return;
          }

          const date = new Date(settingSet.date);
          const devYear = date.getFullYear();
          const devMonth = date.getMonth();
          const devDate = date.getDate();

          deviceData = times.map((time: string) => {
            const date = new Date(devYear, devMonth, devDate, 
              Number(time.slice(0,2)), Number(time.slice(-2))).getTime();

            return date;
          }).map((devTime: number) => {
            return getLogByTimestamp(result, devTime);
          }).map((value: LogData | string) => {
            if (typeof value === "string") {
              return value;
            }
            const numericValue = parseFloat(value.changed_value);
            return !isNaN(numericValue) ? numericValue.toFixed(1) : numericValue;
          }); 
        }
        else
        {
          deviceData = times.map(() => "-") as []
        }
        
        setDeviceValue(deviceData);
        setDeviceSave(deviceData);
        
      } catch (error) {
        console.error("DeviceValue get device log: ", error);
      }
    };
    fetchData();
  }, [devId, times]);

  useEffect(() => {
    settingSet.idViewMode === 0
    ? setDeviceValue(deviceSave)
    : setDeviceValue(deviceSave.map(() => devId));
  }, [settingSet.idViewMode, deviceSave, devId]);

  return (
    <>
      {deviceValue.map((value:any, index:number) => (
        <ValueColumn mode={mode} key={index}>{value}</ValueColumn>
      ))}
    </>
  );
};

const ValueColumn = styled(BaseFlexCenterDiv)<{ fontsize?: string, mode?: string }>`
  font-size: ${(props) => props.fontsize || FONTSET_DEFAULT_DIV_SIZE};

  height: 25px;  
  width: calc(100% - 2px);
  min-width: 25px;

  border: 1px solid ${COLORSET_GRID_CONTROL_BORDER};
  background-color: ${(props) => props.mode === 'print' ? 'white' : '#2E323B'};
`;

export default React.memo(DeviceValue);
  