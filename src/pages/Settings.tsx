import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import ComposeSet from "../components/settings/ComposeSet";
import ComposeView from "../components/settings/ComposeView";
import {
  getDeviceInfo,
  getSettings,
  setUpdateSettingsColRow,
} from "../features/api";
import {
  loadDeviceList,
  initDeviceList,
} from "../features/reducers/deviceSlice";
import {
  setCurrentDevice,
  setDailySetting,
} from "../features/reducers/optionSlice";
import { RootState } from "../static/interface";

function Settings() {
  const dispatch = useDispatch();

  const [rows, setRow] = useState(0);
  const [columns, setColumn] = useState(0);
  const [mode, setMode] = useState(false);
  
  const [mainTab, setMainTab] = useState(1);
  const [subTab, setSubTab] = useState(1);

  const deviceSet = useSelector(
    (state: RootState) => state.deviceReducer.value
  );

  useEffect(() => {
    (async () => {
      try {
        const response = await getSettings();

        console.log("getSettings res: ", response)

        if (response) {
          dispatch(setDailySetting(response.settings));
          dispatch(initDeviceList(response));

          setRow(response.settings.row);
          setColumn(response.settings.column);
        }
      } catch (error) {
        console.error(error);
      }

      try {
          const response = await getDeviceInfo();
          console.log("reset res ", response);

          dispatch(loadDeviceList(response));
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const key = `deviceList${mainTab}${subTab}`;
        dispatch(setCurrentDevice(deviceSet[key]))
      } catch (error) {
        console.error(error);
      }
    })();
  }, [mainTab, subTab]);

  const handleMainTab = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    const val =  Number(e.target.value)

    if (val > Number(process.env.REACT_APP_INIT_MAINTAB_COUNT) || val <= 0) {
      return;
    }

    setMainTab(val);
  };

  const handleSubTab = (e: React.ChangeEvent<HTMLInputElement>) => {

    const val =  Number(e.target.value)

    if (val > Number(process.env.REACT_APP_INIT_SUBTAB_COUNT) || val <= 0) {
      return;
    }
    
    setSubTab(val);
  };

  const handleRow = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRow(Number(e.target.value));
  };

  const handleColumn = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColumn(Number(e.target.value));
  };

  const handleApply = async () => {
    setUpdateSettingsColRow(rows, columns);
    dispatch(setDailySetting({ row: rows, column: columns }));
  };


  const handleResetDeviceInfo = async () => {
    try {
      setMode(!mode);
    } catch (error) {
      console.error("getDeviceInfo", error);
    }
  };

  const handleInitSettings = async () => {
/*    try {
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
    */
  };

  return (
    <Flat>
      <InputGroup>
        <InputGroup>
          <label htmlFor="row-input">Main Tab:</label>
          <Input
            type="number"
            onChange={handleMainTab}
            readOnly={mode}
            value={mainTab}
            mode={mode}
          />
        </InputGroup>

        <InputGroup>
          <label htmlFor="column-input">Sub Tab:</label>
          <Input
            type="number"
            onChange={handleSubTab}
            readOnly={mode}
            value={subTab}
            mode={mode}
          />
        </InputGroup>

        <InputGroup>
          <label htmlFor="row-input">Rows:</label>
          <Input
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
        <ComposeSet row={rows} column={columns} mainTab={mainTab} subTab={subTab}></ComposeSet>
      ) : (
        <ComposeView row={rows} column={columns} mainTab={mainTab} subTab={subTab}></ComposeView>
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
