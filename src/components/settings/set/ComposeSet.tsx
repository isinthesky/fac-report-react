import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import UnitTypeW from "./UnitTypeW";
import UnitTypeV from "./UnitTypeV";
import UnitTypeH from "./UnitTypeH";
import TimeDropdowns from "./TimeDropdowns";
import { updateTable, updateDevice, updateTabTimeInfo } from "../../../features/api/device";
import { get_page_time_list } from "../../../features/api/page";
import { setTabUnitPosition, saveTabPage, setSettingSelect } from "../../../features/reducers/tabPageSlice";
import { RootStore } from "../../../store/congifureStore";
import DeviceHeaderSet from "./UnitSettingHeader";
import { setUnitSelectPosition, setdeviceSearchWord, setTimeList } from "../../../features/reducers/settingSlice";
import { ActiveButton, BaseButton,MediumLabel, BaseFlex1Column, BaseFlexCenterDiv } from "../../../static/componentSet";
import UnitGroupListControl from "../group/UnitGroupListControl";
import { STRING_DEFAULT_REFRESH, STRING_DEFAULT_SAVE, STRING_DEFAULT_SAVEALL, STRING_SETTING_DEVICE_UNIT_SELECT, STRING_CONFIRM_SAVE_CHANGES, STRING_CONFIRM_SAVE_ALL_CHANGES } from "../../../static/langSet";
import { COLORSET_ACTIVE_CONTROL_DISABLE, COLORSET_GRID_CONTROL_BG, COLORSET_GRID_CONTROL_BORDER, COLORSET_NORMAL_CONTROL_BG, COLORSET_SETTING_TAB_BG, COLORSET_SIGNITURE_COLOR } from "../../../static/colorSet";
import { CONST_TYPE_INFO_NAMES, CONST_TYPE_INFO_INDEX } from "../../../env";
import { BaseFlex1Row, BaseFlexColumn } from "../../../static/componentSet";

