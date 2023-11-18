import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface UnitGroupState {
  groups: { [key: string]: number[] };
  currentGroup: number[];
}

const initialState: UnitGroupState = {
  groups: {
    "1": [],
    "2": [],
    "3": [],
    "4": [],
    "5": [],
    "6": [],
    "7": [],
    "8": [],
    "9": [],
    "10": []
  },
  currentGroup: [0, 0, 0, 0, 0, 0, 0, 0, 0]
};

export const unitGroupSlice = createSlice({
  name: "unitGroup",
  initialState,
  reducers: {
    addGroup: (state, action: PayloadAction<{ key: string; group: number[] }>) => {
      const { key, group } = action.payload;
      state.groups[key] = group;
    },
    updateGroup: (state, action: PayloadAction<{ key: string; group: number[] }>) => {
      const { key, group } = action.payload;
      state.groups[key] = group;
    },
    deleteGroup: (state, action: PayloadAction<string>) => {
      delete state.groups[action.payload];
    },
  },
});

export const {addGroup, updateGroup, deleteGroup } = unitGroupSlice.actions;
export default unitGroupSlice.reducer;