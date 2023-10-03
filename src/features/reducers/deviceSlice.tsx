import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DeviceListProp } from "../../static/interface";

interface DeviceState {
  value: {
    deviceList: DeviceListProp[];
    devices: any[];
    divisions: any[];
    stations: any[];
  };
}

const initialState: DeviceState = {
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
    initDeviceList: (state, action: PayloadAction<DeviceListProp[]>) => {
      state.value.deviceList = action.payload;
    },

    loadDeviceList: (state, action: PayloadAction<any>) => {
      state.value.devices = action.payload.device;
      state.value.divisions = action.payload.division;
      state.value.stations = action.payload.station;
    },

    updateDeviceList: (state, action: PayloadAction<DeviceListProp>) => {
      const param = action.payload;
      if (state.value.deviceList[param.id]) {
        state.value.deviceList[param.id + 1].name = param.name;
        state.value.deviceList[param.id + 1].type = param.type;
        state.value.deviceList[param.id + 1].rs = "";
        state.value.deviceList[param.id + 1].st = "";
        state.value.deviceList[param.id + 1].tr = "";
        state.value.deviceList[param.id + 1].s = "";
        state.value.deviceList[param.id + 1].t = "";
        state.value.deviceList[param.id + 1].r = "";
        state.value.deviceList[param.id + 1].hz = "";
        state.value.deviceList[param.id + 1].kw = "";
        state.value.deviceList[param.id + 1].pf = "";
      }
    },
  },
});

export const { initDeviceList, loadDeviceList, updateDeviceList } =
  deviceSlice.actions;

export default deviceSlice.reducer;
