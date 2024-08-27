import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ComposeSet from "../settings/set/ComposeSet";
import ComposeView from "../settings/view/ComposeView";
// import { getSettings } from "../../features/api";
import { getDeviceDict, getStationList, getUnitGroupList} from "../../features/api/device";
import { loadDeviceList, loadStaitionList, loadDivisionList } from "../../features/reducers/deviceSlice";
import { setReportTable } from "../../features/reducers/tabPageSlice";
import { loadUnitGroupList } from "../../features/reducers/unitGroupSlice";
import { setTabPage } from "../../features/reducers/tabPageSlice";
import TabControlBar from "../settings/TabControlBar";
import { BaseFlex1Column } from "../../static/componentSet";
import { COLORSET_BACKGROUND_COLOR } from "../../static/colorSet";
import { CONST_SETTING_MODE_DEVICE, CONST_SETTING_MODE_VIEW, CONST_SETTING_MODE_UNIT, CONST_SETTING_MODE_PRINT } from "../../static/constSet";
import { Unit, IDevice, IDivision, IStation } from "../../static/types";
import UnitGroupSet from "../settings/group/UnitGroupSet";
import { CONST_TABINFO_NAME } from "../../env";
import Header from "../header/Header";
import PageControlBar from "../settings/PageControlBar";
import PrintSetting from "../settings/PrintSetting";
import { RootStore } from "../../store/congifureStore";


function Settings() {
  const dispatch = useDispatch();
  const [mode, setMode] = useState("view");
  const params  = useParams();

  const deviceSet = useSelector((state: RootStore) => state.deviceReducer);
  const tabLength = useSelector((state: RootStore) => state.settingReducer.tabSetting);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const stations = []
        const divisions = []
        const unitGroups = []

        const resStation = await getStationList();

        for (const st of resStation.data) {
          stations.push({id: st.id, name: st.name} as IStation)

          for (const div of st.divisions) {
            divisions.push({id:div.id, station_id: div.station_id, name:div.name} as IDivision)
          }
        }

        console.log("stations", stations)
        console.log("divisions", divisions)
        
        const resDevice = await getDeviceDict();
        const resUnitGroup = await getUnitGroupList();

        console.log("resUnitGroup", resUnitGroup.data)

        for (const unit of resUnitGroup.data) {
          // unit.devices = unit.tab_device_presets;
          unit.div = unit.tab_device_presets[0].division_id;
          unit.st = unit.tab_device_presets[0].station_id;
          unitGroups.push(unit)
        }
        
        dispatch(loadStaitionList(stations));
        dispatch(loadDivisionList(divisions));
        dispatch(loadDeviceList(resDevice.data))    
        dispatch(loadUnitGroupList(unitGroups))
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
