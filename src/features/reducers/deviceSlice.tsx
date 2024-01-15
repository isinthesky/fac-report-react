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
      state.devices = action.payload.device;
      state.divisions = action.payload.division;
      state.stations = action.payload.station;
    },
  },
});

export const { loadDeviceList } =
  deviceSlice.actions;

export default deviceSlice.reducer;
