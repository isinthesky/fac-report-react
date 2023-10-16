import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { readDeviceLog } from "../features/api";
import { optionState } from "../static/interface";

interface DeviceValueProps {
  row: number;
  devId: number;
}

const DeviceValue: React.FC<DeviceValueProps> = ({ row, devId }) => {

  const option = useSelector((state: optionState) => state.optionReducer.value);
  
  const [deviceSave, setDeviceSave] = useState([0,0,0,0]); 
  const [deviceValue, setDeviceValue] = useState([0,0,0,0]); 

  useEffect(() => {
    (async () => {
      try {

        if (devId > 0) {
          const result =  await readDeviceLog(devId, new Date(2023, 8, 1, 12, 0).getTime())
          const t1 = new Date(2023, 8, 1, 7, 0).getTime()
          const t2 = new Date(2023, 8, 1, 11, 0).getTime()
          const t3 = new Date(2023, 8, 1, 17, 0).getTime()
          const t4 = new Date(2023, 8, 1, 23, 0).getTime()
          
          setDeviceValue([result.deviceLog[t1], result.deviceLog[t2], result.deviceLog[t3], result.deviceLog[t4]])
          setDeviceSave([result.deviceLog[t1], result.deviceLog[t2], result.deviceLog[t3], result.deviceLog[t4]])
        }
      }
      catch (error) {
        console.error(error)
      }
    })();
  }, []);

  useEffect(() => {
    console.log("redux viewType");

    if (option.viewType === 0) {
      setDeviceValue([deviceSave[0],deviceSave[1],deviceSave[2],deviceSave[3]])
    }
    else {
      setDeviceValue([devId,devId,devId,devId])
    }
  }, [option.viewType]);


  return (
    <Row3>
      {[...Array(row)].map((_, rowIndex) => (
        <ValueColumn3 key={rowIndex}>{deviceValue[rowIndex]?deviceValue[rowIndex]:"-"}</ValueColumn3>
      ))}
    </Row3>
  );
};

const Row3 = styled.div`
  display: flex;
  flex-direction: column;
`;

const ValueColumn3 = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 4px;
  border-top: 1px solid #ccc;

  min-width: 20px;
`;

export default DeviceValue;
