import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    daily: { row: 2, column: 2 },
  },
};

export const optionSlice = createSlice({
  name: "option",
  initialState,
  reducers: {
    setDailySetting: (state, action) => {
      state.value.daily = action.payload;
    },
  },
});

export const { setDailySetting } = optionSlice.actions;

export default optionSlice.reducer;
