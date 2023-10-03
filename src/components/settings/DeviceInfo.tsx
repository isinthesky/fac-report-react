import React from "react";
import styled from "styled-components";

type DeviceInfoProps = {
  type: string;
  name: string;
  rs: string;
  st: string;
  tr: string;
  r: string;
  s: string;
  t: string;
  pf: string;
  hz: string;
  kw: string;
};

const DeviceInfo: React.FC<DeviceInfoProps> = ({
  type,
  name,
  rs,
  st,
  tr,
  r,
  s,
  t,
  pf,
  hz,
  kw,
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
          <Input id="rs" type="text" value={rs} />
        </ItemDiv>

        <ItemDiv>
          <label>st</label>
          <Input id="st" type="text" value={st} />
        </ItemDiv>
        <ItemDiv>
          <label>tr</label>
          <Input id="tr" type="text" value={tr} />
        </ItemDiv>
      </Group>
      <Group>
        <ItemDiv>
          <label>r</label>
          <Input id="r" type="text" value={r} />
        </ItemDiv>
        <ItemDiv>
          <label>s</label>
          <Input id="s" type="text" value={s} />
        </ItemDiv>
        <ItemDiv>
          <label>t</label>
          <Input id="t" type="text" value={t} />
        </ItemDiv>
      </Group>
      <Group>
        <ItemDiv>
          <label>pf</label>
          <Input id="pf" type="text" value={pf} />
        </ItemDiv>
        <ItemDiv>
          <label>hz</label>
          <Input id="hz" type="text" value={hz} />
        </ItemDiv>
        <ItemDiv>
          <label>kw</label>
          <Input id="kw" type="text" value={kw} />
        </ItemDiv>
      </Group>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
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
