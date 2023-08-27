import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    deviceList: [],
    divide: [],
    devise: [],
  },
};

export const deviceSlice = createSlice({
  name: "deviceList",
  initialState,
  reducers: {
    updateDeviceList: (state, action) => {
      const { value } = action.payload;
      state.value.deviceList = value;
    },
  },
});

export const { updateDeviceList } = deviceSlice.actions;

export default deviceSlice.reducer;
