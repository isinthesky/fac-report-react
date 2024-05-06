import React from "react";
import styled from "styled-components";
import { Unit } from "../../../static/types";
import { useSelector } from "react-redux";
import { RootStore } from "../../../store/congifureStore";
import { BaseFlex1Column, BaseFlex1Div, MediumLabel, CenterLabel, SmallLabel } from "../../../static/componentSet";
import { SIZESET_DEFAULT_INPUT_HEIGHT } from "../../../static/constSet";
import { COLORSET_NORMAL_INPUT_BG, COLORSET_GRID_HEADER_BG, COLORSET_GRID_CONTROL_BG2, COLORSET_GRID_CONTROL_BORDER } from "../../../static/colorSet";
import { CONST_TYPE_INFO_NAMES } from "../../../env";

const UnitInfo: React.FC<Unit> = ({
  type,
  name,
  id,
  dvList
}) => {
  const deviceSet = useSelector(
    (state: RootStore) => state.deviceReducer
  );

  const getDevName = (id:number) => {
    if (true === Object.hasOwn(deviceSet.devices, id)) {
      return deviceSet.devices[id.toString()].name;
    } else {
      return ""
    }
  }

  return (
    <UnitContainer>
      <NameContainer>
        <NameLabel>ID</NameLabel>
        <UnitIDLabel>{id}</UnitIDLabel>
        <NameLabel>Type</NameLabel>
        <UnitInfoLabel>{CONST_TYPE_INFO_NAMES[type-1]}</UnitInfoLabel>
        <NameLabel>Name</NameLabel>
        <UnitInfoLabel>{name}</UnitInfoLabel>
      </NameContainer>

      <Group>
      {dvList&&dvList.map((dv, index) => (
          <ItemDiv key={index}>
            <DescriptLabel>{`dv${index + 1}`}</DescriptLabel>
            <DeviceInput id={`dv${index + 1}`} type="text" value={getDevName(dv)} readOnly={true}/>
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

const NameContainer = styled(BaseFlex1Div)`
  align-items: center; 
  justify-self: start;

  background-color: ${COLORSET_GRID_HEADER_BG};
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

export default UnitInfo;
