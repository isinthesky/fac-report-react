import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Device from "./Device";
import DeviceInfo from "./DeviceInfo";

type Compose2Props = {
  row: number;
  column: number;
  mode: boolean;
};

interface RootState {
  deviceReducer: {
    value: any;
  };
}

interface optionState {
  optionReducer: {
    value: any;
  };
}

const Compose2: React.FC<Compose2Props> = ({ row, column, mode }) => {
  const devicelist = useSelector(
    (state: RootState) => state.deviceReducer.value
  );
  const optionlist = useSelector(
    (state: optionState) => state.optionReducer.value
  );

  const rowOptions = Array.from({ length: row }, (_, i) => i + 1);
  const columnOptions = Array.from({ length: column }, (_, i) => i + 1);
  const typeOptions = Array.from({ length: 2 }, (_, i) => i + 1);

  console.log("compose2", devicelist);

  const renderButtons = () => {
    const rows = [];
    let keyCounter = 0;

    for (let r = 0; r < row; r++) {
      const buttons = [];
      for (let c = 0; c < column; c++) {
        if (mode) {
          buttons.push(<Device key={keyCounter} devicelist={devicelist} />);
        } else {
          if (devicelist.deviceList.length < 1) {
            return;
          }
          buttons.push(
            <DeviceInfo
              key={keyCounter}
              type={devicelist.deviceList.value[keyCounter].type}
              name={devicelist.deviceList.value[keyCounter].name}
              rs={devicelist.deviceList.value[keyCounter].rs}
              st={devicelist.deviceList.value[keyCounter].st}
              tr={devicelist.deviceList.value[keyCounter].tr}
              pf={devicelist.deviceList.value[keyCounter].pf}
              hz={devicelist.deviceList.value[keyCounter].hz}
              kw={devicelist.deviceList.value[keyCounter].kw}
            />
          );
        }

        keyCounter++;
      }
      rows.push(<ButtonGrid key={r}>{buttons}</ButtonGrid>);
    }

    return rows;
  };

  return (
    <ColumnContainer>
      {mode && (
        <RowContainer>
          <label>row : </label>
          <DeviceSelect id="SelectRow">
            {rowOptions.map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </DeviceSelect>
          <label>column : </label>
          <DeviceSelect id="SelectColumn">
            {columnOptions.map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </DeviceSelect>
          <label>type : </label>
          <DeviceSelect id="SelectType">
            {typeOptions.map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </DeviceSelect>
        </RowContainer>
      )}
      {renderButtons()}
    </ColumnContainer>
  );
};

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;

  width: calc(100vw - 300px);

  margin: 50px auto;
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
`;

const ButtonGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: space-around;
`;

const DeviceSelect = styled.select`
  width: 70px;
`;

export default Compose2;
