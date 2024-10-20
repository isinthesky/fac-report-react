import React from "react";
import BaseTableType from "./BaseTableType";
import { SetDeviceType } from "../../../static/types";
import { COLORSET_ACTIVE_CONTROL_BG } from "../../../static/colorSet";
import { CONST_TYPE_INFO, TypeInfo, TableType, isValidTableUserType } from "../../../env";

interface UnitTypeProps extends SetDeviceType {
  name: string;
  type: TableType;
}

const UnitType: React.FC<UnitTypeProps> = ({ name, type }) => {
  const typeInfo: TypeInfo | undefined = CONST_TYPE_INFO.find(info => info.keyword === type);
  
  if (!typeInfo) {
    return null;
  }

  const { unitKeys, keyword } = typeInfo;
  let containerStyle = {};
  let titleStyle = {};
  const userTable = isValidTableUserType(keyword);

  if (keyword === 'HIDE') {
    containerStyle = {
      backgroundColor: COLORSET_ACTIVE_CONTROL_BG,
    };
    titleStyle = {
      backgroundColor: COLORSET_ACTIVE_CONTROL_BG,
    };
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

export const TableTypeComponents: Record<TableType, React.FC<SetDeviceType>> = {
  W: (props) => <UnitType {...props} type="W" />,
  V: (props) => <UnitType {...props} type="V" />,
  S: (props) => <UnitType {...props} type="S" />,
  R: (props) => <UnitType {...props} type="R" />,
  U1: (props) => <UnitType {...props} type="U1" />,
  U2: (props) => <UnitType {...props} type="U2" />,
  TR: (props) => <UnitType {...props} type="TR" />,
  HIDE: (props) => <UnitType {...props} type="HIDE" />,
};

export default UnitType;