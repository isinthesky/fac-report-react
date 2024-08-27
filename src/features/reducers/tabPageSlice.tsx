import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TabPageInfotype, SetTabPageProp, updateCurrentTabPageType, updateCurrenUnitDevice, DeleteDropDownType, SetDropDownType, updateCurrentTabPageUnit, setCurrnetUnitProp, DailySetting, DeviceValue } from "../../static/types";
import { stat } from "fs";

export interface TabPageState {
  unitPosition: {index:number};
  viewPosition: {main: number, sub: number};
  settingPosition: {main: number, sub: number};
  currentTabPage: TabPageInfotype;
  tabPageInfo: TabPageInfotype[][];
}

const initialState: TabPageState = {
  unitPosition: {index: 0},
  viewPosition: {main: 1, sub: 1},
  settingPosition: {main: 1, sub: 1},
  currentTabPage: {id: 0, name: "", tbl_row:0, tbl_column:0, times: Array(4).fill('00:00'), tab_table_infos: Array(9).fill(0) },
  tabPageInfo: Array(5).fill(Array(8).fill({id: 0, times: Array(4).fill('00:00'), tab_table_infos: Array(9).fill(0) }))
};

export const tabPageSlice = createSlice({
  name: "tabPage",
  initialState,
  reducers: {
    setViewSelect: (state, action: PayloadAction<{mainTab: number, subTab: number}>) => {
      const selectedTab = state.tabPageInfo[action.payload.mainTab][action.payload.subTab];
      if (selectedTab) {
        state.currentTabPage = selectedTab;
      }
      state.viewPosition = {main: action.payload.mainTab, sub: action.payload.subTab};
    },

    setSettingSelect: (state, action: PayloadAction<{mainTab: number, subTab: number}>) => {
      const selectedTab = state.tabPageInfo[action.payload.mainTab][action.payload.subTab];
      if (selectedTab) {
        state.currentTabPage = selectedTab;
      }
      state.settingPosition = {main: action.payload.mainTab, sub: action.payload.subTab};
    },

    setCurrentTab: (state, action: PayloadAction<TabPageInfotype>) => {
      state.currentTabPage = action.payload;
    },

    setCurrentUnit: (state, action: PayloadAction<updateCurrentTabPageUnit>) => {
      state.currentTabPage.tab_table_infos[action.payload.position] = action.payload.unit;
    },

    setCurrentUnitDevice: (state, action: PayloadAction<updateCurrenUnitDevice>) => {
      state.currentTabPage.tab_table_infos[action.payload.unitPosition].devices[action.payload.devicePosition] = action.payload.device;
    },

    updateCurrentUnit: (
      state,
      action: PayloadAction<updateCurrentTabPageType>
    ) => {
      if (action.payload.arrKey in state.currentTabPage.tab_table_infos[action.payload.arrPos]) {
        (state.currentTabPage.tab_table_infos[action.payload.arrPos] as any)[action.payload.arrKey] = action.payload.deviceId;
      }
    },

    saveTabPage: (state) => {
      if (state.currentTabPage) {
        if (state.tabPageInfo[state.settingPosition.main][state.settingPosition.sub] ) {
          state.tabPageInfo[state.settingPosition.main][state.settingPosition.sub] = state.currentTabPage;
        }
      }
    },
    
    setTabPage: (state, action: PayloadAction<SetTabPageProp>) => {
      if (state.tabPageInfo[action.payload.mainTab][action.payload.subTab] ) {
        state.tabPageInfo[action.payload.mainTab][action.payload.subTab] = action.payload.tabInfo;
      }
    },

    setTabUnitPosition: (state, action: PayloadAction<setCurrnetUnitProp>) => {
      state.unitPosition.index = action.payload.index;
    },

    addDropdown: (
      state
    ) => {
      const tabPage = state.tabPageInfo[state.settingPosition.main][state.settingPosition.sub];

      if (tabPage.times.length < 12) {
        tabPage.times.push('00:00');
        state.currentTabPage.times.push('00:00');
      }
    },
    
    removeDropdown: (
      state,
      action: PayloadAction<DeleteDropDownType>
    ) => {
      const tabPage = state.tabPageInfo[state.settingPosition.main][state.settingPosition.sub];
      const index = action.payload.index;

      if (tabPage.times.length > 4) {
        tabPage.times.splice(index, 1);
        state.currentTabPage.times.splice(index, 1);
      }
    },
    
    setTimes: (
      state,
      action: PayloadAction<SetDropDownType>
    ) => {
      const tabPage = state.tabPageInfo[state.settingPosition.main][state.settingPosition.sub];
      const index = action.payload.index;

      tabPage.times[index] = String(action.payload.time);
      tabPage.times.sort();

      state.currentTabPage.times[index] = String(action.payload.time);
      state.currentTabPage.times.sort();
    },

    setReportTable: (
      state, 
      action: PayloadAction<DailySetting>
    ) => {
      const tabPage = state.tabPageInfo[state.settingPosition.main][state.settingPosition.sub];
      tabPage.tbl_row = action.payload.row;
      tabPage.tbl_column = action.payload.column;
    }
  },
});

export const { setViewSelect, setSettingSelect, setCurrentTab, updateCurrentUnit, setCurrentUnit, setCurrentUnitDevice, 
  saveTabPage, setTabPage, addDropdown, removeDropdown, setTimes, setTabUnitPosition, setReportTable } = tabPageSlice.actions;
export default tabPageSlice.reducer;