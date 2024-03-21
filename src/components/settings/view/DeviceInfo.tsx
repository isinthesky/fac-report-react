import React from "react";
import styled from "styled-components";
import { Unit } from "../../../static/types";
import { useSelector } from "react-redux";
import { RootStore } from "../../../store/congifureStore";
import { BaseButton, BaseFlex1Column, BaseFlex1Div, MediumLabel, CenterLabel } from "../../../static/componentSet";
import { SIZESET_DEFAULT_INPUT_HEIGHT } from "../../../static/constSet";
import { COLORSET_GRID_CONTROL_BG, COLORSET_GRID_HEADER_BG } from "../../../static/colorSet";


const DeviceInfo: React.FC<Unit> = ({
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
        <MediumLabel>id</MediumLabel>
        <ButtonUnitInfo>{id}</ButtonUnitInfo>
        <MediumLabel>type</MediumLabel>
        <ButtonUnitInfo>{type}</ButtonUnitInfo>
        <MediumLabel>name</MediumLabel>
        <NameLabel>{name}</NameLabel>
      </NameContainer>

      <Group>
      {dvList&&dvList.map((dv, index) => (
          <ItemDiv key={index}>
            <MediumLabel>{`dv${index + 1}`}</MediumLabel>
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
  padding: 10px;

  background-color: white;
`;

const Group = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;

  padding: 10px;
  
  border-radius: 5px;
`;

const NameLabel = styled(MediumLabel)`
  height: 25px;
  color:white;
  background-color: transparent;
  border: 1px solid white;
`;


const NameContainer = styled(BaseFlex1Div)`
  align-items: center; 
  justify-self: start;

  background-color: ${COLORSET_GRID_HEADER_BG};
`;

const ItemDiv = styled(BaseFlex1Column)`
  gap: 1px;
`;

const ButtonUnitInfo = styled(CenterLabel)`
  color: white;
  background-color: transparent;
  border: 1px solid white;
`;

const DeviceInput = styled.input<{ heightsize?: string }>`
  flex:1;
  height: ${(props) => props.heightsize || SIZESET_DEFAULT_INPUT_HEIGHT};

  padding:5px;
`;

export default DeviceInfo;
