import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    station: [],
    divide: [],
    devise: [],
  },
};

export const deviceSlice = createSlice({
  name: "content",
  initialState,
  reducers: {},
});

// export const {} = deviceSlice.actions;

export default deviceSlice.reducer;
