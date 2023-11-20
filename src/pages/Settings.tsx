import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ComposeSet from "../components/settings/set/ComposeSet";
import ComposeView from "../components/settings/view/ComposeView";
import { getSettings, setUpdateSettingsColRow } from "../features/api";
import { getDeviceInfo } from "../features/api/device";
import { loadDeviceList } from "../features/reducers/deviceSlice";
import { setReportTable } from "../features/reducers/settingSlice";
import { setCurrentTab, setTabPage } from "../features/reducers/tabPageSlice";
import TabControlBar from "../components/settings/TabControlBar";
import PrintSetting from "../components/PrintSetting";
import { RootStore } from "../store/congifureStore";
import {STRING_SETTING_MAIN_BTN_APPLY, STRING_SETTING_MAIN_BTN_DEVSET, STRING_SETTING_MAIN_BTN_EDIT, STRING_SETTING_MAIN_BTN_INIT, STRING_SETTING_MAIN_BTN_PRINTSET, STRING_SETTING_MAIN_BTN_GROUPSET } from "../static/consts";
import UnitGroupSet from "../components/settings/group/UnitGroupSet";
import { TabKeys, TabPageInfotype } from "../static/types";
import { handleInitSettings } from "../components/settings/set/handleButtons";
import { BaseModalBack, BaseRow } from "../static/styledComps";


function Settings() {
  const dispatch = useDispatch();
  const [rows, setRow] = useState(0);
  const [columns, setColumn] = useState(0);
  const [mode, setMode] = useState(0);
  const [edit, setEdit] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const params  = useParams();

  const settingSet = useSelector((state: RootStore) => state.settingReducer);
  const tabPageSet = useSelector((state : RootStore) => state.tabPageReducer);
  
  useEffect(() => {
    (async () => {
      try {
        const response = await getSettings();
        // console.log("settings getSettings:", response)
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
        dispatch(loadDeviceList(response));
      } catch (error) {
        console.error(error);
      }

    })();
  }, []);


  useEffect(() => {
    if (Object.keys(params).length === 0) {
      setMode(0);
    }
  }, [params]);

  useEffect(() => {
    const key = process.env.REACT_APP_CONST_TABINFO_NAME + `${settingSet.selectedTab.main}${settingSet.selectedTab.sub}` as TabKeys;

    dispatch(setCurrentTab(tabPageSet[key] as TabPageInfotype)) 
  }, [settingSet]);

  const handleRow = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRow(Number(e.target.value));
  };

  const handleColumn = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColumn(Number(e.target.value));
  };

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleApply = () => {
    setUpdateSettingsColRow(rows, columns);
    dispatch(setReportTable({ row: rows, column: columns }));
  };

  const handleApproveSetting = () => {
    setIsOpen(false) 
  }

  const handleSetDevice = () => {
    try {
      setMode(1);
    } catch (error) {
      console.error("getDeviceInfo", error);
    }
  };


  const handleUnitGroup = () => {
    try {
      setMode(2);
    } catch (error) {
      console.error("getDeviceInfo", error);
    }
  };


  const handleSignPopup = () => {
    setIsOpen(true) 
  };

  return (
    <Flat>
      {mode === 1 ? (
        <>
          <TabControlBar />
          <ComposeSet row={rows} column={columns}></ComposeSet>
        </>
      ) : mode === 0 ? (
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
            <SettingButton onClick={handleEdit}>{STRING_SETTING_MAIN_BTN_EDIT}</SettingButton>
            <SettingButton onClick={handleApply}>{STRING_SETTING_MAIN_BTN_APPLY}</SettingButton>
            <SettingButton onClick={handleSetDevice}>
              {STRING_SETTING_MAIN_BTN_DEVSET}
            </SettingButton>
            <SettingButton onClick={handleInitSettings}>{STRING_SETTING_MAIN_BTN_INIT}</SettingButton>
            <SettingButton onClick={handleUnitGroup}>{STRING_SETTING_MAIN_BTN_GROUPSET}</SettingButton>
            <SettingButton onClick={handleSignPopup}>{STRING_SETTING_MAIN_BTN_PRINTSET}</SettingButton>
          </TopBar>
        <TabControlBar />
        <ComposeView row={rows} column={columns}></ComposeView>
        {isOpen ? 
          <BaseModalBack onClick={handleApproveSetting}>
            <ModalView onClick={(e) => e.stopPropagation()}>
              <Header>
                <ExitBtn onClick={handleApproveSetting}>x</ExitBtn>
              </Header>
              <PrintSetting />
            </ModalView>
          </BaseModalBack>
          : null
        } 
      </>
      
      ) : mode === 2 ? (
        <UnitGroupSet />
      ) : null
      }
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


const TopBar = styled(BaseRow)`
  align-items: center;
  justify-content: center;
`;

const InputGroup = styled(BaseRow)`
  align-items: center;
`;

const Input = styled.input<{ mode: boolean }>`
  width: 50px;
  background-color: ${(props) => (props.mode ? "lightgray" : "white")};

  margin: 0px 30px; 
`;

const SettingButton = styled.button`
  padding: 5px 15px;
  margin: 0px 10px;
  
  border: none;
  border-radius: 5px;

  font-size: 1em;
  background-color: white;
`;


const ModalView = styled.div.attrs((props) => ({
  role: 'dialog',
}))`
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 20px;
  width: 600px;
  height: 300px;
  background-color: #ffffff;
`;

const Header = styled.div`
  // flex: 1;
  display: flex;
  flex-direction: row;
  align-self: stretch;
  justify-content: end;
`;


const ModalBtn = styled.button`
  background-color: var(--coz-purple-600);
  text-decoration: none;
  border: none;
  padding: 20px;
  color: white;
  border-radius: 30px;
  cursor: grab;
  font-size: 1em;
`;

const ExitBtn = styled(ModalBtn) `
background-color : #4000c7;
border-radius: 10px;
text-decoration: none;
margin: 10px;
padding: 5px 10px;
width: 30px;
height: 30px;
display : flex;
justify-content : center;
align-items : center;
align-self : end;
`;

export default Settings;
