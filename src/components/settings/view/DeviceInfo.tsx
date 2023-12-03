import React from "react";
import styled from "styled-components";
import { Unit } from "../../../static/types";
import { useSelector } from "react-redux";
import { RootStore } from "../../../store/congifureStore";
import { BaseButton, BaseFlex1Column, BaseFlex1Div, BaseLabel, CenterLabel } from "../../../static/componentSet";
import { SIZESET_DEFAULT_INPUT_HEIGHT } from "../../../static/constSet";


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
      return deviceSet.devices[id].name;
    } else {
      return ""
    }
  }

  return (
    <Container>
      <NameGroup>
        <BaseLabel>id</BaseLabel>
        <ButtonUnitInfo>{id}</ButtonUnitInfo>
        <BaseLabel>type</BaseLabel>
        <ButtonUnitInfo>{type}</ButtonUnitInfo>
        <BaseLabel>name</BaseLabel>
        <NameLabel>{name}</NameLabel>
      </NameGroup>

      <Group>
      {dvList.map((dv, index) => (
          <ItemDiv key={index}>
            <BaseLabel>{`dv${index + 1}`}</BaseLabel>
            <DeviceInput id={`dv${index + 1}`} type="text" value={getDevName(dv)} readOnly={true}/>
          </ItemDiv>
      ))}
      </ Group>
      
    </Container>
  );
}; 

const Container = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  padding: 10px;

  border-radius: 10px;
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

const NameLabel = styled(CenterLabel)`
  width:100px;
`;


const NameGroup = styled(BaseFlex1Div)`
  align-items: center; 
  justify-self: start;
  margin: 10px;
`;

const ItemDiv = styled(BaseFlex1Column)`
  gap: 1px;
`;

const ButtonUnitInfo = styled(CenterLabel)`
  border: 0px;
`;

const DeviceInput = styled.input<{ heightsize?: string }>`
  flex:1;
  height: ${(props) => props.heightsize || SIZESET_DEFAULT_INPUT_HEIGHT};

  padding:5px;
`;

export default DeviceInfo;
