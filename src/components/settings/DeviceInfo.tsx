import React from "react";
import styled from "styled-components";
import { DeviceInfoType } from "../../static/types";
import { useSelector } from "react-redux";

interface RootState {
  deviceReducer: {
    value: any;
  };
}

const DeviceInfo: React.FC<DeviceInfoType> = ({
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

  const getDevName = (id:number) =>{
    for (const item of deviceSet.devices){
      if (item.id === id) {
        return item.name;
      } 
    } 
  }

  return (
    <Container>
      <NameGroup>
        <ItemDiv>
          <label>id</label>
          <KeyInput>{id}</KeyInput>
        </ItemDiv>
        <ItemDiv>
          <label>type</label>
          <Input id="type" type="text" value={String(type)} />
        </ItemDiv>
        <ItemDiv>
          <label>name</label>
          <Input id="name" type="text" value={name} />
        </ItemDiv>
      </NameGroup>
      <Group>
        <ItemDiv>
          <label>rs</label>
          <DeviceInput id="rs" type="text" value={getDevName(dv1)} />
        </ItemDiv>

        <ItemDiv>
          <label>st</label>
          <DeviceInput id="st" type="text" value={getDevName(dv2)} />
        </ItemDiv>
        <ItemDiv>
          <label>tr</label>
          <DeviceInput id="tr" type="text" value={getDevName(dv3)} />
        </ItemDiv>
      </Group>
      <Group>
        <ItemDiv>
          <label>r</label>
          <DeviceInput id="r" type="text" value={getDevName(dv4)} />
        </ItemDiv>
        <ItemDiv>
          <label>s</label>
          <DeviceInput id="s" type="text" value={getDevName(dv5)} />
        </ItemDiv>
        <ItemDiv>
          <label>t</label>
          <DeviceInput id="t" type="text" value={getDevName(dv6)} />
        </ItemDiv>
      </Group>
      <Group>
        <ItemDiv>
          <label>pf</label>
          <DeviceInput id="pf" type="text" value={getDevName(dv7)} />
        </ItemDiv>
        <ItemDiv>
          <label>hz</label>
          <DeviceInput id="hz" type="text" value={getDevName(dv8)} />
        </ItemDiv>
        <ItemDiv>
          <label>kw</label>
          <DeviceInput id="kw" type="text" value={getDevName(dv9)} />
        </ItemDiv>
      </Group>
    </Container>
  );
};

const Container = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  border: 1px solid #333;
`;

const Group = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
`;


const NameGroup = styled(Group)`
  align-items: center; // Center children horizontally
  justify-content: center; // Center children vertically
`;

const ItemDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
`;

const KeyInput = styled.button`
  width: 30px;
  border: 0px;
`;


const DeviceInput = styled.input`
  width: 150px;
`;

export default DeviceInfo;
