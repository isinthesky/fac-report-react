import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DailySetting, TabSetting, ApprovalsType, TimeListItem } from "../../static/types";
import { INIT_PRINT_TITLE, INIT_TAB_COUNT } from "../../env";

export interface SettingState {
  menus: string[];
  date: number;
  unitPostion: DailySetting;
  tabSetting: TabSetting;
  viewMode: string;
  printTitle: string;
  printFontSize: number;
  deviceSearchWord: string;
  approvals: ApprovalsType[];
  timeList: TimeListItem[];
}

// 현장
const today = new Date();
const oneDayMillisec = 24 * 60 * 60 * 1000;
const yesterday = new Date(today.getTime() - oneDayMillisec);

// 개발
const lastyear = new Date(yesterday.getFullYear() - 1, yesterday.getMonth(), yesterday.getDate());

const initialState: SettingState = {
  menus: ["11"],
  date: lastyear.getTime(), // yesterday.getTime(),
  unitPostion: { row: 1, column: 1 },
  tabSetting: { length: Number(INIT_TAB_COUNT) },
  viewMode: "view",
  printTitle: INIT_PRINT_TITLE as string,
  printFontSize: 9,
  deviceSearchWord: "",
  approvals: [{ id:0, tab_name:"", level:0, text:"", checked:0, tab_info_id:0},
              { id:0, tab_name:"", level:0, text:"", checked:0, tab_info_id:0},
              { id:0, tab_name:"", level:0, text:"", checked:0, tab_info_id:0}],
  timeList: [ { id: 1, tab_name: "", time: "00:00", tab_info_id: 0 },
    { id: 2, tab_name: "", time: "00:00", tab_info_id: 0 },
    { id: 3, tab_name: "", time: "00:00", tab_info_id: 0 },
    { id: 4, tab_name: "", time: "00:00", tab_info_id: 0 }
   ],
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
    setTimeList: (state, action: PayloadAction<TimeListItem[]>) => {
      state.timeList = action.payload;
    },
    setTabSetting: (state, action: PayloadAction<TabSetting>) => {
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
    addDropdown: (state) => {
      const newId = state.timeList.length ? state.timeList[state.timeList.length - 1].id + 1 : 1;
      state.timeList.push({ id: newId, tab_name: `Tab ${newId}`, time: '00:00', tab_info_id: newId });
    },
    removeDropdown: (state, action: PayloadAction<{ index: number }>) => {
      state.timeList.splice(action.payload.index, 1);
    },
    setTimes: (state, action: PayloadAction<{ index: number, time: string }>) => {
      state.timeList[action.payload.index].time = action.payload.time;
    },
  },
});

export const { setMenus, setUnitSelectPosition, setTabSetting, setTableDate, setViewMode, setPrintTitle, setPrintFontSize, setApproves, setdeviceSearchWord, setTimeList, addDropdown, removeDropdown, setTimes } = settingSlice.actions;
export default settingSlice.reducer;

