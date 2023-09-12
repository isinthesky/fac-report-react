import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Device from "./Device";
import DeviceInfo from "./DeviceInfo";

type ComposeProps = {
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

const Compose: React.FC<ComposeProps> = ({ row, column, mode }) => {
  const devicelist = useSelector(
    (state: RootState) => state.deviceReducer.value
  );
  const optionlist = useSelector(
    (state: optionState) => state.optionReducer.value
  );

  console.log("compose", devicelist);

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

  return <CContainer>{renderButtons()}</CContainer>;
};

const CContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;

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
