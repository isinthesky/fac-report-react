import React, {useEffect, useState, useCallback} from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootStore } from "../../store/congifureStore";
import { readDevicesData } from "../../features/api/device";
import { FONTSET_DEFAULT_DIV_SIZE } from "../../static/fontSet";
import { BaseFlexCenterDiv } from "../../static/componentSet";
import { COLORSET_FONT_BASE, COLORSET_GRID_CONTROL_BG, COLORSET_PRINT_FONT } from "../../static/colorSet";


const DeviceValue: React.FC<{ arrPosValue: string[] }> = ({ arrPosValue }) => {
  const settingSet = useSelector((state: RootStore) => state.settingReducer);
  const tabPageSet = useSelector((state: RootStore) => state.tabPageReducer);

  const [deviceValue, setDeviceValue] = useState<any[]>(Array.from({length: arrPosValue.length}, () => "0")); 
  const [deviceSave, setDeviceSave] = useState<any[]>(Array.from({length: arrPosValue.length}, () => "0")); 

  useEffect(() => {
    settingSet.viewMode === "idCheck"
      ? setDeviceValue(deviceSave.map(() => arrPosValue[0]))
      : setDeviceValue(deviceSave);
  }, [settingSet.viewMode, deviceSave, arrPosValue]);

  return (
    <>
      {arrPosValue.map((value:any, index:number) => (
        <ValueColumn mode={settingSet.viewMode} fontSize={settingSet.printFontSize + "px"} key={index}>
          {value}
        </ValueColumn>
      ))}
    </>
  );
};

const ValueColumn = styled(BaseFlexCenterDiv)<{ fontSize?: string, mode?: string }>`
  width: 100%;
  min-width: ${(props) => props.mode === "print" ? "22px" : "25px"};
  
  padding: 3px 0px;
  font-size: ${(props) => props.mode === "print" 
  ? props.fontSize 
  : FONTSET_DEFAULT_DIV_SIZE};

  color: ${(props) => props.mode === "print" ? COLORSET_PRINT_FONT : COLORSET_FONT_BASE};
  background-color: ${(props) => props.mode === "print" ? "white" : COLORSET_GRID_CONTROL_BG};
`;

export default React.memo(DeviceValue);
  