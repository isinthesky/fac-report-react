import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DeviceInfoType, updateCurrentDeviceType, AddDropDownType, DeleteDropDownType, SetDropDownType } from "../../static/types";

interface DailySetting {
  row: number;
  column: number;
}

interface OptionState {
  value: {
    date: number;
    daily: DailySetting;
    currentDevice: DeviceInfoType[];
    viewType: number;
    tab11: string[];
    tab12: string[];
    tab13: string[];
    tab21: string[];
    tab22: string[];
    tab23: string[];
    tab31: string[];
    tab32: string[];
    tab33: string[];
  };
}

const initialState: OptionState = {
  value: {
    date: new Date().getTime(),
    daily: { row: 2, column: 2 },
    currentDevice: [] as DeviceInfoType[],
    viewType: 0,
    tab11: Array(4).fill('00:00'),
    tab12: Array(4).fill('00:00'),
    tab13: Array(4).fill('00:00'),
    tab21: Array(4).fill('00:00'),
    tab22: Array(4).fill('00:00'),
    tab23: Array(4).fill('00:00'),
    tab31: Array(4).fill('00:00'),
    tab32: Array(4).fill('00:00'),
    tab33: Array(4).fill('00:00')
  },
};

type TabKeys = 'tab11' | 'tab12' | 'tab13' | 'tab21' | 'tab22' | 'tab23' | 'tab31' | 'tab32' | 'tab33';

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
    
    setCurrentDevice: (state, action: PayloadAction<DeviceInfoType[]>) => {
      console.log("setCurrentDevice", action.payload)
      state.value.currentDevice = action.payload;
    },

    setViewType: (state, action: PayloadAction<number>) => {
      console.log("setViewType", action.payload)
      state.value.viewType = action.payload;
    },

    updateCurrentDevice: (
      state,
      action: PayloadAction<updateCurrentDeviceType>
    ) => {
      if (action.payload.arrKey in state.value.currentDevice[action.payload.arrPos]) {
        (state.value.currentDevice[action.payload.arrPos] as any)[action.payload.arrKey] = action.payload.deviceId;
      }
    },
    
    addDropdown: (
      state,
      action: PayloadAction<AddDropDownType>
    ) => {
      const key = `tab${action.payload.mainTab}${action.payload.subTab}` as TabKeys;
      if (state.value[key].length < 12) {
        state.value[key].push('00:00');
      }
    },
    
    removeDropdown: (
      state,
      action: PayloadAction<DeleteDropDownType>
    ) => {
      const key = `tab${action.payload.mainTab}${action.payload.subTab}` as TabKeys;
      if (state.value[key].length > 4) {
          state.value[key].splice(action.payload.index, 1);
      }
    },
    
    setTimes: (
      state,
      action: PayloadAction<SetDropDownType>
    ) => {
      const key = `tab${action.payload.mainTab}${action.payload.subTab}` as TabKeys;
      state.value[key][action.payload.index] = String(action.payload.time);
      state.value[key].sort();
    },
  },
});

export const { setReportTable, setTableDate, setCurrentDevice, setViewType, updateCurrentDevice, addDropdown, removeDropdown, setTimes } =
  optionSlice.actions;

export default optionSlice.reducer;
