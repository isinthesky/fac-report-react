import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DailySetting, TabSetting, ApprovalsType } from "../../static/types";
import { INIT_PRINT_TITLE, INIT_TAB_COUNT } from "../../env";

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
  approvals: ApprovalsType[];
}

const twoMonthsAgo = new Date();
twoMonthsAgo.setFullYear(twoMonthsAgo.getFullYear() - 1); // for testing

// 현장
const today = new Date();
const oneDayMillisec = 24 * 60 * 60 * 1000;
const yesterday = new Date(today.getTime() - oneDayMillisec);

// 개발
const lastyear = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());


const initialState: SettingState = {
  menus: [],
  date: lastyear.getTime(),
  daily: { row: 2, column: 2 },
  unitPostion: { row: 1, column: 1 },
  tabPosition: { row: 1, column: 1 },
  tabSetting: { length: Number(INIT_TAB_COUNT) },
  idViewMode: 0,
  printTitle: INIT_PRINT_TITLE as string,
  deviceSearchWord: "",
  approvals: [{checked:false, text:""},
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
      state.approvals = action.payload;
    },
  },
});

export const { setMenus, setReportTable,setUnitSelectPosition, setTabSelectPosition, setTabSetting, setTableDate, setViewType, setPrintTitle, setApproves, setdeviceSearchWord } = settingSlice.actions;
export default settingSlice.reducer;