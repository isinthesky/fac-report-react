import React, {useEffect, useState, useCallback} from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootStore } from "../../store/congifureStore";
import { readDevicesData } from "../../features/api/device";
import { FONTSET_DEFAULT_DIV_SIZE } from "../../static/fontSet";
import { BaseFlexCenterDiv } from "../../static/componentSet";
import { COLORSET_FONT_BASE, COLORSET_GRID_CONTROL_BG, COLORSET_GRID_CONTROL_BORDER, COLORSET_PRINT_FONT } from "../../static/colorSet";
import { DeviceLog, LogData } from "../../static/types";
import { DeviceValueProps } from "../../static/interfaces";


const DeviceValue: React.FC<DeviceValueProps> = ({ mode, times, devId }) => {
  const settingSet = useSelector((state: RootStore) => state.settingReducer);
  const deviceSet = useSelector((state: RootStore) => state.deviceReducer);
  
  const [deviceSave, setDeviceSave] = useState<any[]>(Array.from({length: times.length}, () => "0")); 
  const [deviceValue, setDeviceValue] = useState<any[]>(Array.from({length: times.length}, () => "0")); 

  const getLogByTimestamp = useCallback ((devLog:DeviceLog, timestamp: number) => {
    const precedingTimestamp = Object.entries (devLog).map( (value)=> {
      if (value[1].issued_date < timestamp) {
        return value;
      }}).filter((value) => value)

    const size1 = Number (devLog.size);
    const size2 = precedingTimestamp. length;
    return size1 === size2 ? "-" : precedingTimestamp[precedingTimestamp.length - 1]?.[1].changed_value;
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

          const deviceMap = new Map();

          for (const timeValue of Object.values(result)) {
            deviceMap.set(Number(timeValue.issued_date), timeValue.changed_value);
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
          }).map((value: string | any) => {
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
  }, [devId, times, settingSet.date]);

  useEffect(() => {
    settingSet.idViewMode === 0
    ? setDeviceValue(deviceSave)
    : setDeviceValue(deviceSave.map(() => devId));
  }, [settingSet.idViewMode, deviceSave, devId]);

  return (
    <>
      {deviceValue.map((value:any, index:number) => (
        <ValueColumn mode={mode} fontsize={settingSet.printFontSize + "px"} key={index}>{value}</ValueColumn>
      ))}
    </>
  );
};

const ValueColumn = styled(BaseFlexCenterDiv)<{ fontsize?: string, mode?: string }>`
  font-size: ${(props) => props.fontsize || FONTSET_DEFAULT_DIV_SIZE};
  
  width: 100%;
  min-width: ${(props) => props.mode === 'print' ? "22px" : "25px"};
  padding: 3px 0px;

  color: ${(props) => props.mode === 'print' ? COLORSET_PRINT_FONT : COLORSET_FONT_BASE};
  background-color: ${(props) => props.mode === 'print' ? 'white' : COLORSET_GRID_CONTROL_BG};
`;

export default React.memo(DeviceValue);
  