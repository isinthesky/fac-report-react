import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import styled from "styled-components";
import ComposeSet from "../settings/set/ComposeSet";
import ComposeView from "../settings/view/ComposeView";
import { getDeviceDict, getStationList, getUnitGroupList} from "../../features/api/device";
import { loadDeviceList, loadStaitionList, loadDivisionList } from "../../features/reducers/deviceSlice";
import { loadUnitGroupList } from "../../features/reducers/unitGroupSlice";
import TabControlBar from "../settings/TabControlBar";
import { BaseFlex1Column } from "../../static/componentSet";
import { COLORSET_BACKGROUND_COLOR } from "../../static/colorSet";
import { CONST_SETTING_MODE_DEVICE, CONST_SETTING_MODE_VIEW, CONST_SETTING_MODE_UNIT, CONST_SETTING_MODE_PRINT } from "../../static/constSet";
import { IDivision, IStation } from "../../static/types";
import UnitGroupSet from "../settings/group/UnitGroupSet";
import Header from "../header/Header";
import PageControlBar from "../settings/PageControlBar";
import PrintSetting from "../settings/PrintSetting";
import { RootStore } from "../../store/congifureStore";
import { setApproves } from "../../features/reducers/settingSlice"
import { setSettingSelect } from "../../features/reducers/tabPageSlice";
import { fetchPageSettings } from "../../features/api/common";

function Settings() {
  const dispatch = useDispatch();
  const [mode, setMode] = useState("view");
  const params  = useParams();
  const location = useLocation();
  const tabPageSlice = useSelector((state: RootStore) => state.tabPageReducer);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const stations = []
        const divisions = []
        const resStation = await getStationList();

        for (const st of resStation.data) {
          stations.push({id: st.id, name: st.name} as IStation)

          for (const div of st.divisions) {
            divisions.push({id:div.id, station_id: div.station_id, name:div.name} as IDivision)
          }
        }

        const resDevice = await getDeviceDict();
        const resUnitGroup = await getUnitGroupList();
        
        dispatch(loadStaitionList(stations));
        dispatch(loadDivisionList(divisions));
        dispatch(loadDeviceList(resDevice.data));
        dispatch(loadUnitGroupList(resUnitGroup.data));

        const settingMainTab = (tabPageSlice.settingPosition.main === 0) ? 1 : tabPageSlice.settingPosition.main;
        const settingSubTab = (tabPageSlice.settingPosition.sub === 0) ? 1 : tabPageSlice.settingPosition.sub;
        const pageInfo = tabPageSlice.tabPageInfo[settingMainTab][settingSubTab];

        if (!pageInfo.name) {
          await fetchPageSettings(dispatch, null);
        }

        dispatch(setSettingSelect({mainTab: settingMainTab, subTab: settingSubTab}))
        dispatch(setApproves(tabPageSlice.tabPageInfo[settingMainTab][settingSubTab].approves))

      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (Object.keys(params).length === 0) {
      setMode("view");
    }
    // Check if the page was accessed via URL or navigate function
    if (location.state && location.state.fromNavigate) {
      console.log("Page accessed via navigate function");
    } else {
      console.log("Page accessed via URL");
    }
  }, [params, location]);

  return (
    <Flat>
      <Header paramMain={0} />
      <PageControlBar modeCallback={setMode} mode={mode} />
      {mode === CONST_SETTING_MODE_VIEW ? (
        <>
          <TabControlBar showInit={true} />
          <ComposeView />
        </>
      ) : mode === CONST_SETTING_MODE_DEVICE ? (
        <>
          <TabControlBar showInit={false} />
          <ComposeSet />
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
