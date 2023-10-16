import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DevicePackProp, TabInfoProp } from "../../static/interface";

interface DeviceState {
  value: {
    deviceList: DevicePackProp[];
    deviceList11: DevicePackProp[];
    deviceList12: DevicePackProp[];
    deviceList21: DevicePackProp[];
    deviceList22: DevicePackProp[];
    devices: any[];
    divisions: any[];
    stations: any[];
  };
}

const initialState: DeviceState = {
  value: {
    deviceList: [],
    deviceList11: [],
    deviceList12: [],
    deviceList21: [],
    deviceList22: [],
    devices: [],
    divisions: [],
    stations: [],
  },
};

export const deviceSlice = createSlice({
  name: "deviceList",
  initialState,
  reducers: {
    initDeviceList: (state, action) => {
      console.log("initDeviceList", action.payload);
      state.value.deviceList = action.payload.deviceList;
      state.value.deviceList11 = action.payload.deviceList11;
      state.value.deviceList12 = action.payload.deviceList12;
      state.value.deviceList21 = action.payload.deviceList21;
      state.value.deviceList22 = action.payload.deviceList22;
    },

    loadDeviceList: (state, action: PayloadAction<any>) => {
      state.value.devices = action.payload.device;
      state.value.divisions = action.payload.division;
      state.value.stations = action.payload.station;
    },

    updateTabInfo: (state, action: PayloadAction<TabInfoProp>) => {
      const param = action.payload;
        (state.value as any)[param.tab] = param.device as DevicePackProp
    },
  },
});

export const { initDeviceList, loadDeviceList, updateTabInfo } =
  deviceSlice.actions;

export default deviceSlice.reducer;
