import React from "react";
import styled from "styled-components";
import { Unit } from "../../../static/types";
import { useSelector } from "react-redux";
import { RootStore } from "../../../store/congifureStore";
import { BaseButton, BaseLabel } from "../../../static/styledComps";


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
        <ButtonUnitInfo>{name}</ButtonUnitInfo>
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


const NameGroup = styled(Group)`
  display: flex;
  align-items: center; 
  justify-self: start;
  justify-content: center;

  margin: 10px;

  border-radius: 10px;
  
`;

const ItemDiv = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ButtonUnitInfo = styled(BaseButton)`
  border: 0px;
`;

const DeviceInput = styled.input`
  flex:1;
  padding:5px;
`;

export default DeviceInfo;
