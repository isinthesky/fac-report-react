import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DeviceInfoType, updateCurrentDeviceType } from "../../static/types";
import { DeviceProp } from "../../static/interface";

interface DailySetting {
  row: number;
  column: number;
}

interface OptionState {
  value: {
    daily: DailySetting;
    currentDevice: DeviceInfoType[];
  };
}

const initialState: OptionState = {
  value: {
    daily: { row: 2, column: 2 },
    currentDevice: [] as DeviceInfoType[],
  },
};

export const optionSlice = createSlice({
  name: "option",
  initialState,
  reducers: {
    setDailySetting: (state, action: PayloadAction<DailySetting>) => {
      state.value.daily = action.payload;
    },
    setCurrentDevice: (state, action: PayloadAction<DeviceInfoType[]>) => {
      console.log("setCurrentDevice", action.payload);
      state.value.currentDevice = action.payload;
    },
    updateCurrentDevice: (
      state,
      action: PayloadAction<updateCurrentDeviceType>
    ) => {
      
      if (action.payload.arrKey in state.value.currentDevice[action.payload.arrPos]) {
        (state.value.currentDevice[action.payload.arrPos] as any)[action.payload.arrKey] = action.payload.deviceId;
      }
    },
  },
});

export const { setDailySetting, setCurrentDevice, updateCurrentDevice } =
  optionSlice.actions;

export default optionSlice.reducer;
