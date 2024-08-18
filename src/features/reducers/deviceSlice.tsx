import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDevice, IDivision, IStation } from "../../static/types";

export interface DeviceState {
    devices: { [key: number]: IDevice };
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
      if (action.payload && action.payload) {
        state.devices = action.payload;
      }
    },
    loadStaitionList: (state, action: PayloadAction<any>) => {
      if (action.payload && action.payload) {
        state.stations = action.payload;
      }
    },
    loadDivisionList: (state, action: PayloadAction<any>) => {
      if (action.payload && action.payload) {
        state.divisions = action.payload;
      }
    },
  },
});

export const { loadDeviceList, loadDivisionList, loadStaitionList } =
  deviceSlice.actions;

export default deviceSlice.reducer;
