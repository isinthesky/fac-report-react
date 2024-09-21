import React from "react";
import BaseTableType from "./BaseTableType";
import { SetDeviceType, TableType } from "../../../static/types";
import { COLORSET_ACTIVE_CONTROL_BG } from "../../../static/colorSet";

const unitKeysWV = ["R-S", "S-T", "T-R", "R", "S", "T", "PF", "Hz", "kW"];
const unitKeysS = ["R-S", "S-T", "T-R", "R", "S", "T", "Hz", "kW"];
const unitKeysH = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
const unitKeysR = ["R-S", "S-T", "T-R", "Hz", "DC(V)", "DC(A), Alram"];
const unitKeysTR = ["R", "S", "T", "R", "S", "T", "R", "S", "T", "R", "S", "T", "R", "S", "T"];
const unitKeysU1 = ["전일지침", "금일지침", "전일-금일", "배율소계", "주간4", "저녁5", "심야6", "주간7", "저녁8"];
const unitKeysU2 = ["현재", "주간", "저녁", "태양광", "7시", "11시", "17시", "23시"];


interface UnitTypeProps extends SetDeviceType {
  type: TableType;
}

const UnitType: React.FC<UnitTypeProps> = ({ name, type }) => {
  let unitKeys: string[];
  let containerStyle = {};
  let titleStyle = {};
  let userTable = false;

  switch (type) {
    case 'W':
    case 'V':
      unitKeys = unitKeysWV;
      userTable = false;
      break;
    case 'S':
      unitKeys = unitKeysS;
      userTable = false;
      break;
    case 'R':
      unitKeys = unitKeysR;
      userTable = false;
      break;
    case 'TR':
      unitKeys = unitKeysTR;
      userTable = false;
      break;
    case 'U1':
      unitKeys = unitKeysU1;
      userTable = true;
      break;
    case 'U2':
      unitKeys = unitKeysU2;
      userTable = true;
      break;
    case 'HIDE':
      unitKeys = unitKeysH;
      userTable = false;
      containerStyle = {
        backgroundColor: COLORSET_ACTIVE_CONTROL_BG,
      };
      titleStyle = {
        backgroundColor: COLORSET_ACTIVE_CONTROL_BG,
      };
      break;
    default:
      unitKeys = [];
  }

  return (
    <BaseTableType 
      name={`${type}: ${name}`} 
      unitKeys={unitKeys} 
      containerStyle={containerStyle}
      titleStyle={titleStyle}
      userTable={userTable}
    />
  );
};

export const UnitTypeW: React.FC<SetDeviceType> = (props) => (
  <UnitType {...props} type="W" />
);

export const UnitTypeV: React.FC<SetDeviceType> = (props) => (
  <UnitType {...props} type="V" />
);

export const UnitTypeS: React.FC<SetDeviceType> = (props) => (
  <UnitType {...props} type="S" />
);

export const UnitTypeR: React.FC<SetDeviceType> = (props) => (
  <UnitType {...props} type="R" />
);

export const UnitTypeU1: React.FC<SetDeviceType> = (props) => (
  <UnitType {...props} type="U1" />
);

export const UnitTypeU2: React.FC<SetDeviceType> = (props) => (
  <UnitType {...props} type="U2" />
);

export const UnitTypeH: React.FC<SetDeviceType> = (props) => (
  <UnitType {...props} type="HIDE" />
);

export const TableTypeComponents: Record<TableType, React.FC<SetDeviceType>> = {
  W: (props) => <UnitType {...props} type="W" />,
  V: (props) => <UnitType {...props} type="V" />,
  S: (props) => <UnitType {...props} type="S" />,
  R: (props) => <UnitType {...props} type="R" />,
  TR: (props) => <UnitType {...props} type="TR" />,
  U1: (props) => <UnitType {...props} type="U1" />,
  U2: (props) => <UnitType {...props} type="U2" />,
  HIDE: (props) => <UnitType {...props} type="HIDE" />,
};

export default UnitType;
