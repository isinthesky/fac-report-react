import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import UnitType from "./UnitType";
import TimeDropdowns from "./TimeDropdowns";
import { updateTable, updateDevice, updateTabTimeInfo, updateTabUserTableInfo } from "../../../entities/api/device";
import { setTabUnitPosition, saveTabPage, setSettingSelect } from "../../../entities/reducers/tabPageSlice";
import { RootStore } from "../../../store/congifureStore";
import DeviceHeaderSet from "./UnitSettingHeader";
import { setUnitSelectPosition, setdeviceSearchWord } from "../../../store/slices/settingSlice";
import { ActiveButton, BaseButton,MediumLabel, BaseFlex1Column, BaseFlexCenterDiv } from "@/static/componentSet";
import UnitGroupListControl from "@/components/features/settings/group/UnitGroupListControl";
import { STRING_DEFAULT_REFRESH, STRING_DEFAULT_SAVE, STRING_DEFAULT_SAVEALL, STRING_SETTING_DEVICE_UNIT_SELECT, STRING_CONFIRM_SAVE_CHANGES, STRING_CONFIRM_SAVE_ALL_CHANGES } from "@/static/langSet";
import { COLORSET_ACTIVE_CONTROL_DISABLE, COLORSET_GRID_CONTROL_BG, COLORSET_GRID_CONTROL_BORDER, COLORSET_NORMAL_CONTROL_BG, COLORSET_SETTING_TAB_BG, COLORSET_SIGNITURE_COLOR } from "../../../static/colorSet";
import { CONST_TYPE_INFO, TypeInfo, TableType } from "@/config/env";
import { isDataTableTypeByInt } from "@/static/utils";
import { BaseFlex1Row, BaseFlexColumn } from "@/static/componentSet";


export const UnitSelector: React.FC = () => {
  const dispatch = useDispatch();
  const tabPageSlice = useSelector((state: RootStore) => state.tabPageReducer);
  const { unitPostion } = useSelector((state: RootStore) => state.settingReducer);

  const handleButtonClick = (rowIndex: number, columnIndex: number) => {
    if (!tabPageSlice.currentTabPage) {
      return;
    }

    const position = (rowIndex - 1) * tabPageSlice.currentTabPage.tbl_column + columnIndex - 1;
  
    dispatch(setUnitSelectPosition({row: rowIndex, column: columnIndex}));
    dispatch(setTabUnitPosition({index: position}));
    dispatch(setdeviceSearchWord(""));
  };

  const renderGridButtons = () => {
    const gridButtons = [];
    
    if (!tabPageSlice.currentTabPage) {
      return [];
    }

    const tabInfo = tabPageSlice.currentTabPage;
  
    for (let r = 0; r < tabInfo.tbl_row; r++) {
      for (let c = 0; c < tabInfo.tbl_column; c++) {
        const buttonIndex = r * tabInfo.tbl_column + c + 1;
        
        if (buttonIndex > tabInfo.tables.length) {
          break;
        }
  
        gridButtons.push(
          <GridButton
            key={`${r}-${c}`}
            onClick={() => handleButtonClick(r + 1, c + 1)}
            data-row={r + 1}
            data-column={c + 1}
            mode={(unitPostion.row === r + 1 && unitPostion.column === c + 1) ? "true" : "false"}
          >
            {buttonIndex}
          </GridButton>
        );
      }
    }
    return gridButtons;
  };

  return (
    <SelectUnitContainer>
      <UnitSelectLabel>
        <MediumLabel>{STRING_SETTING_DEVICE_UNIT_SELECT}</MediumLabel>
      </UnitSelectLabel>
      <GridContainer column={tabPageSlice.currentTabPage?.tbl_column || 0}>
        {renderGridButtons()}
      </GridContainer>
    </SelectUnitContainer>
  );
};

