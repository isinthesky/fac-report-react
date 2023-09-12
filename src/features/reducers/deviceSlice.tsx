import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    deviceList: [],
    devices: [],
    divisions: [],
    stations: [],
  },
};

export const deviceSlice = createSlice({
  name: "deviceList",
  initialState,
  reducers: {
    updateDeviceList: (state, action) => {
      const value = action.payload;
      console.log("updateDeviceList11 ", value);
      // state.value.deviceList = value;
      // state.value.deviceList.length = 0;
      state.value.deviceList = value;
      console.log("updateDeviceList 22", state.value.deviceList);
    },
    loadDeviceList: (state, action) => {
      const value = action.payload;
      console.log("loadDeviceList ", value);
      // state.value.deviceList = value;
      // state.value.deviceList.length = 0;
      state.value.devices = value.device;
      state.value.divisions = value.division;
      state.value.stations = value.station;

      console.log("loadDeviceList 22", state.value);
    },
  },
});

export const { updateDeviceList, loadDeviceList } = deviceSlice.actions;

export default deviceSlice.reducer;
