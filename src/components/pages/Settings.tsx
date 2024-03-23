import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ComposeSet from "../settings/set/ComposeSet";
import ComposeView from "../settings/view/ComposeView";
import { getSettings, setUpdateSettingsColRow } from "../../features/api";
import { getDeviceInfo, getUnitGroupList } from "../../features/api/device";
import { loadDeviceList } from "../../features/reducers/deviceSlice";
import { setReportTable } from "../../features/reducers/settingSlice";
import { updateGroup } from "../../features/reducers/unitGroupSlice";
import { setTabPage } from "../../features/reducers/tabPageSlice";
import TabControlBar from "../settings/TabControlBar";
import { STRING_SETTING_MAIN_BTN_APPLY, STRING_SETTING_MAIN_BTN_DEVSET, STRING_SETTING_MAIN_BTN_EDIT, STRING_SETTING_MAIN_BTN_INIT, STRING_SETTING_MAIN_BTN_PRINTSET, STRING_SETTING_MAIN_BTN_GROUPSET } from "../../static/langSet";
import { BaseFlex1Column, BaseModalBack, BaseFlex1Row, BaseButton, MiniButton, BaseFlexDiv } from "../../static/componentSet";
import { COLORSET_BACKGROUND_COLOR, COLORSET_DISABLE_COLOR, COLORSET_SIGNITURE_COLOR } from "../../static/colorSet";
import { SIZESET_DEFAULT_INPUT_HEIGHT, CONST_SETTING_MODE_DEVICE, CONST_SETTING_MODE_VIEW, CONST_SETTING_MODE_UNIT, CONST_SETTING_MODE_PRINT } from "../../static/constSet";
import { Unit } from "../../static/types";
import UnitGroupSet from "../settings/group/UnitGroupSet";
import { handleInitSettings } from "../settings/set/handleButtons";
import { CONST_TABINFO_NAME } from "../../env";
import Header from "../header/Header";
import PageControlBar from "../settings/PageControlBar";
import PrintSetting from "../settings/PrintSetting";


function Settings() {
  const dispatch = useDispatch();
  const [rows, setRow] = useState(0);
  const [columns, setColumn] = useState(0);
  const [mode, setMode] = useState("view");
  const [edit, setEdit] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const params  = useParams();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resSetting = await getSettings();
        console.log("settings getSettings:", resSetting)
        
        if (resSetting) {
          dispatch(setReportTable(resSetting.settings));
          
          let count = 1;
          
          if (resSetting.tabSetting.length) {
            [1, 2, 3, 4, 5].forEach( async (mainId)=>{
              [1, 2, 3, 4, 5].forEach( async (subId)=>{
                const key = `REACT_APP_INIT_REPORT_TYPE${mainId}_SUB${subId}`;
                if (process.env[key]) {
                  dispatch(setTabPage({mainTab: mainId, subTab: subId, 
                                       object: resSetting[CONST_TABINFO_NAME + `${count++}`]}));
                }
              })
            })
          }

          setRow(resSetting.settings.row);
          setColumn(resSetting.settings.column);
        }

        const resDev = await getDeviceInfo();
        dispatch(loadDeviceList(resDev));

        const resGroupList = await getUnitGroupList();

        resGroupList.value.forEach((item: Unit, pos: number) => {
          dispatch(updateGroup({index: pos, group: item}));
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [dispatch]);


  useEffect(() => {
    if (Object.keys(params).length === 0) {
      setMode("view");
    }
  }, [params]);

  return (
    <Flat>
      <Header mainTab={0} />
      <PageControlBar modeCallback={setMode} mode={mode} />
      
      {mode === CONST_SETTING_MODE_VIEW ? (
        <>
          <TabControlBar />
          <ComposeView row={rows} column={columns}></ComposeView>
        </>
      ) : mode === CONST_SETTING_MODE_DEVICE ? (
        <>
          <TabControlBar />
          <ComposeSet row={rows} column={columns}></ComposeSet>
        </>
      ) : mode === CONST_SETTING_MODE_UNIT ? (
        // <></>
        <UnitGroupSet />
      ) : mode === CONST_SETTING_MODE_PRINT ? (
        <PrintSetting />
      ) : null
      }
    </Flat>
  );
}

const Flat = styled(BaseFlex1Column)`
  background-color: ${COLORSET_BACKGROUND_COLOR};
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
  padding: 5px 15px;m
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

const PrintHeader = styled(BaseFlexDiv)`
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
