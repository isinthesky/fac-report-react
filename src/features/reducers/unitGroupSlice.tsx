import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GroupDevice } from "../../static/types";


export interface UnitGroupState {
  groups: {[key: string]: GroupDevice},
  currentGroup: GroupDevice
}

const initialState: UnitGroupState = {
  groups: {
    "1": { name: "name1", list: Array(9).fill(0) },
    "2": { name: "name2", list: Array(9).fill(0) },
    "3": { name: "name3", list: Array(9).fill(0) },
    "4": { name: "name4", list: Array(9).fill(0) },
    "5": { name: "name5", list: Array(9).fill(0) },
    "6": { name: "name6", list: Array(9).fill(0) },
    "7": { name: "name7", list: Array(9).fill(0) },
    "8": { name: "name8", list: Array(9).fill(0) },
    "9": { name: "name9", list: Array(9).fill(0) },
    "10": { name: "name10", list: Array(9).fill(0) }
  },

  currentGroup: { name: "", list: Array(9).fill(0)  },
};

export const unitGroupSlice = createSlice({
  name: "unitGroup",
  initialState,
  reducers: {
    addGroup: (state, action: PayloadAction<{ key: string; group: GroupDevice }>) => {
      const { key, group } = action.payload;
      state.groups[key] = group;
    },
    updateGroup: (state, action: PayloadAction<{ key: string; group: GroupDevice }>) => {
      const { key, group } = action.payload;
      if (state.groups[key]) {
        state.groups[key] = group;
      }
    },
    deleteGroup: (state, action: PayloadAction<string>) => {
      delete state.groups[action.payload];
    },
    setCurrentGroup: (state, action: PayloadAction<string>) => {
      const key = action.payload;
      state.currentGroup = state.groups[key] || { name: "", list: [] };
    },
  },
});

export const {addGroup, updateGroup, deleteGroup, setCurrentGroup } = unitGroupSlice.actions;
export default unitGroupSlice.reducer;
