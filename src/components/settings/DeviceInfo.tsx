import React from "react";
import styled from "styled-components";

type DeviceInfoProps = {
  type?: string;
  name?: string;
  rs?: string;
  st?: string;
  tr?: string;
  pf?: string;
  hz?: string;
  kw?: string;
};

const DeviceInfo: React.FC<DeviceInfoProps> = ({
  type,
  name,
  rs,
  st,
  tr,
  pf,
  hz,
  kw,
}) => {
  return (
    <div className="device-info-container">
      <label htmlFor="type">Type:</label>
      <Input id="type" type="text" value={type} />

      <label htmlFor="name">Name:</label>
      <Input id="name" type="text" value={name} />

      <label htmlFor="rs">RS:</label>
      <Input id="rs" type="text" value={rs} />

      <label htmlFor="st">ST:</label>
      <Input id="st" type="text" value={st} />

      <label htmlFor="tr">TR:</label>
      <Input id="tr" type="text" value={tr} />

      <label htmlFor="pf">PF:</label>
      <Input id="pf" type="text" value={pf} />

      <label htmlFor="hz">Hz:</label>
      <Input id="hz" type="text" value={hz} />

      <label htmlFor="kw">kW:</label>
      <Input id="kw" type="text" value={kw} />
    </div>
  );
};

const Input = styled.input`
  width: 50px;
`;

export default DeviceInfo;
