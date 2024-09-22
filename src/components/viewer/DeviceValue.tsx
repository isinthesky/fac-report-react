import React, {useMemo} from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootStore } from "../../store/congifureStore";
import { FONTSET_DEFAULT_DIV_SIZE } from "../../static/fontSet";
import { BaseFlexCenterDiv } from "../../static/componentSet";
import { COLORSET_FONT_BASE, COLORSET_GRID_CONTROL_BG, COLORSET_PRINT_FONT } from "../../static/colorSet";


const formatNumber = (value: string): string => {
  const num = parseFloat(value);
  if (isNaN(num)) return value; // 숫자가 아니면 원래 값 반환

  const [intPart, decimalPart] = num.toString().split('.');
  if (intPart.length >= 4) {
    return intPart.slice(0, 4); // 정수 부분이 4자리 이상이면 처음 4자리만 반환
  } else {
    const totalLength = 4;
    const decimalLength = totalLength - intPart.length;
    return num.toFixed(decimalLength);
  }
};

const DeviceValue: React.FC<{ arrPosValue: string[] }> = ({ arrPosValue }) => {
  const settingSet = useSelector((state: RootStore) => state.settingReducer);
  const deviceValue = useMemo(() => {
    return settingSet.viewMode === "idCheck"
      ? Array(arrPosValue.length).fill(arrPosValue[0])
      : arrPosValue;
  }, [settingSet.viewMode, arrPosValue]);

  return (
    <>
      {deviceValue.map((value: string, index: number) => (
        <ValueColumn 
          mode={settingSet.viewMode} 
          fontSize={settingSet.printFontSize + "px"} 
          key={index}
        >
          {formatNumber(value)} {/* 여기서 formatNumber 함수 사용 */}
        </ValueColumn>
      ))}
    </>
  );
};

const ValueColumn = styled(BaseFlexCenterDiv)<{ fontSize?: string, mode?: string }>`
  width: 100%;
  min-width: ${(props) => props.mode === "print" ? "16px" : "30px"};
  
  padding: ${(props) => props.mode === "print" ? "2px 0px" : "3px 0px"};
  font-size: ${(props) => props.mode === "print" 
  ? props.fontSize 
  : FONTSET_DEFAULT_DIV_SIZE};

  color: ${(props) => props.mode === "print" ? COLORSET_PRINT_FONT : COLORSET_FONT_BASE};
  background-color: ${(props) => props.mode === "print" ? "white" : COLORSET_GRID_CONTROL_BG};
`;

export default React.memo(DeviceValue);
