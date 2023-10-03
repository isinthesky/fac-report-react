import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import ComposeSet from "../components/settings/ComposeSet";
import ComposeView from "../components/settings/ComposeView";
import {
  getDeviceInfo,
  getSettings,
  setInitSettings,
  setUpdateSettings,
} from "../features/api";
import {
  loadDeviceList,
  updateDeviceList,
  initDeviceList,
} from "../features/reducers/deviceSlice";
import { setDailySetting } from "../features/reducers/optionSlice";

function Settings() {
  const dispatch = useDispatch();

  const [rows, setRow] = useState(0);
  const [columns, setColumn] = useState(0);
  const [compose, setCompose] = useState([0, 0]);

  const [mode, setMode] = useState(false);
  const [DeviceList, setDeviceList] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const response = await getSettings();

        dispatch(initDeviceList(response.deviceList));

        console.info("setting init getSetting", response);

        if (response) {
          setRow(response.settings.row);
          setColumn(response.settings.column);
          setCompose([response.settings.row, response.settings.column]);

          return;
        }
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
      const isConfirmed = window.confirm(
        "모든 데이터가 초기화 됩니다. \r\n 실행하시겠습니까?"
      );

      if (isConfirmed) {
        await setInitSettings(
          process.env.REACT_APP_INIT_GENERAL_SETTING
            ? process.env.REACT_APP_INIT_GENERAL_SETTING
            : "",
          process.env.REACT_APP_INIT_DEVICE_SETTING
            ? process.env.REACT_APP_INIT_DEVICE_SETTING
            : ""
        );
      }
    } catch (error) {
      console.error("getDeviceInfo", error);
    }
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

      {mode ? (
        <ComposeSet
          row={compose[0]}
          column={compose[1]}
          mode={mode}
        ></ComposeSet>
      ) : (
        <ComposeView
          row={compose[0]}
          column={compose[1]}
          mode={mode}
        ></ComposeView>
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

const SettingButton = styled.button`
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  :hover: {
    background-color: #eeeeee;
  }
`;

export default Settings;
