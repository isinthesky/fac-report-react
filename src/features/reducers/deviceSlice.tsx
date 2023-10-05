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
        state.value.deviceList[param.id + 1].dv1 = "";
        state.value.deviceList[param.id + 1].dv2 = "";
        state.value.deviceList[param.id + 1].dv3 = "";
        state.value.deviceList[param.id + 1].dv4 = "";
        state.value.deviceList[param.id + 1].dv5 = "";
        state.value.deviceList[param.id + 1].dv6 = "";
        state.value.deviceList[param.id + 1].dv7 = "";
        state.value.deviceList[param.id + 1].dv8 = "";
        state.value.deviceList[param.id + 1].dv9 = "";
      }
    },
  },
});

export const { initDeviceList, loadDeviceList, updateDeviceList } =
  deviceSlice.actions;

export default deviceSlice.reducer;
