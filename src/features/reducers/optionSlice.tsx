import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updateCurrentTabPageType, AddDropDownType, DeleteDropDownType, SetDropDownType, TabPageInfotype, Unit, ApprovalsType } from "../../static/types";
import { SetTabPageProp } from "../../static/interface";

interface DailySetting {
  row: number;
  column: number;
}

interface SelectedTab {
  main: number;
  sub: number;
}

interface TabSetting {
  length: number;
}

interface OptionState {
  value: {
    date: number;
    daily: DailySetting;
    tabSetting: TabSetting;
    selectedTab: SelectedTab,
    currentTabPage: TabPageInfotype;
    savedApprovals: ApprovalsType[]; 
    viewType: number;
    tabPageInfo11: TabPageInfotype;
    tabPageInfo12: TabPageInfotype;
    tabPageInfo13: TabPageInfotype;
    tabPageInfo14: TabPageInfotype;
    tabPageInfo21: TabPageInfotype;
    tabPageInfo22: TabPageInfotype;
    tabPageInfo23: TabPageInfotype;
    tabPageInfo24: TabPageInfotype;
    tabPageInfo31: TabPageInfotype;
    tabPageInfo32: TabPageInfotype;
    tabPageInfo33: TabPageInfotype;
    tabPageInfo34: TabPageInfotype;
    tabPageInfo41: TabPageInfotype;
    tabPageInfo42: TabPageInfotype;
    tabPageInfo43: TabPageInfotype;
    tabPageInfo44: TabPageInfotype;
  };
}

const initialState: OptionState = {
  value: {
    date: new Date().getTime(),
    daily: { row: 3, column: 2 },
    tabSetting: { length: Number(process.env.REACT_APP_INIT_TAB_COUNT) },
    selectedTab: {main:1, sub:1},
    currentTabPage: {id: 0, times: Array(4).fill('00:00'), unitList: [] },
    savedApprovals: [{checked:false, text:""},{checked:false, text:""},{checked:false, text:""}],
    viewType: 0,
    tabPageInfo11: {id: 11, times: Array(4).fill('00:00'), unitList: [] },
    tabPageInfo12: {id: 12, times: Array(4).fill('00:00'), unitList: [] },
    tabPageInfo13: {id: 13, times: Array(4).fill('00:00'), unitList: [] },
    tabPageInfo14: {id: 14, times: Array(4).fill('00:00'), unitList: [] },
    tabPageInfo21: {id: 21, times: Array(4).fill('00:00'), unitList: [] },
    tabPageInfo22: {id: 22, times: Array(4).fill('00:00'), unitList: [] },
    tabPageInfo23: {id: 23, times: Array(4).fill('00:00'), unitList: [] },
    tabPageInfo24: {id: 24, times: Array(4).fill('00:00'), unitList: [] },
    tabPageInfo31: {id: 31, times: Array(4).fill('00:00'), unitList: [] },
    tabPageInfo32: {id: 32, times: Array(4).fill('00:00'), unitList: [] },
    tabPageInfo33: {id: 33, times: Array(4).fill('00:00'), unitList: [] },
    tabPageInfo34: {id: 34, times: Array(4).fill('00:00'), unitList: [] },
    tabPageInfo41: {id: 41, times: Array(4).fill('00:00'), unitList: [] },
    tabPageInfo42: {id: 42, times: Array(4).fill('00:00'), unitList: [] },
    tabPageInfo43: {id: 43, times: Array(4).fill('00:00'), unitList: [] },
    tabPageInfo44: {id: 44, times: Array(4).fill('00:00'), unitList: [] },
  },
};

type TabKeys = 'tabPageInfo11' | 'tabPageInfo12' | 'tabPageInfo13' | `tabPageInfo14` | 'tabPageInfo21' | 'tabPageInfo22' | 'tabPageInfo23' | `tabPageInfo24` | 'tabPageInfo31' | 'tabPageInfo32' | 'tabPageInfo33' | `tabPageInfo34` | 'tabPageInfo41' | 'tabPageInfo42' | 'tabPageInfo43' | `tabPageInfo44`;

