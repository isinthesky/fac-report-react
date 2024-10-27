import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TabPageInfotype, SetTabPageProp, updateCurrentTabPageType, updateCurrenUnitValues, updateCurrenUnitDevice, DeleteDropDownType, SetDropDownType, updateCurrentTabPageUnit, setCurrnetUnitProp, DailySetting, updateCurrentTabPageUserDataType } from "../../static/types";


export interface TabPageState {
  unitPosition: {index:number};
  viewPosition: {main: number, sub: number};
  settingPosition: {main: number, sub: number};
  currentTabPage: TabPageInfotype | null;
  tabPageInfo: TabPageInfotype[][];
}

const initialState: TabPageState = {
  unitPosition: {index: 0},
  viewPosition: {main: 0, sub: 0},
  settingPosition: {main: 0, sub: 0},
  currentTabPage: null,
  tabPageInfo: Array.from({ length: 5 }, () =>
    Array.from({ length: 10 }, () => ({
      id: 0,
      name: "",
      tbl_row: 0,
      tbl_column: 0,
      approves: [],
      times: Array(4).fill('00:00'),
      tables: Array(9).fill(0),
      user_tables: []
    }))
  )
};

export const tabPageSlice = createSlice({
  name: "tabPage",
  initialState,
  reducers: {
    setViewSelect: (state, action: PayloadAction<{mainTab: number, subTab: number}>) => {
      const { mainTab, subTab } = action.payload;

      // Only update if the tab is actually changing
      if (
        state.viewPosition.main !== mainTab ||
        state.viewPosition.sub !== subTab
      ) {
        const selectedTab = state.tabPageInfo[mainTab][subTab];
        if (selectedTab) {
          state.currentTabPage = { ...selectedTab }; // Create a new object
          state.viewPosition = { main: mainTab, sub: subTab };
        }
      }
    },

    setSettingSelect: (state, action: PayloadAction<{mainTab: number, subTab: number}>) => {
      const { mainTab, subTab } = action.payload;
      const selectedTab = state.tabPageInfo[mainTab][subTab];
      if (selectedTab) {
        state.currentTabPage = selectedTab;
      }
      state.settingPosition = {main: mainTab, sub: subTab};
    },

    setCurrentTab: (state, action: PayloadAction<TabPageInfotype>) => {
      state.currentTabPage = action.payload;
    },

    setCurrentUnit: (state, action: PayloadAction<updateCurrentTabPageUnit>) => {
      if (state.currentTabPage) {
        state.currentTabPage.tables[action.payload.position] = action.payload.unit;
      }
    },

    setCurrentUnitDevice: (state, action: PayloadAction<updateCurrenUnitDevice>) => {
      if (state.currentTabPage) {
        state.currentTabPage.tables[action.payload.unitPosition].devices[action.payload.devicePosition] = action.payload.device;
      }
    },

    setCurrentTableValues: (state, action: PayloadAction< updateCurrenUnitValues>) => {
      if (state.currentTabPage) {
        state.currentTabPage.tables[action.payload.unitPosition].device_values = action.payload.value;
      }
    }, 

    updateCurrentUnit: (
      state,
      action: PayloadAction<updateCurrentTabPageType>
    ) => {
      if (state.currentTabPage) {
        if (action.payload.arrKey in state.currentTabPage.tables[action.payload.arrPos]) {
          (state.currentTabPage.tables[action.payload.arrPos] as any)[action.payload.arrKey] = action.payload.deviceId;
        }
      }
    },

    updateCurrentTableUserData: (
      state,
      action: PayloadAction<updateCurrentTabPageUserDataType>
    ) => {
      if (state.currentTabPage) {
        if (action.payload.key in state.currentTabPage.user_tables[action.payload.arrPos]) {
          (state.currentTabPage.user_tables[action.payload.arrPos] as any)[action.payload.key] = action.payload.value;
        }
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
      const { mainTab, subTab, tabInfo } = action.payload;
      if (state.tabPageInfo[mainTab][subTab] ) {
        state.tabPageInfo[mainTab][subTab] = tabInfo;
      }
    },

    setTabUnitPosition: (state, action: PayloadAction<setCurrnetUnitProp>) => {
      state.unitPosition.index = action.payload.index;
    },

    addDropdown: (
      state
    ) => {
      if (state.currentTabPage) {
        const tabPage = state.currentTabPage;
        if (tabPage.times.length < 12) {
          state.currentTabPage.times.push('00:00');
        }
      }
    },
    
    removeDropdown: (
      state,
      action: PayloadAction<DeleteDropDownType>
    ) => {
      if (state.currentTabPage) {
        const tabPage = state.currentTabPage;
        const index = action.payload.index;

        if (tabPage.times.length > 4) {
          state.currentTabPage.times.splice(index, 1);
        }
      }
    },
    
    setTimes: (
      state,
      action: PayloadAction<SetDropDownType>
    ) => {
      if (state.currentTabPage) {
        const tabPage = state.currentTabPage;
        const index = action.payload.index;

        tabPage.times[index] = String(action.payload.time);
        tabPage.times.sort();

        state.currentTabPage.times[index] = String(action.payload.time);
        state.currentTabPage.times.sort();
      }
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