const ComposeSet: React.FC = () => {
  const dispatch = useDispatch();
  const settingSet = useSelector((state: RootStore) => state.settingReducer);
  const tabPageSlice = useSelector((state : RootStore) => state.tabPageReducer);
  const deviceRow = settingSet.unitPostion.row;
  const deviceColumn = settingSet.unitPostion.column;
  const position = deviceColumn + (deviceRow - 1) * deviceColumn - 1;
  
  const [deviceType, setDeviceType] = useState(() => {
    if (deviceColumn !== 0 && deviceRow !== 0 && position >= 0) {
      return tabPageSlice.currentTabPage.tab_table_infos[position]?.type || 0;
    }
    return 0;
  });

  const handleSave = async () => {    
    const confirmed = window.confirm(`${STRING_CONFIRM_SAVE_CHANGES} (${tabPageSlice.currentTabPage.name})`);
    if (!confirmed) {
      return;
    }
    
    const tableInfo = tabPageSlice.currentTabPage.tab_table_infos[position];
    const deviceInfo = tabPageSlice.currentTabPage.tab_table_infos[position].devices;

    console.log("tableInfo", tableInfo, deviceInfo)
    try {
      await updateTable(tableInfo.id, tableInfo.name, tableInfo.type, tableInfo.disable, tableInfo.max_device, tableInfo.search_st, tableInfo.search_div);

      for (const device of deviceInfo) {
        await updateDevice(device.id, device.station_id, device.division_id, device.path_id);
      }

      await updateTabTimeInfo(tabPageSlice.currentTabPage.name,tabPageSlice.currentTabPage.id,tabPageSlice.currentTabPage.times);
    } catch (e) {
      console.error("updateSettingsTabPage error:", e);
    }

    dispatch(saveTabPage());
  };

  const handleSaveAll = async () => {
    const confirmed = window.confirm(STRING_CONFIRM_SAVE_ALL_CHANGES);
    if (!confirmed) {
      return;
    }

    for (const tableInfo of tabPageSlice.currentTabPage.tab_table_infos) {   
      try {
        await updateTable(tableInfo.id, tableInfo.name, tableInfo.type, tableInfo.disable, tableInfo.max_device, tableInfo.search_st, tableInfo.search_div);
      } catch (e) {
        console.error("updateSettingsTabPage error:", e);
      }
    }    

    dispatch(saveTabPage());
  };

  const handleRefresh = () => {
    if (deviceColumn !== 0 && deviceRow !== 0) {
      dispatch(setSettingSelect({mainTab: deviceRow, subTab: deviceColumn}));
    }
  }

  useEffect(() => {
    if (deviceColumn !== 0 && deviceRow !== 0 && position >= 0) {
      setDeviceType(tabPageSlice.currentTabPage.tab_table_infos[position]?.type || 0);
    }
  }, [tabPageSlice, deviceColumn, deviceRow, position]);

  useEffect(() => {
    const getTimeList = async () => {
      const resTimes = await get_page_time_list(tabPageSlice.currentTabPage.name);
      dispatch(setTimeList(resTimes.data));
      console.log("data",tabPageSlice.currentTabPage.name, resTimes.data)
    }
    getTimeList()
  }, [])

  const handleButtonClick = (rowIndex: number, columnIndex: number) => {
    const position = columnIndex + (rowIndex - 1) * deviceColumn - 1;

    dispatch(setUnitSelectPosition({row: rowIndex, column: columnIndex}));
    dispatch(setTabUnitPosition({index: position}));
    dispatch(setdeviceSearchWord(""));
  };

  const renderGridButtons = () => {
    const gridButtons = [];
    const tabInfo = tabPageSlice.currentTabPage;
    for (let r = 0; r < tabInfo.tbl_row; r++) {
      for (let c = 0; c < tabInfo.tbl_column; c++) {

        if ((c+1)+ (r * tabInfo.tbl_column) > tabInfo.tab_table_infos.length) {
          break;
        }

        gridButtons.push(
          <GridButton
            key={`${r}-${c}`}
            onClick={() => handleButtonClick(r + 1, c + 1)}
            data-row={r + 1}
            data-column={c + 1}
            mode = {(deviceRow - 1 === r && deviceColumn - 1 === c) ? "true" : "false"}
          >
            {`${ (c+1)+ (r * tabPageSlice.currentTabPage.tbl_column) }`}
          </GridButton>
        );
      }
    }
    return gridButtons;
  };

  return (
    <PageContainer>
      <BaseFlex1Row>
        <SettingsContainer>
          <SelectUnitContainer>  
            <UnitSelectLabel>
              <MediumLabel>{STRING_SETTING_DEVICE_UNIT_SELECT}</MediumLabel>
            </UnitSelectLabel>
            <GridContainer column={tabPageSlice.currentTabPage.tbl_column}>
              { renderGridButtons() }
            </GridContainer>
          </SelectUnitContainer>
          <DeviceHeaderSet />
        </SettingsContainer>
        <TimeDropdowns/>
        <BaseFlex1Row>
          {deviceType === CONST_TYPE_INFO_INDEX[0] && <UnitTypeV name={CONST_TYPE_INFO_NAMES[deviceType - 1]} />}
          {deviceType === CONST_TYPE_INFO_INDEX[1] && <UnitTypeW name={CONST_TYPE_INFO_NAMES[deviceType - 1]} />}
          {deviceType === CONST_TYPE_INFO_INDEX[2] && <UnitTypeH name={CONST_TYPE_INFO_NAMES[deviceType - 1]} />}
        </BaseFlex1Row>
        <BaseFlexCenterDiv>
          <BaseButton widthsize="40px"> {"< <"}</BaseButton>
        </BaseFlexCenterDiv>
        <UnitGroupListControl settingMode={"apply"}/>
      </BaseFlex1Row>
      <ButtonGroup>
        <BaseButton onClick={handleRefresh}>{STRING_DEFAULT_REFRESH}</BaseButton>
        <ActiveButton onClick={handleSave}>{STRING_DEFAULT_SAVE}</ActiveButton>      
        <ActiveButton onClick={handleSaveAll}>{STRING_DEFAULT_SAVEALL}</ActiveButton>
      </ButtonGroup>
    </PageContainer>
  );
};

const PageContainer = styled(BaseFlex1Column)`
  padding: 15px 30px;
  background-color: ${COLORSET_SETTING_TAB_BG};
`;

const SettingsContainer = styled(BaseFlexColumn)`
  gap: 10px;
`;

const SelectUnitContainer = styled(BaseFlexColumn)`
  gap: 10px;
  padding: 10px 10px 15px 10px;
  align-items: center;
  justify-content: center;

  background-color: ${COLORSET_GRID_CONTROL_BG};
  border: 1px solid ${COLORSET_GRID_CONTROL_BORDER};
`;

const UnitSelectLabel = styled(MediumLabel)`
  align-self: flex-start;
`;

const ButtonGroup = styled(BaseFlexCenterDiv)`
  flex-wrap: wrap;
  padding: 10px;
  gap: 50px;
  background-color: transparent;
`;

const GridContainer = styled.div< {column: number}>`
  display: grid;
  grid-template-columns: repeat(${props => props.column}, 1fr);
  grid-gap: 10px;
  background-color: transparent;
`;

const GridButton = styled.button<{ mode: string }>`
  width : 30px;

  padding: 6px;
  color: white;
  background-color: ${(props) => (props.mode === "true" ? COLORSET_ACTIVE_CONTROL_DISABLE : COLORSET_NORMAL_CONTROL_BG)};
  
  cursor: pointer;
  border: 1px solid ${(props) => (props.mode === "true" ? COLORSET_SIGNITURE_COLOR : COLORSET_NORMAL_CONTROL_BG)};
`;

export default ComposeSet;
