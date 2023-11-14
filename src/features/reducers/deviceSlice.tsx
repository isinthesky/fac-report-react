import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDevice, IDivision, IStation } from "../../static/types";

export interface DeviceState {
  value: {
    devices: IDevice[];
    divisions: IDivision[];
    stations: IStation[];
  };
}

const initialState: DeviceState = {
  value: {
    devices: [],
    divisions: [],
    stations: [],
  },
};

export const deviceSlice = createSlice({
  name: "deviceList",
  initialState,
  reducers: {
    loadDeviceList: (state, action: PayloadAction<any>) => {
      state.value.devices = action.payload.device;
      state.value.divisions = action.payload.division;
      state.value.stations = action.payload.station;
    },
  },
});

export const { loadDeviceList } =
  deviceSlice.actions;

export default deviceSlice.reducer;