export const optionSlice = createSlice({
  name: "option",
  initialState,
  reducers: {
    setReportTable: (state, action: PayloadAction<DailySetting>) => {
      state.value.daily = action.payload;
    },

    setTableDate: (state, action: PayloadAction<number>) => {
      state.value.date = action.payload;
    },

    setTabSetting: (state, action: PayloadAction<TabSetting>) => {
      state.value.tabSetting = action.payload;
    },

    setViewType: (state, action: PayloadAction<number>) => {
      console.log("setViewType", action.payload)
      state.value.viewType = action.payload;
    },

    setSelectTab: (state, action: PayloadAction<SelectedTab>) => {
      console.log("selectedTab", action.payload)
      state.value.selectedTab = action.payload;
    },
    
    setCurrentTab: (state, action: PayloadAction<TabPageInfotype>) => {
      console.log("setCurrentTabPage", action.payload)
      state.value.currentTabPage = action.payload;
    },

    updateCurrentTab: (
      state,
      action: PayloadAction<updateCurrentTabPageType>
    ) => {
      console.log("updateCurrentTab", action.payload)
      if (action.payload.arrKey in state.value.currentTabPage.unitList[action.payload.arrPos]) {
        (state.value.currentTabPage.unitList[action.payload.arrPos] as any)[action.payload.arrKey] = action.payload.deviceId;
      }
    },
    
    updateTabPage: (state, action: PayloadAction<SetTabPageProp>) => {
      const key = action.payload.name as TabKeys;
      if (state.value[key]) {
        state.value[key] = action.payload.object;
        console.log("tab val :", action.payload)
      }
    },

    setTabPage: (state, action: PayloadAction<SetTabPageProp>) => {
      const key = action.payload.name as TabKeys;
      if (state.value[key]) {
        state.value[key] = action.payload.object;
        console.log("tab val :", action.payload)
      }
    },
    
    addDropdown: (
      state,
      action: PayloadAction<AddDropDownType>
    ) => {
      const keyName = process.env.REACT_APP_CONST_TABINFO_NAME;
      const key = keyName + `${action.payload.mainTab}${action.payload.subTab}` as TabKeys;
      if (state.value[key].times.length < 12) {
        state.value[key].times.push('00:00');
        state.value.currentTabPage.times.push('00:00');
      }
    },
    
    removeDropdown: (
      state,
      action: PayloadAction<DeleteDropDownType>
    ) => {
      const keyName = process.env.REACT_APP_CONST_TABINFO_NAME;
      const key = keyName + `${action.payload.mainTab}${action.payload.subTab}` as TabKeys;
      if (state.value[key].times.length > 4) {
          state.value[key].times.splice(action.payload.index, 1);
          state.value.currentTabPage.times.splice(action.payload.index, 1);
      }
    },
    
    setTimes: (
      state,
      action: PayloadAction<SetDropDownType>
    ) => {
      const keyName = process.env.REACT_APP_CONST_TABINFO_NAME;
      const key = keyName + `${action.payload.mainTab}${action.payload.subTab}` as TabKeys;
      state.value[key].times[action.payload.index] = String(action.payload.time);
      state.value[key].times.sort();
      state.value.currentTabPage.times[action.payload.index] = String(action.payload.time);
      state.value.currentTabPage.times.sort();
    },

    setApproves: (
      state,
      action: PayloadAction<ApprovalsType[]>
    ) => {
      state.value.savedApprovals = action.payload
    }
  },
});

export const { setReportTable, setTabSetting, setSelectTab, setTableDate, setViewType, setCurrentTab, updateCurrentTab, setTabPage, updateTabPage, addDropdown, removeDropdown, setTimes, setApproves } =
  optionSlice.actions;

export default optionSlice.reducer;
