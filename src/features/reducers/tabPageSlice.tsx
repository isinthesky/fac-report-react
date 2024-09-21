import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TabPageInfotype, SetTabPageProp, updateCurrentTabPageType, updateCurrenUnitValues, updateCurrenUnitDevice, DeleteDropDownType, SetDropDownType, updateCurrentTabPageUnit, setCurrnetUnitProp, DailySetting, updateCurrentTabPageUserDataType } from "../../static/types";


export interface TabPageState {
  unitPosition: {index:number};
  viewPosition: {main: number, sub: number};
  settingPosition: {main: number, sub: number};
  currentTabPage: TabPageInfotype;
  tabPageInfo: TabPageInfotype[][];
}

const initialState: TabPageState = {
  unitPosition: {index: 0},
  viewPosition: {main: 0, sub: 0},
  settingPosition: {main: 0, sub: 0},
  currentTabPage: {id: 0, name: "", tbl_row:0, tbl_column:0, approves: [], times: Array(4).fill('00:00'), tables: Array(9).fill(0), user_tables: [] },
  tabPageInfo: Array(5).fill(Array(8).fill({id: 0, approves: [], times: Array(4).fill('00:00'), tables: Array(9).fill(0), user_tables: [] }))
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
      state.currentTabPage.tables[action.payload.position] = action.payload.unit;
    },

    setCurrentUnitDevice: (state, action: PayloadAction<updateCurrenUnitDevice>) => {
      state.currentTabPage.tables[action.payload.unitPosition].devices[action.payload.devicePosition] = action.payload.device;
    },

    setCurrentTableValues: (state, action: PayloadAction< updateCurrenUnitValues>) => {
      state.currentTabPage.tables[action.payload.unitPosition].device_values = action.payload.value;
    }, 

    updateCurrentUnit: (
      state,
      action: PayloadAction<updateCurrentTabPageType>
    ) => {
      if (action.payload.arrKey in state.currentTabPage.tables[action.payload.arrPos]) {
        (state.currentTabPage.tables[action.payload.arrPos] as any)[action.payload.arrKey] = action.payload.deviceId;
      }
    },

    updateCurrentTableUserData: (
      state,
      action: PayloadAction<updateCurrentTabPageUserDataType>
    ) => {
      if (action.payload.key in state.currentTabPage.user_tables[action.payload.arrPos]) {
        (state.currentTabPage.user_tables[action.payload.arrPos] as any)[action.payload.key] = action.payload.value;
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
      const tabPage = state.currentTabPage;
      if (tabPage.times.length < 12) {
        state.currentTabPage.times.push('00:00');
      }
    },
    
    removeDropdown: (
      state,
      action: PayloadAction<DeleteDropDownType>
    ) => {
      const tabPage = state.currentTabPage;
      const index = action.payload.index;

      if (tabPage.times.length > 4) {
        state.currentTabPage.times.splice(index, 1);
      }
    },
    
    setTimes: (
      state,
      action: PayloadAction<SetDropDownType>
    ) => {
      const tabPage = state.currentTabPage;
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

export const { setViewSelect, setSettingSelect, setCurrentTab, updateCurrentUnit, setCurrentUnit, setCurrentUnitDevice, setCurrentTableValues,
  saveTabPage, setTabPage, addDropdown, removeDropdown, setTimes, setTabUnitPosition, setReportTable, updateCurrentTableUserData } = tabPageSlice.actions;
export default tabPageSlice.reducer;