import React from "react";
import styled from "styled-components";
import { TableSettingType } from "@/types/types";
import { useSelector } from "react-redux";
import { RootStore } from "@/store/congifureStore";
import { BaseFlex1Column, BaseFlex1Div, MediumLabel, CenterLabel, SmallLabel } from "@/static/componentSet";
import { SIZESET_DEFAULT_INPUT_HEIGHT } from "@/config/constSet";
import { COLORSET_NORMAL_INPUT_BG, COLORSET_GRID_HEADER_BG, COLORSET_GRID_CONTROL_BG2, COLORSET_GRID_CONTROL_BORDER, COLORSET_ACTIVE_CONTROL_BG } from "@/static/colorSet";
import { CONST_TYPE_INFO, TypeInfo } from "@/config/env";

const TableData: React.FC<TableSettingType> = ({
  type,
  name,
  idx,
  devices
}) => {
  const deviceSet = useSelector(
    (state: RootStore) => state.deviceReducer
  );

  const getDevName = (id:number) => {
    if (true === Object.hasOwn(deviceSet.devices, id)) {
      return deviceSet.devices[id].name;
    } else {
      return ""
    }
  }

  const typeInfo: TypeInfo | undefined = CONST_TYPE_INFO.find(info => info.index === type);
  const typeName = typeInfo?.name || "";
  const unitKeys = typeInfo?.unitKeys || [];

  return (
    <UnitContainer>
      <NameContainer type={type}>
        <NameLabel>ID</NameLabel>
        <UnitIDLabel>{idx}</UnitIDLabel>
        <NameLabel>Type</NameLabel>
        <UnitInfoLabel>{typeName}</UnitInfoLabel>
        <NameLabel>Name</NameLabel>
        <UnitInfoLabel>{name}</UnitInfoLabel>
      </NameContainer>
      <Group>
        {devices && Object.values(devices).map((dv, index) => (
          <ItemDiv key={dv.id}>
            <DescriptLabel>{unitKeys[index] || `dv${dv.idx}`}</DescriptLabel>
            <DeviceInput 
              id={`dv${dv.idx}`} 
              type="text" 
              value={getDevName(dv.path_id)} 
              readOnly={true}
            />
          </ItemDiv>
        ))}
      </ Group>
    </UnitContainer>
  );
}; 

const UnitContainer = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  
  background-color: ${COLORSET_GRID_HEADER_BG};
`;

const Group = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  
  background-color: ${COLORSET_GRID_CONTROL_BG2};

  padding: 10px;
`;

const NameLabel = styled(MediumLabel)`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 5px 10px;
  background-color: transparent;
`;

const NameContainer = styled(BaseFlex1Div)<{ type: number }>`
  align-items: center; 
  justify-self: start;
  width: 100%;

  background-color: ${(props) => {
    const typeInfo = CONST_TYPE_INFO.find(info => info.index === props.type);
    return typeInfo?.keyword === "HIDE" ? COLORSET_ACTIVE_CONTROL_BG : COLORSET_GRID_HEADER_BG;
  }};
`;

const ItemDiv = styled(BaseFlex1Column)`
  gap: 1px;
  background-color: transparent;
`;

const UnitIDLabel = styled(CenterLabel)`
  width: 30px;
  color: white;
  background-color: transparent;
`;

const UnitInfoLabel = styled(CenterLabel)`
  width: 80px;
  color: white;
  background-color: transparent;
`;

const DescriptLabel = styled(SmallLabel)`
  text-align: left;
  width: 25px;
  padding: 2px;
  background-color: transparent;
`;

const DeviceInput = styled.input<{ heightsize?: string }>`
  flex: 1;
  display: flex;
  align-items: center;

  height: ${(props) => props.heightsize || SIZESET_DEFAULT_INPUT_HEIGHT};
  padding: 5px;

  color:${COLORSET_GRID_CONTROL_BORDER};
  background-color: ${COLORSET_NORMAL_INPUT_BG};
  border: 1px solid ${COLORSET_GRID_CONTROL_BORDER};
`;

export default TableData;
