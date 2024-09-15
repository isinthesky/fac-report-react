import React from "react";
import BaseTableType from "./BaseTableType";
import { SetDeviceType } from "../../../static/types";
import { COLORSET_ACTIVE_CONTROL_BG } from "../../../static/colorSet";

const unitKeysWV = ["R-S", "S-T", "T-R", "R", "S", "T", "PF", "Hz", "kW"];
const unitKeysS = ["R-S", "S-T", "T-R", "R", "S", "T", "Hz", "kW"];
const unitKeysH = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
const unitKeysR = ["R-S", "S-T", "T-R", "Hz", "DC(V)", "DC(A), Alram"];

interface UnitTypeProps extends SetDeviceType {
  type: 'W' | 'V' | 'S' | 'HIDE' | 'R';
}

const UnitType: React.FC<UnitTypeProps> = ({ name, type }) => {
  let unitKeys: string[];
  let containerStyle = {};
  let titleStyle = {};

  switch (type) {
    case 'W':
    case 'V':
      unitKeys = unitKeysWV;
      break;
    case 'S':
      unitKeys = unitKeysS;
      break;
    case 'R':
      unitKeys = unitKeysR;
      break;
    case 'HIDE':
      unitKeys = unitKeysH;
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

export const UnitTypeH: React.FC<SetDeviceType> = (props) => (
  <UnitType {...props} type="HIDE" />
);

export default UnitType;
