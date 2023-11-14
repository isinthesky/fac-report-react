import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TabPageInfotype, SetTabPageProp, updateCurrentTabPageType, AddDropDownType, DeleteDropDownType, SetDropDownType, updateCurrentTabPageUnit } from "../../static/types";

type TabKeys = 'tabPageInfo11' | 'tabPageInfo12' | 'tabPageInfo13' | `tabPageInfo14` | 'tabPageInfo21' | 'tabPageInfo22' | 'tabPageInfo23' | `tabPageInfo24` | 'tabPageInfo31' | 'tabPageInfo32' | 'tabPageInfo33' | `tabPageInfo34` | 'tabPageInfo41' | 'tabPageInfo42' | 'tabPageInfo43' | `tabPageInfo44`;

export interface TabPageState {
  currentTabPage: TabPageInfotype;
  [key: string]: TabPageInfotype;
}

const initialState: TabPageState = {
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

    // resetCurrentTab: (
    //   state,
    //   action: PayloadAction<updateCurrentTabPageUnit>
    // ) => {
    //   console.log("resetCurrentTab", action.payload)
    //   const key = action.payload.name as TabKeys;
    //   if (state[key].unitList.length > action.payload.unitPosition &&
    //     state.currentTabPage.unitList.length > action.payload.unitPosition) {
    //     state.currentTabPage.unitList[action.payload.unitPosition] = state[key].unitList[action.payload.unitPosition];
    //   }
    //   console.log("resetCurrentTab22 ", state.currentTabPage.unitList[action.payload.unitPosition], state[key].unitList[action.payload.unitPosition])
    // },

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
    addDropdown: (
      state,
      action: PayloadAction<AddDropDownType>
    ) => {
      const keyName = process.env.REACT_APP_CONST_TABINFO_NAME;
      const key = keyName + `${action.payload.mainTab}${action.payload.subTab}` as TabKeys;
      if (state[key].times.length < 12) {
        state[key].times.push('00:00');
        state.currentTabPage.times.push('00:00');
      }
    },
    
    removeDropdown: (
      state,
      action: PayloadAction<DeleteDropDownType>
    ) => {
      const keyName = process.env.REACT_APP_CONST_TABINFO_NAME;
      const key = keyName + `${action.payload.mainTab}${action.payload.subTab}` as TabKeys;
      if (state[key].times.length > 4) {
          state[key].times.splice(action.payload.index, 1);
          state.currentTabPage.times.splice(action.payload.index, 1);
      }
    },
    
    setTimes: (
      state,
      action: PayloadAction<SetDropDownType>
    ) => {
      const keyName = process.env.REACT_APP_CONST_TABINFO_NAME;
      const key = keyName + `${action.payload.mainTab}${action.payload.subTab}` as TabKeys;
      state[key].times[action.payload.index] = String(action.payload.time);
      state[key].times.sort();
      state.currentTabPage.times[action.payload.index] = String(action.payload.time);
      state.currentTabPage.times.sort();
    },
  },
});

export const { setCurrentTab, updateCurrentTab, setCurrentUnit, updateTabPage, setTabPage, addDropdown, removeDropdown, setTimes } = tabPageSlice.actions;
export default tabPageSlice.reducer;