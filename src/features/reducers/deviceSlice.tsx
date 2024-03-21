import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDevice, IDivision, IStation } from "../../static/types";

export interface DeviceState {
    devices: { [key: string]: IDevice };
    divisions: IDivision[];
    stations: IStation[];
}

const initialState: DeviceState = {
    devices: {},
    divisions: [],
    stations: [],
};

export const deviceSlice = createSlice({
  name: "deviceList",
  initialState,
  reducers: {
    loadDeviceList: (state, action: PayloadAction<any>) => {
      if (action.payload && action.payload.devices) {
        state.devices = action.payload.devices;
      }
      if (action.payload && action.payload.divisions) {
        state.divisions = action.payload.divisions;
      }
      if (action.payload && action.payload.stations) {
        state.stations = action.payload.stations;
      }
    },
  },
});

export const { loadDeviceList } =
  deviceSlice.actions;

export default deviceSlice.reducer;
