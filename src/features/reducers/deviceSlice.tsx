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
    },
    loadStaitionList: (state, action: PayloadAction<any>) => {
      if (action.payload && action.payload.devices) {
        state.stations = action.payload.devices;
      }
    },
    loadDivisionList: (state, action: PayloadAction<any>) => {
      if (action.payload && action.payload.devices) {
        state.divisions = action.payload.devices;
      }
    },
  },
});

export const { loadDeviceList, loadDivisionList, loadStaitionList } =
  deviceSlice.actions;

export default deviceSlice.reducer;
