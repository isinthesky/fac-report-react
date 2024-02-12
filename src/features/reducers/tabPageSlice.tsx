import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TabPageInfotype, SetTabPageProp, updateCurrentTabPageType, updateCurrenUnitDevice, AddDropDownType, DeleteDropDownType, SetDropDownType, updateCurrentTabPageUnit, setCurrnetUnitProp } from "../../static/types";

export interface TabPageState {
  unitPosition: {index:number};
  currentTabPage: TabPageInfotype;
  tabPageInfo: TabPageInfotype[][];
}

const initialState: TabPageState = {
  unitPosition: {index: 0},
  currentTabPage: {id: 0, times: Array(4).fill('00:00'), unitList: Array(9).fill(0) },
  tabPageInfo: Array(4).fill(Array(4).fill({id: 0, times: Array(4).fill('00:00'), unitList: Array(9).fill(0) }))
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

    setCurrentUnitDevice: (state, action: PayloadAction<updateCurrenUnitDevice>) => {
      state.currentTabPage.unitList[action.payload.unitPosition].dvList[action.payload.devicePosition] = action.payload.deviceId;
    },

    updateCurrentUnit: (
      state,
      action: PayloadAction<updateCurrentTabPageType>
    ) => {
      if (action.payload.arrKey in state.currentTabPage.unitList[action.payload.arrPos]) {
        (state.currentTabPage.unitList[action.payload.arrPos] as any)[action.payload.arrKey] = action.payload.deviceId;
      }
    },

    updateTabPage: (state, action: PayloadAction<SetTabPageProp>) => {
      if (state.tabPageInfo[action.payload.mainTab][action.payload.subTab] ) {
        state.tabPageInfo[action.payload.mainTab][action.payload.subTab] = action.payload.object;
      }
    },
    
    setTabPage: (state, action: PayloadAction<SetTabPageProp>) => {
      if (state.tabPageInfo[action.payload.mainTab][action.payload.subTab] ) {
        state.tabPageInfo[action.payload.mainTab][action.payload.subTab] = action.payload.object;
      }
    },

    setTabUnitPosition: (state, action: PayloadAction<setCurrnetUnitProp>) => {
      state.unitPosition.index = action.payload.index;
      state.currentTabPage = state.tabPageInfo[action.payload.row][action.payload.column];
    },

    addDropdown: (
      state,
      action: PayloadAction<AddDropDownType>
    ) => {
      const tabPage = state.tabPageInfo[action.payload.mainTab][action.payload.subTab];

      if (tabPage.times.length < 12) {
        tabPage.times.push('00:00');
        state.currentTabPage.times.push('00:00');
      }
    },
    
    removeDropdown: (
      state,
      action: PayloadAction<DeleteDropDownType>
    ) => {
      const tabPage = state.tabPageInfo[action.payload.mainTab][action.payload.subTab];
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
      const tabPage = state.tabPageInfo[action.payload.mainTab][action.payload.subTab];
      const index = action.payload.index;

      tabPage.times[index] = String(action.payload.time);
      tabPage.times.sort();

      state.currentTabPage.times[index] = String(action.payload.time);
      state.currentTabPage.times.sort();
    },
  },
});

export const { setCurrentTab, updateCurrentUnit, setCurrentUnit, setCurrentUnitDevice, updateTabPage, setTabPage, addDropdown, removeDropdown, setTimes, setTabUnitPosition } = tabPageSlice.actions;
export default tabPageSlice.reducer;