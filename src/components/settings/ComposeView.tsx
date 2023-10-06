import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Device from "./Device";
import DeviceInfo from "./DeviceInfo";

type ComposeViewProps = {
  row: number;
  column: number;
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

const ComposeView: React.FC<ComposeViewProps> = ({ row, column }) => {
  const deviceSet = useSelector(
    (state: RootState) => state.deviceReducer.value
  );
  const optionlist = useSelector(
    (state: optionState) => state.optionReducer.value
  );

  const rowOptions = Array.from({ length: row }, (_, i) => i + 1);
  const columnOptions = Array.from({ length: column }, (_, i) => i + 1);
  const typeOptions = Array.from({ length: 2 }, (_, i) => i + 1);

  console.log("ComposeView", deviceSet, row, column);

  const renderButtons = () => {
    const rows = [];
    let keyCounter = 0;

    for (let r = 0; r < row; r++) {
      const buttons = [];
      for (let c = 0; c < column; c++) {
        if (deviceSet.deviceList?.value?.length < 1) {
          return;
        }

        if (deviceSet.deviceList.length > 0) {
          buttons.push(
            <DeviceInfo
              key={keyCounter}
              type={deviceSet.deviceList[keyCounter].type}
              name={deviceSet.deviceList[keyCounter].name}
              dv1={deviceSet.deviceList[keyCounter].dv1}
              dv2={deviceSet.deviceList[keyCounter].dv2}
              dv3={deviceSet.deviceList[keyCounter].dv3}
              dv4={deviceSet.deviceList[keyCounter].dv4}
              dv5={deviceSet.deviceList[keyCounter].dv5}
              dv6={deviceSet.deviceList[keyCounter].dv6}
              dv7={deviceSet.deviceList[keyCounter].dv7}
              dv8={deviceSet.deviceList[keyCounter].dv8}
              dv9={deviceSet.deviceList[keyCounter].dv9}
            />
          );
        } else {
          buttons.push([]);
        }
        keyCounter++;
      }
      rows.push(<ButtonGrid key={r}>{buttons}</ButtonGrid>);
    }

    return rows;
  };

  return (
    <ColumnContainer>
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
      {renderButtons()}
    </ColumnContainer>
  );
};

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: 10px;
  margin: 30px auto;

  border: 1px solid #00e0e0;
  border-radius: 5px;
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
  border: 1px solid #e000e0;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: space-around;
`;

const DeviceSelect = styled.select`
  min-width: 70px;
`;

export default ComposeView;
