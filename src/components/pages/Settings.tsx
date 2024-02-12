import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ComposeSet from "../settings/set/ComposeSet";
import ComposeView from "../settings/view/ComposeView";
import { getSettings, setUpdateSettingsColRow } from "../../features/api";
import { getDeviceInfo, getUnitGroupList } from "../../features/api/device";
import { loadDeviceList } from "../../features/reducers/deviceSlice";
import { setReportTable } from "../../features/reducers/settingSlice";
import { setCurrentTab, setTabPage } from "../../features/reducers/tabPageSlice";
import TabControlBar from "../settings/TabControlBar";
import PrintSetting from "../PrintSetting";
import { RootStore } from "../../store/congifureStore";
import { SIZESET_DEFAULT_INPUT_HEIGHT } from "../../static/constSet";
import { STRING_SETTING_MAIN_BTN_APPLY, STRING_SETTING_MAIN_BTN_DEVSET, STRING_SETTING_MAIN_BTN_EDIT, STRING_SETTING_MAIN_BTN_INIT, STRING_SETTING_MAIN_BTN_PRINTSET, STRING_SETTING_MAIN_BTN_GROUPSET } from "../../static/langSet";
import UnitGroupSet from "../settings/group/UnitGroupSet";
import { TabKeys, TabPageInfotype, Unit } from "../../static/types";
import { handleInitSettings } from "../settings/set/handleButtons";
import { BaseFlex1Column, BaseModalBack, BaseFlex1Row, BaseButton, MiniButton, BaseLabel, BaseFlexDiv } from "../../static/componentSet";
import { CONST_TABINFO_NAME } from "../../env";
import { updateGroup } from "../../features/reducers/unitGroupSlice";
import { COLORSET_DISABLE_COLOR, COLORSET_SIGNITURE_COLOR } from "../../static/colorSet";


function Settings() {
  const dispatch = useDispatch();
  const [rows, setRow] = useState(0);
  const [columns, setColumn] = useState(0);
  const [mode, setMode] = useState(0);
  const [edit, setEdit] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const params  = useParams();

  const settingSlice = useSelector((state: RootStore) => state.settingReducer);
  const tabPageSlice = useSelector((state : RootStore) => state.tabPageReducer);
  
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
            [1, 2, 3, 4, 5].forEach( async (mainId)=>{
              [1, 2, 3, 4, 5].forEach( async (subId)=>{
                const key = `REACT_APP_INIT_REPORT_TYPE${mainId}_SUB${subId}`;
                if (process.env[key]) {
                  dispatch(setTabPage({mainTab: mainId, subTab: subId, object: response[keyName + `${count++}`]}));
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

      try {
        const response = await getUnitGroupList();

        response.data.map((item:Unit, pos:number) => {
          dispatch(updateGroup({index: pos, group: item}))
        })
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
    const key = CONST_TABINFO_NAME + `${settingSlice.selectedTab.main}${settingSlice.selectedTab.sub}` as TabKeys;

    dispatch(setCurrentTab(tabPageSlice.tabPageInfo[settingSlice.selectedTab.main][settingSlice.selectedTab.sub] as TabPageInfotype)) 
  }, [settingSlice]);

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
              <BaseLabel>Rows:</BaseLabel>
              <Input
                type="number"
                onChange={handleRow}
                readOnly={edit}
                value={rows}
                mode={String(edit)}
                min="1"
                max="3"
              />
              <BaseLabel>Columns:</BaseLabel>
              <Input
                type="number"
                onChange={handleColumn}
                readOnly={edit}
                value={columns}
                mode={String(edit)} 
                min="1"
                max="4"
              />
              <SettingButton onClick={handleEdit}>{STRING_SETTING_MAIN_BTN_EDIT}</SettingButton>
              <SettingButton onClick={handleApply}>{STRING_SETTING_MAIN_BTN_APPLY}</SettingButton>
            </InputGroup>
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
        // <></>
        <UnitGroupSet />
      ) : null
      }
    </Flat>
  );
}

const Flat = styled(BaseFlex1Column)`
  align-content: start;
  justify-content: stretch;

  padding: 20px;

  background-color: #F5F5F5;
`;


const TopBar = styled(BaseFlex1Row)`
  align-items: center;
  justify-content: center;

  padding: 10px;
`;

const InputGroup = styled(BaseFlex1Row)`
  align-items: center;
  padding-left: 25px;
`;

const Input = styled.input<{ mode: string, heightsize?: string, disable?:string }>`
  text-align: center;
  width: 50px;
  height: ${(props) => props.heightsize || SIZESET_DEFAULT_INPUT_HEIGHT};

  background-color: ${(props) => (props.mode === "true" ? COLORSET_DISABLE_COLOR : "white")};

  margin: 0px 10px; 
`;

const SettingButton = styled(BaseButton)`
  padding: 5px 15px;
  margin: 0px 10px;
  
  border: none;
  border-radius: 5px;

  background-color: white;
`;


const ModalView = styled.div.attrs((props) => ({
  role: 'dialog',
}))`
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 20px;
  width: 500px;
  height: 260px;
  background-color: #ffffff;
`;

const Header = styled(BaseFlexDiv)`
  flex-direction: row;
  align-self: stretch;
  justify-content: end;
`;

const ExitBtn = styled(MiniButton)<{ bgColor?: string }>`
  margin: 10px;
  width: 30px;
  height: 30px;

  font-size: 20px;

  color: white;
  background-color: ${(props) => props.bgColor || COLORSET_SIGNITURE_COLOR};
  border-radius: 10px;
`;

export default Settings;
