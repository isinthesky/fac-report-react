import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TabPageInfotype, SetTabPageProp, updateCurrentTabPageType, AddDropDownType, DeleteDropDownType, SetDropDownType, updateCurrentTabPageUnit, TabKeys } from "../../static/types";


export interface TabPageState {
  unitPosition: {index:number, times:string[]};
  currentTabPage: TabPageInfotype;
  [key: string]: TabPageInfotype | {index:number};
}

const initialState: TabPageState = {
  unitPosition: {index: 0, times:[] },
  currentTabPage: {id: 0, times: Array(4).fill('00:00'), unitList: [] },
  tabPageInfo11: {id: 0, times: Array(4).fill('00:00'), unitList: [] },
  tabPageInfo12: {id: 0, times: Array(4).fill('00:00'), unitList: [] },
  tabPageInfo13: {id: 0, times: Array(4).fill('00:00'), unitList: [] },
  tabPageInfo14: {id: 0, times: Array(4).fill('00:00'), unitList: [] },
  tabPageInfo21: {id: 0, times: Array(4).fill('00:00'), unitList: [] },
  tabPageInfo22: {id: 0, times: Array(4).fill('00:00'), unitList: [] },
  tabPageInfo23: {id: 0, times: Array(4).fill('00:00'), unitList: [] },
  tabPageInfo24: {id: 0, times: Array(4).fill('00:00'), unitList: [] },
  tabPageInfo31: {id: 0, times: Array(4).fill('00:00'), unitList: [] },
  tabPageInfo32: {id: 0, times: Array(4).fill('00:00'), unitList: [] },
  tabPageInfo33: {id: 0, times: Array(4).fill('00:00'), unitList: [] },
  tabPageInfo34: {id: 0, times: Array(4).fill('00:00'), unitList: [] },
  tabPageInfo41: {id: 0, times: Array(4).fill('00:00'), unitList: [] },
  tabPageInfo42: {id: 0, times: Array(4).fill('00:00'), unitList: [] },
  tabPageInfo43: {id: 0, times: Array(4).fill('00:00'), unitList: [] },
  tabPageInfo44: {id: 0, times: Array(4).fill('00:00'), unitList: [] },
};

export const tabPageSlice = createSlice({
  name: "tabPage",
  initialState,
  reducers: {
    setCurrentTab: (state, action: PayloadAction<TabPageInfotype>) => {
      state.currentTabPage = action.payload;
    },

    setCurrentUnit: (state, action: PayloadAction<updateCurrentTabPageUnit>) => {
      state.currentTabPage.unitList[action.payload.position] = action.payload.unit;
    },

    updateCurrentTab: (
      state,
      action: PayloadAction<updateCurrentTabPageType>
    ) => {
      console.log("updateCurrentTab", action.payload)
      if (action.payload.arrKey in state.currentTabPage.unitList[action.payload.arrPos]) {
        (state.currentTabPage.unitList[action.payload.arrPos] as any)[action.payload.arrKey] = action.payload.deviceId;
      }
    },

    updateTabPage: (state, action: PayloadAction<SetTabPageProp>) => {
      const key = action.payload.name as TabKeys;
      if (state[key]) {
        state[key] = action.payload.object;
      }
    },
    setTabPage: (state, action: PayloadAction<SetTabPageProp>) => {
      const key = action.payload.name as TabKeys;
      if (state[key]) {
        state[key] = action.payload.object;
      }
    },

    setUnitPostion: (state, action: PayloadAction<number>) => {
      state.unitPosition.index = action.payload
    },

    addDropdown: (
      state,
      action: PayloadAction<AddDropDownType>
    ) => {
      const keyName = process.env.REACT_APP_CONST_TABINFO_NAME;
      const key = keyName + `${action.payload.mainTab}${action.payload.subTab}` as TabKeys;
      
      const tabPage = state[key] as TabPageInfotype;

      if (tabPage.times.length < 12) {
        tabPage.times.push('00:00');
        state.currentTabPage.times.push('00:00');
      }
    },
    
    removeDropdown: (
      state,
      action: PayloadAction<DeleteDropDownType>
    ) => {
      const keyName = process.env.REACT_APP_CONST_TABINFO_NAME;
      const key = keyName + `${action.payload.mainTab}${action.payload.subTab}` as TabKeys;

      const tabPage = state[key] as TabPageInfotype;
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
      const keyName = process.env.REACT_APP_CONST_TABINFO_NAME;
      const key = keyName + `${action.payload.mainTab}${action.payload.subTab}` as TabKeys;

      const tabPage = state[key] as TabPageInfotype;
      const index = action.payload.index;

      tabPage.times[index] = String(action.payload.time);
      tabPage.times.sort();

      state.currentTabPage.times[index] = String(action.payload.time);
      state.currentTabPage.times.sort();
    },
  },
});

export const { setCurrentTab, updateCurrentTab, setCurrentUnit, updateTabPage, setTabPage, addDropdown, removeDropdown, setTimes, setUnitPostion } = tabPageSlice.actions;
export default tabPageSlice.reducer;