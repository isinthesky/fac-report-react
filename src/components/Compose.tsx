import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Device from "./Device";
import { IDevice, IDivision, IStation } from "../features/types";

type ComposeProps = {
  row: number;
  column: number;
  stations: IStation[];
  divisions: IDivision[];
  devices: IDevice[];
};

const Compose: React.FC<ComposeProps> = ({
  row,
  column,
  devices,
  divisions,
  stations,
}) => {
  const renderButtons = () => {
    const rows = [];
    let keyCounter = 0;

    for (let r = 0; r < row; r++) {
      const buttons = [];
      for (let c = 0; c < column; c++) {
        buttons.push(
          <Device
            key={keyCounter}
            station={stations}
            area={divisions}
            list={devices}
          />
        );
        keyCounter++;
      }
      rows.push(<ButtonGrid key={r}>{buttons}</ButtonGrid>);
    }

    console.log("list", devices);

    return rows;
  };

  return <CContainer>{renderButtons()}</CContainer>;
};

const CContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;

  height: calc(50vh);
  width: calc(100vw - 300px);

  margin: 50px auto;
`;

const ButtonGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: space-around;
`;

export default Compose;
