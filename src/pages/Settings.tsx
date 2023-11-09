import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ComposeSet from "../components/settings/ComposeSet";
import ComposeView from "../components/settings/ComposeView";
import {
  getDeviceInfo,
  getSettings,
  setUpdateSettingsColRow,
  setInitSettings,
  resetXxmlDevice
} from "../features/api";
import {
  loadDeviceList,
} from "../features/reducers/deviceSlice";
import {
  setCurrentTab,
  setReportTable,
  setTabPage,
} from "../features/reducers/optionSlice";
import { optionState } from "../static/interface";
import TabControlBar from "../components/settings/TabControlBar";

function Settings() {
  const dispatch = useDispatch();
  const [rows, setRow] = useState(0);
  const [columns, setColumn] = useState(0);
  const [mode, setMode] = useState(false);
  const [edit, setEdit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const params  = useParams();

  const optionSet = useSelector(
    (state: optionState) => state.optionReducer.value
  );


  useEffect(() => {
    (async () => {
      try {
        const response = await getSettings();
        console.log("settings getSettings:", response)
        if (response) {
          dispatch(setReportTable(response.settings));

          const keyName = process.env.REACT_APP_CONST_TABINFO_NAME;
          let count = 1;
          if (response.tabSettings.length) {
            ["1", "2", "3", "4", "5"].forEach( async (mainId)=>{
              ["1", "2", "3", "4", "5"].forEach( async (subId)=>{
                const key = `REACT_APP_INIT_REPORT_TYPE${mainId}_SUB${subId}`;
                if (process.env[key]) {
                  dispatch(setTabPage({name: keyName + `${mainId}${subId}`, 
                                       object: response[keyName + `${count++}`]}));
                }
              })
            })
          }

          setRow(response.settings.row);
          setColumn(response.settings.column);
        }
      } catch (error) {
        console.error(error);
      }

      try {
        const response = await getDeviceInfo();
        console.log("settings getDeviceInfo", response);
        dispatch(loadDeviceList(response));
      } catch (error) {
        console.error(error);
      }

      const setting = params.page || "1";
      if (setting === null || setting === "1") {
        setMode(false);
      }

    })();
  }, []);


  useEffect(() => {
    const key = process.env.REACT_APP_CONST_TABINFO_NAME + `${optionSet.selectedTab.main}${optionSet.selectedTab.sub}`;
    dispatch(setCurrentTab(optionSet[key])) 
  }, [optionSet]);

  const handleRow = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRow(Number(e.target.value));
  };


  const handleColumn = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColumn(Number(e.target.value));
  };

  const handleEdit = async () => {
    setEdit(!edit);
  };

  const handleApply = async () => {
    setUpdateSettingsColRow(rows, columns);
    dispatch(setReportTable({ row: rows, column: columns }));
  };

  const handleSetDevice = async () => {
    try {
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
        let id = 1;
        
        ["1", "2", "3", "4", "5"].forEach( async (mainId)=>{
          ["1", "2", "3", "4", "5"].forEach( async (subId)=>{
            if (process.env[`REACT_APP_INIT_REPORT_TYPE${mainId}_SUB${subId}`]) {
              await setInitSettings(process.env.REACT_APP_CONST_TABINFO_NAME + `${id++}`, 
                                    String(process.env.REACT_APP_INIT_TABPAGE_SETTING));
            }
          })
        })

        await setInitSettings("settings", String(process.env.REACT_APP_INIT_GENERAL_SETTING));
        await setInitSettings("tabSetting", String(process.env.REACT_APP_INIT_TAB_SETTING));

        await resetXxmlDevice();

        alert('초기화 되었습니다.');
      }
    } catch (error) {
      console.error("getDeviceInfo", error);
    }
  };

  const handleSignPopup = () => {
    setIsOpen(true) 
  };

  return (
    <Flat>

      {mode ? (
        <>
          <TabControlBar />
          <ComposeSet row={rows} column={columns}></ComposeSet>
        </>
      ) : (
        <>
          <TopBar>
          <InputGroup>
            <label htmlFor="row-input">Rows:</label>
            <Input
              type="number"
              onChange={handleRow}
              readOnly={edit}
              value={rows}
              mode={edit}
            />
          </InputGroup>
          <InputGroup>
            <label htmlFor="column-input">Columns:</label>
            <Input
              type="number"
              onChange={handleColumn}
              readOnly={edit}
              value={columns}
              mode={edit}
            />
          </InputGroup>
          <SettingButton onClick={handleEdit}>편집</SettingButton>
          <SettingButton onClick={handleApply}>Apply</SettingButton>
          <SettingButton onClick={handleSetDevice}>
            device setting
          </SettingButton>
          <SettingButton onClick={handleInitSettings}>initialize</SettingButton>
          {/* <SettingButton onClick={handleSignPopup}>sign</SettingButton> */}
        </TopBar>
        <TabControlBar />
        <ComposeView row={rows} column={columns}></ComposeView>
        </>
      )}
    </Flat>
  );
}

const Flat = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-content: start;
  justify-content: stretch;

  gap: 10px;
  padding: 20px;

  background-color: #F5F5F5;
`;


const TopBar = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  // gap: 20px;
`;

const Input = styled.input<{ mode: boolean }>`
  width: 50px;
  background-color: ${(props) => (props.mode ? "lightgray" : "white")};

  margin: 0px 30px; 
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
