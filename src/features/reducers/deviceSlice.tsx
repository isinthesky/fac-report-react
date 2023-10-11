import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DeviceListProp } from "../../static/interface";

interface DeviceState {
  value: {
    deviceList: DeviceListProp[];
    deviceList11: DeviceListProp[];
    deviceList12: DeviceListProp[];
    deviceList21: DeviceListProp[];
    deviceList22: DeviceListProp[];
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
      state.value.deviceList = action.payload;
      // state.value.deviceList11 = action.payload.deviceList11;
      // state.value.deviceList12 = action.payload.deviceList12;
      // state.value.deviceList21 = action.payload.deviceList21;
      // state.value.deviceList22 = action.payload.deviceList22;
    },

    loadDeviceList: (state, action: PayloadAction<any>) => {
      state.value.devices = action.payload.device;
      state.value.divisions = action.payload.division;
      state.value.stations = action.payload.station;
    },

    updateDeviceList: (state, action: PayloadAction<DeviceListProp>) => {
      const param = action.payload;
      if (state.value.deviceList[param.id]) {
        state.value.deviceList[param.id + 1].name = action.payload.name;
        state.value.deviceList[param.id + 1].type = action.payload.type;
        state.value.deviceList[param.id + 1].dv1 = action.payload.dv1;
        state.value.deviceList[param.id + 1].dv2 = action.payload.dv2;
        state.value.deviceList[param.id + 1].dv3 = action.payload.dv3;
        state.value.deviceList[param.id + 1].dv4 = action.payload.dv4;
        state.value.deviceList[param.id + 1].dv5 = action.payload.dv5;
        state.value.deviceList[param.id + 1].dv6 = action.payload.dv6;
        state.value.deviceList[param.id + 1].dv7 = action.payload.dv7;
        state.value.deviceList[param.id + 1].dv8 = action.payload.dv8;
        state.value.deviceList[param.id + 1].dv9 = action.payload.dv9;
      }
    },
  },
});

export const { initDeviceList, loadDeviceList, updateDeviceList } =
  deviceSlice.actions;

export default deviceSlice.reducer;
