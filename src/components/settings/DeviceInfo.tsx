import React from "react";
import styled from "styled-components";
import { DeviceInfoType } from "../../static/types";

const DeviceInfo: React.FC<DeviceInfoType> = ({
  type,
  name,
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
  return (
    <Container>
      <Group>
        <ItemDiv>
          <label>type</label>
          <Input id="type" type="text" value={String(type)} />
        </ItemDiv>
        <ItemDiv>
          <label>name</label>
          <Input id="name" type="text" value={name} />
        </ItemDiv>
      </Group>
      <Group>
        <ItemDiv>
          <label>rs</label>
          <Input id="rs" type="text" value={dv1} />
        </ItemDiv>

        <ItemDiv>
          <label>st</label>
          <Input id="st" type="text" value={dv2} />
        </ItemDiv>
        <ItemDiv>
          <label>tr</label>
          <Input id="tr" type="text" value={dv3} />
        </ItemDiv>
      </Group>
      <Group>
        <ItemDiv>
          <label>r</label>
          <Input id="r" type="text" value={dv4} />
        </ItemDiv>
        <ItemDiv>
          <label>s</label>
          <Input id="s" type="text" value={dv5} />
        </ItemDiv>
        <ItemDiv>
          <label>t</label>
          <Input id="t" type="text" value={dv6} />
        </ItemDiv>
      </Group>
      <Group>
        <ItemDiv>
          <label>pf</label>
          <Input id="pf" type="text" value={dv7} />
        </ItemDiv>
        <ItemDiv>
          <label>hz</label>
          <Input id="hz" type="text" value={dv8} />
        </ItemDiv>
        <ItemDiv>
          <label>kw</label>
          <Input id="kw" type="text" value={dv9} />
        </ItemDiv>
      </Group>
    </Container>
  );
};

const Container = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`;

const Group = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
`;

const ItemDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 50px;
`;

export default DeviceInfo;
