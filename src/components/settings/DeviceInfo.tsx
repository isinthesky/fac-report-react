import React from "react";
import styled from "styled-components";
import { Unit } from "../../static/types";
import { useSelector } from "react-redux";
import { RootState } from "../../static/interfaces";

const DeviceInfo: React.FC<Unit> = ({
  type,
  name,
  id,
  dv1,
  dv2,
  dv3,
  dv4,
  dv5,
  dv6,
  dv7,
  dv8,
  dv9,
}) => {
  const deviceSet = useSelector(
    (state: RootState) => state.deviceReducer.value
  );

  const getDevName = (id:number) => {
    if (true === Object.hasOwn(deviceSet.devices, id)) {
      return deviceSet.devices[String(id)].name;
    } else {
      return ""
    }
  }

  return (
    <Container>
      <NameGroup>
          <label>id</label>
          <KeyInput>{id}</KeyInput>
          <label>type</label>
          <KeyInput>{type}</KeyInput>
          <label>name</label>
          <KeyInput>{name}</KeyInput>
      </NameGroup>
      <Group>
        <ItemDiv>
          <label>rs</label>
          <DeviceInput id="rs" type="text" value={getDevName(dv1)} readOnly={true}/>
        </ItemDiv>

        <ItemDiv>
          <label>st</label>
          <DeviceInput id="st" type="text" value={getDevName(dv2)} readOnly={true}/>
        </ItemDiv>
        <ItemDiv>
          <label>tr</label>
          <DeviceInput id="tr" type="text" value={getDevName(dv3)}readOnly={true}/>
        </ItemDiv>
      </Group>
      <Group>
        <ItemDiv>
          <label>r</label>
          <DeviceInput id="r" type="text" value={getDevName(dv4)} readOnly={true}/>
        </ItemDiv>
        <ItemDiv>
          <label>s</label>
          <DeviceInput id="s" type="text" value={getDevName(dv5)} readOnly={true}/>
        </ItemDiv>
        <ItemDiv>
          <label>t</label>
          <DeviceInput id="t" type="text" value={getDevName(dv6)} readOnly={true}/>
        </ItemDiv>
      </Group>
      <Group>
        <ItemDiv>
          <label>pf</label>
          <DeviceInput id="pf" type="text" value={getDevName(dv7)} readOnly={true}/>
        </ItemDiv>
        <ItemDiv>
          <label>hz</label>
          <DeviceInput id="hz" type="text" value={getDevName(dv8)} readOnly={true}/>
        </ItemDiv>
        <ItemDiv>
          <label>kw</label>
          <DeviceInput id="kw" type="text" value={getDevName(dv9)} readOnly={true}/>
        </ItemDiv>
      </Group>
    </Container>
  );
};

const Container = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1px;
  padding: 10px;

  border-radius: 10px;
  background-color: white;
`;

const Group = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 5px;
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

const KeyInput = styled.button`
  width: 70px;
  border: 0px;
`;

const DeviceInput = styled.input`
  flex:1;
  padding:5px;
`;

export default DeviceInfo;
