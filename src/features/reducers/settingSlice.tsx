import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DailySetting, TabSetting, SelectedTab, ApprovalsType } from "../../static/types";

export interface SettingState {
  [x: string]: any;
  menus: string[];
  date: number;
  daily: DailySetting;
  unitPostion: DailySetting;
  tabPosition: DailySetting;
  tabSetting: TabSetting;
  idViewMode: number;
  printTitle: string;
  deviceSearchWord: string;
  savedApprovals: ApprovalsType[];
}

const twoMonthsAgo = new Date();
twoMonthsAgo.setFullYear(twoMonthsAgo.getFullYear() - 1); // for testing

const initialState: SettingState = {
  menus: [],
  date: twoMonthsAgo.getTime(),
  daily: { row: 2, column: 2 },
  unitPostion: { row: 1, column: 1 },
  tabPosition: { row: 1, column: 1 },
  tabSetting: { length: Number(process.env.REACT_APP_INIT_TAB_COUNT) },
  idViewMode: 0,
  printTitle: "",
  deviceSearchWord: "",
  savedApprovals: [ {checked:false, text:""},
                    {checked:false, text:""},
                    {checked:false, text:""}],
};

export const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    setMenus: (state, action: PayloadAction<string[]>) => {
      state.menus = action.payload;
    },
    setReportTable: (state, action: PayloadAction<DailySetting>) => {
      state.daily = action.payload;
    },
    setUnitSelectPosition: (state, action: PayloadAction<DailySetting>) => {
      state.unitPostion = action.payload;
    },
    setTabSelectPosition: (state, action: PayloadAction<DailySetting>) => {
      state.tabPosition = action.payload;
    },
    setTableDate: (state, action: PayloadAction<number>) => {
      state.date = action.payload;
    },
    setTabSetting: (state, action: PayloadAction<TabSetting>) => {
      state.tabSetting = action.payload;
    },
    setViewType: (state, action: PayloadAction<number>) => {
      state.idViewMode = action.payload;
    },
    setdeviceSearchWord: (state, action: PayloadAction<string>) => {
      state.deviceSearchWord = action.payload;
    },
    setPrintTitle: (state, action: PayloadAction<string>) => {
      state.printTitle = action.payload;
    },
    setApproves: (state, action: PayloadAction<ApprovalsType[]>) => {
      state.savedApprovals = action.payload;
    },
  },
});

export const { setMenus, setReportTable,setUnitSelectPosition, setTabSelectPosition, setTabSetting, setTableDate, setViewType, setPrintTitle, setApproves, setdeviceSearchWord } = settingSlice.actions;
export default settingSlice.reducer;