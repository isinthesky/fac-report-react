import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Compose from "../components/settings/Compose";
import {
  getDeviceInfo,
  getSettings,
  setInitSettings,
  setUpdateSettings,
} from "../features/api";
import {
  loadDeviceList,
  updateDeviceList,
} from "../features/reducers/deviceSlice";
import { setDailySetting } from "../features/reducers/optionSlice";

function Settings() {
  const dispatch = useDispatch();

  const [rows, setRow] = useState(Number(process.env.REACT_APP_INIT_DAILY_ROW));
  const [columns, setColumn] = useState(
    Number(process.env.REACT_APP_INIT_DAILY_COLUMN)
  );
  const [compose, setCompose] = useState([
    Number(process.env.REACT_APP_INIT_DAILY_ROW),
    Number(process.env.REACT_APP_INIT_DAILY_COLUMN),
  ]);

  const [mode, setMode] = useState(false);
  const [DeviceList, setDeviceList] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const response = await getSettings();

        if (response) {
          setRow(response.settings.row);
          setColumn(response.settings.column);
          setCompose([response.settings.row, response.settings.column]);

          dispatch(updateDeviceList({ value: response.deviceList }));
          return;
        }

        await setInitSettings(
          process.env.REACT_APP_INIT_GENERAL_SETTING
            ? process.env.REACT_APP_INIT_GENERAL_SETTING
            : "",
          process.env.REACT_APP_INIT_DEVICE_SETTING
            ? process.env.REACT_APP_INIT_DEVICE_SETTING
            : ""
        );
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const handleRow = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRow(Number(e.target.value));
  };
  const handleColumn = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColumn(Number(e.target.value));
  };

  const handleApply = async () => {
    setCompose([rows, columns]);
    setUpdateSettings(rows, columns);

    dispatch(setDailySetting({ row: rows, column: columns }));
  };

  const handleResetDeviceInfo = async () => {
    try {
      if (mode === false) {
        const devicesInfo = await getDeviceInfo();
        console.log("reset", devicesInfo);

        dispatch(loadDeviceList(devicesInfo));
      }
      setMode(!mode);
    } catch (error) {
      console.error("getDeviceInfo", error);
    }
  };

  const handleInitSettings = async () => {
    try {
      await setInitSettings(
        process.env.REACT_APP_INIT_GENERAL_SETTING
          ? process.env.REACT_APP_INIT_GENERAL_SETTING
          : "",
        process.env.REACT_APP_INIT_DEVICE_SETTING
          ? process.env.REACT_APP_INIT_DEVICE_SETTING
          : ""
      );
    } catch (error) {
      console.error("getDeviceInfo", error);
    }
  };

  const handleSave = () => {
    // Send a POST request to the API
    fetch("YOUR_API_ENDPOINT_HERE", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rows, columns }),
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
    <Flat>
      <InputGroup>
        <InputGroup>
          <label htmlFor="row-input">Rows:</label>
          <Input
            id="row-input"
            type="number"
            onChange={handleRow}
            readOnly={mode}
            value={rows}
            mode={mode}
          />
        </InputGroup>

        <InputGroup>
          <label htmlFor="column-input">Columns:</label>
          <Input
            id="column-input"
            type="number"
            onChange={handleColumn}
            readOnly={mode}
            value={columns}
            mode={mode}
          />
        </InputGroup>
        <SettingButton onClick={handleApply}>Apply</SettingButton>
        <SettingButton onClick={handleResetDeviceInfo}>
          ResetDeviceInfo
        </SettingButton>
        <SettingButton onClick={handleInitSettings}>initialize</SettingButton>
      </InputGroup>

      <Compose row={compose[0]} column={compose[1]} mode={mode}></Compose>

      {mode ? (
        <ButtonGroup>
          <SettingButton onClick={handleSave}>Save</SettingButton>
          <SettingButton>Cancel</SettingButton>
        </ButtonGroup>
      ) : (
        <ButtonGroup></ButtonGroup>
      )}
    </Flat>
  );
}

const Flat = styled.div`
  display: flex;

  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px;

  width: calc(100vw - 200px);

  background-color: #ece0af;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const Input = styled.input<{ mode: boolean }>`
  width: 50px;
  background-color: ${(props) => (props.mode ? "lightgray" : "white")};
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

export default Settings;
