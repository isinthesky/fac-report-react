import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Device from "./Device";
import DeviceInfo from "./DeviceInfo";

type ComposeViewProps = {
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

const ComposeView: React.FC<ComposeViewProps> = ({ row, column, mode }) => {
  const devicelist = useSelector(
    (state: RootState) => state.deviceReducer.value
  );
  const optionlist = useSelector(
    (state: optionState) => state.optionReducer.value
  );

  const rowOptions = Array.from({ length: row }, (_, i) => i + 1);
  const columnOptions = Array.from({ length: column }, (_, i) => i + 1);
  const typeOptions = Array.from({ length: 2 }, (_, i) => i + 1);

  console.log("ComposeView", devicelist, row, column, mode);

  const renderButtons = () => {
    const rows = [];
    let keyCounter = 0;

    for (let r = 0; r < row; r++) {
      const buttons = [];
      for (let c = 0; c < column; c++) {
        if (devicelist.deviceList?.value?.length < 1) {
          return;
        }

        if (devicelist.deviceList.length > 0) {
          buttons.push(
            <DeviceInfo
              key={keyCounter}
              type={devicelist.deviceList[keyCounter].type}
              name={devicelist.deviceList[keyCounter].name}
              rs={devicelist.deviceList[keyCounter].rs}
              st={devicelist.deviceList[keyCounter].st}
              tr={devicelist.deviceList[keyCounter].tr}
              r={devicelist.deviceList[keyCounter].rs}
              s={devicelist.deviceList[keyCounter].st}
              t={devicelist.deviceList[keyCounter].tr}
              pf={devicelist.deviceList[keyCounter].pf}
              hz={devicelist.deviceList[keyCounter].hz}
              kw={devicelist.deviceList[keyCounter].kw}
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
  border: 1px solid #e0e0e0;
  border-radius: 5px;

  margin: 30px auto;
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
  min-width: 70px;
`;

export default ComposeView;
