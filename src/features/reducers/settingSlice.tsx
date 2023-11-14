import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DailySetting, TabSetting, SelectedTab, ApprovalsType } from "../../static/types";

export interface SettingState {
  [x: string]: any;
  date: number;
  daily: DailySetting;
  tabSetting: TabSetting;
  selectedTab: SelectedTab;
  viewType: number;
  savedApprovals: ApprovalsType[];
}

const twoMonthsAgo = new Date();
twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

const initialState: SettingState = {
  date: twoMonthsAgo.getTime(),
  daily: { row: 3, column: 2 },
  tabSetting: { length: Number(process.env.REACT_APP_INIT_TAB_COUNT) },
  selectedTab: {main:1, sub:1},
  viewType: 0,
  savedApprovals: [ {checked:false, text:""},
                    {checked:false, text:""},
                    {checked:false, text:""}],
};

export const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    setReportTable: (state, action: PayloadAction<DailySetting>) => {
      state.daily = action.payload;
    },
    setTableDate: (state, action: PayloadAction<number>) => {
      state.date = action.payload;
    },
    setTabSetting: (state, action: PayloadAction<TabSetting>) => {
      state.tabSetting = action.payload;
    },
    setViewType: (state, action: PayloadAction<number>) => {
      state.viewType = action.payload;
    },
    setSelectTab: (state, action: PayloadAction<SelectedTab>) => {
      state.selectedTab = action.payload;
    },
    setApproves: (state, action: PayloadAction<ApprovalsType[]>) => {
      state.savedApprovals = action.payload;
    },
  },
});

export const { setReportTable, setTabSetting, setSelectTab, setTableDate, setViewType, setApproves } = settingSlice.actions;
export default settingSlice.reducer;