import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Device from "./Device";
import DeviceInfo from "./DeviceInfo";
import SetDeviceType1 from "./SetDeviceType1";

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

  const [deviceType, setDeviceType] = useState(0);

  const rowOptions = Array.from({ length: row }, (_, i) => i + 1);
  const columnOptions = Array.from({ length: column }, (_, i) => i + 1);
  const typeOptions = Array.from({ length: 2 }, (_, i) => i + 1);

  console.log("compose", devicelist);

  const renderButtons = () => {
    if (deviceType === 0) {
      return <SetDeviceType1></SetDeviceType1>;
    }
  };

  const handleSave = () => {
    // Send a POST request to the API
    fetch("YOUR_API_ENDPOINT_HERE", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ row, column }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
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
      <ButtonGroup>
        <SettingButton onClick={handleSave}>Save</SettingButton>
        <SettingButton>Cancel</SettingButton>
      </ButtonGroup>
    </>
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

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const SettingButton = styled.button`
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  :hover: {
    background-color: #e0e0e0;
  }
`;

export default Compose;
