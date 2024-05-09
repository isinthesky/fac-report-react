import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ComposeSet from "../settings/set/ComposeSet";
import ComposeView from "../settings/view/ComposeView";
import { getSettings } from "../../features/api";
import { getDeviceInfo, getUnitGroupList } from "../../features/api/device";
import { loadDeviceList } from "../../features/reducers/deviceSlice";
import { setReportTable } from "../../features/reducers/settingSlice";
import { updateGroup } from "../../features/reducers/unitGroupSlice";
import { setTabPage } from "../../features/reducers/tabPageSlice";
import TabControlBar from "../settings/TabControlBar";
import { BaseFlex1Column } from "../../static/componentSet";
import { COLORSET_BACKGROUND_COLOR } from "../../static/colorSet";
import { CONST_SETTING_MODE_DEVICE, CONST_SETTING_MODE_VIEW, CONST_SETTING_MODE_UNIT, CONST_SETTING_MODE_PRINT } from "../../static/constSet";
import { Unit } from "../../static/types";
import UnitGroupSet from "../settings/group/UnitGroupSet";
import { CONST_TABINFO_NAME } from "../../env";
import Header from "../header/Header";
import PageControlBar from "../settings/PageControlBar";
import PrintSetting from "../settings/PrintSetting";


function Settings() {
  const dispatch = useDispatch();
  const [rows, setRow] = useState(0);
  const [columns, setColumn] = useState(0);
  const [mode, setMode] = useState("view");
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
          <TabControlBar showInit={true} />
          <ComposeView />
        </>
      ) : mode === CONST_SETTING_MODE_DEVICE ? (
        <>
          <TabControlBar showInit={false} />
          <ComposeSet row={rows} column={columns}></ComposeSet>
        </>
      ) : mode === CONST_SETTING_MODE_UNIT ? (
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
  gap: 0px;
`;

export default Settings;