export const useComposeSet = () => {
  const dispatch = useDispatch();
  const settingSet = useSelector((state: RootStore) => state.settingReducer);
  const tabPageSlice = useSelector((state: RootStore) => state.tabPageReducer);
  const { row: deviceRow, column: deviceColumn } = settingSet.unitPostion;

  const [deviceType, setDeviceType] = useState(0);

  useEffect(() => {
    if (!tabPageSlice.currentTabPage) return;

    if (deviceColumn !== 0 && deviceRow !== 0 && tabPageSlice.unitPosition.index >= 0) {
      setDeviceType(tabPageSlice.currentTabPage.tables[tabPageSlice.unitPosition.index]?.type || 0);
    }
  }, [tabPageSlice, deviceColumn, deviceRow, tabPageSlice.unitPosition.index]);

  const handleSave = async () => {
    if (!tabPageSlice.currentTabPage) {
      return;
    }

    const confirmed = window.confirm(`${STRING_CONFIRM_SAVE_CHANGES} (${tabPageSlice.currentTabPage.name})`);
    if (!confirmed) {
      return;
    }
    
    const tableInfo = tabPageSlice.currentTabPage.tables[tabPageSlice.unitPosition.index];
    const deviceInfo = tabPageSlice.currentTabPage.tables[tabPageSlice.unitPosition.index].devices;

    try {
      await updateTable(tableInfo.id, tableInfo.name, tableInfo.type, tableInfo.disable, tableInfo.max_device, tableInfo.search_st, tableInfo.search_div);
      
      await updateTabTimeInfo(tabPageSlice.currentTabPage.name, tabPageSlice.currentTabPage.times);
      
      if (isDataTableTypeByInt(tableInfo.type)) {
        for (const device of deviceInfo) {
          if (device.path_id > 0) {
            await updateDevice(device.id, device.station_id, device.division_id, device.path_id, device.decimal_part_digits);
          }
        }
      } else {
        const userTable = tabPageSlice.currentTabPage.user_tables.find((item) => {
          if (item.idx === tableInfo.idx) {
            return item;
          }
        });

        if (userTable) {
          updateTabUserTableInfo(userTable.id, userTable.idx, userTable.name, userTable.type, userTable.disable, userTable?.user_data);
        }
      }
    } catch (e) {
      console.error("updateSettingsTabPage error:", e);
    }

    dispatch(saveTabPage());
  };

  const handleSaveAll = async () => {
    if (!tabPageSlice.currentTabPage) {
      return;
    }

    const confirmed = window.confirm(STRING_CONFIRM_SAVE_ALL_CHANGES);
    if (!confirmed) {
      return;
    }

    for (const tableInfo of tabPageSlice.currentTabPage.tables) {   
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
      dispatch(setSettingSelect({ mainTab: deviceRow, subTab: deviceColumn }));
    }
  };

  return { handleSave, handleSaveAll, handleRefresh, deviceType };
};

const ComposeSet: React.FC = () => {
  const { currentTabPage } = useSelector((state: RootStore) => state.tabPageReducer);
  const { handleSave, handleSaveAll, handleRefresh, deviceType } = useComposeSet();

  if (!currentTabPage) {
    return null;
  }

  const renderUnitType = () => {
    if (deviceType === 0) {
      return null;
    }

    const typeInfo: TypeInfo | undefined = CONST_TYPE_INFO.find(info => info.index === deviceType);

    if (!typeInfo) {
      return null;
    }

    const { name, keyword } = typeInfo;
    
    return (
      <UnitType
        name={name}
        type={keyword as TableType}
      />
    );
  };

  return (
    <PageContainer>
      <BaseFlex1Row>
        <SettingsContainer>
          <UnitSelector />
          <DeviceHeaderSet />
        </SettingsContainer>
        <TimeDropdowns />
        <BaseFlex1Row>
          {renderUnitType()}
        </BaseFlex1Row>
        <BaseFlexCenterDiv>
          <BaseButton widthsize="40px"> {"< <"}</BaseButton>
        </BaseFlexCenterDiv>
        <UnitGroupListControl settingMode="apply" />
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
