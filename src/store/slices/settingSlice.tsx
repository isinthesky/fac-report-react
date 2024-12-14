import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DailySetting, ApprovalsType } from "@/types/types";
import { INIT_PRINT_TITLE, CONST_APP_STATE } from "@/config/env";

export interface SettingState {
  menus: string[];
  date: number;
  unitPostion: DailySetting;
  tabSetting: string[];
  viewMode: string;
  printTitle: string;
  printFontSize: number;
  deviceSearchWord: string;
  approvals: ApprovalsType[];
  isLoading: boolean;
}

// 현장
const today = new Date();
const oneDayMillisec = 24 * 60 * 60 * 1000;
const yesterday = new Date(today.getTime() - oneDayMillisec);

// 개발
const lastyear = new Date(yesterday.getFullYear() - 1, yesterday.getMonth() - 5, yesterday.getDate());

const initialState: SettingState = {
  menus: [],
  date: CONST_APP_STATE === "PRODUCT" ? yesterday.getTime() : lastyear.getTime(),
  unitPostion: { row: 1, column: 1 },
  tabSetting: [],
  viewMode: "view",
  printTitle: INIT_PRINT_TITLE as string,
  printFontSize: 8,
  deviceSearchWord: "",
  approvals: [{ level:0, text:"", checked:0 },
              { level:0, text:"", checked:0 },
              { level:0, text:"", checked:0 }],
  isLoading: false,
};

export const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    setMenus: (state, action: PayloadAction<string[]>) => {
      state.menus.length = 0;
      action.payload.forEach((menu) => {
        state.menus.push(menu);
      });
    },
    setUnitSelectPosition: (state, action: PayloadAction<DailySetting>) => {
      state.unitPostion = action.payload;
    },
    setTableDate: (state, action: PayloadAction<number>) => {
      state.date = action.payload;
    },
    setTabSetting: (state, action: PayloadAction<string[]>) => {
      state.tabSetting = action.payload;
    },
    setViewMode: (state, action: PayloadAction<string>) => {
      state.viewMode = action.payload;
    },
    setdeviceSearchWord: (state, action: PayloadAction<string>) => {
      state.deviceSearchWord = action.payload;
    },
    setPrintTitle: (state, action: PayloadAction<string>) => {
      state.printTitle = action.payload;
    },
    setPrintFontSize: (state, action: PayloadAction<number>) => {
      state.printFontSize = action.payload;
    },
    setApproves: (state, action: PayloadAction<ApprovalsType[]>) => {
      state.approvals = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    }
  },
});

export const { setMenus, setUnitSelectPosition, setTabSetting, setTableDate, setViewMode, setPrintTitle, setPrintFontSize, setApproves, setIsLoading, setdeviceSearchWord } = settingSlice.actions;
export default settingSlice.reducer;

