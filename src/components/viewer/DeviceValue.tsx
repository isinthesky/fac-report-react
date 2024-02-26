import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootStore } from "../../store/congifureStore";
import { readDevicesData } from "../../features/api/device";
import { FONTSET_DEFAULT_DIV_SIZE } from "../../static/fontSet";
import { BaseFlexCenterDiv } from "../../static/componentSet";


interface DeviceValueProps {
  times: string[];
  devId: number;
}

const DeviceValue: React.FC<DeviceValueProps> = ({ times, devId }) => {
  const settingSet = useSelector((state: RootStore) => state.settingReducer);
  const deviceSet = useSelector((state: RootStore) => state.deviceReducer);
  
  const [deviceSave, setDeviceSave] = useState<any[]>(Array.from({length: times.length}, () => "0")); 
  const [deviceValue, setDeviceValue] = useState<any[]>(Array.from({length: times.length}, () => "0")); 

    console.log('DeviceValue', devId);


  const getLogByTimestamp = (devLog:any, timestamp:any) => {
    if (devLog[timestamp]) {
      return devLog[timestamp];
    }

    const precedingTimestamp = Object.keys(devLog)
      .map(Number)
      .filter(ts => ts < timestamp)
      .sort((a, b) => b - a)[0];
  
    return precedingTimestamp ? devLog[precedingTimestamp] : "-";
  }

  useEffect(() => {
    const fetchData = async () => {
      try{

        let deviceData = []

        if (devId > 0) {
          const result = await readDevicesData(deviceSet.devices[devId.toString()].pathId, settingSet.date);

          if (!result) {
            return;
          }

          if (Object.keys(result).length === 0) {
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
          }).map((value: string) => {
            const numericValue = parseFloat(value);
            return !isNaN(numericValue) ? numericValue.toFixed(1) : value;
          }); 
        }
        else
        {
          deviceData = times.map((_:string) => "-") as []
        }
        
        console.log(deviceData)
          
        setDeviceValue(deviceData);
        setDeviceSave(deviceData);
        
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [devId, times]);

  useEffect(() => {
    settingSet.idViewMode === 0
    ? setDeviceValue(deviceSave)
    : setDeviceValue(deviceSave.map(() => devId));
  }, [settingSet.idViewMode]);

  return (
    <>
      {deviceValue.map((value:any, index:number) => (
        <ValueColumn3 key={index}>{value}</ValueColumn3>
      ))}
    </>
  );
};

const ValueColumn3 = styled(BaseFlexCenterDiv)<{ fontsize?: string }>`
  font-size: ${(props) => props.fontsize || FONTSET_DEFAULT_DIV_SIZE};

  height: 25px;  
  width: calc(100% - 2px);
  min-width: 25px;

  border: 1px solid #ccc;
`;

export default DeviceValue;
  