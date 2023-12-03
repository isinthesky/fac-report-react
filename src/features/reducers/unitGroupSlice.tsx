import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Unit } from "../../static/types";


export interface UnitGroupState {
  groups: Unit[],
  currentGroup: Unit
  selectedPos: number
}

const initialState: UnitGroupState = {
  groups: [
    { name: "name1", type: 1, id: 0, st: 0, div: 0, dvList: Array(9).fill(0) },
    { name: "name2", type: 1, id: 0, st: 0, div: 0, dvList: Array(9).fill(0) },
    { name: "name3", type: 1, id: 0, st: 0, div: 0, dvList: Array(9).fill(0) },
    { name: "name4", type: 1, id: 0, st: 0, div: 0, dvList: Array(9).fill(0) },
    { name: "name5", type: 1, id: 0, st: 0, div: 0, dvList: Array(9).fill(0) },
    { name: "name6", type: 1, id: 0, st: 0, div: 0, dvList: Array(9).fill(0) },
    { name: "name7", type: 1, id: 0, st: 0, div: 0, dvList: Array(9).fill(0) },
    { name: "name8", type: 1, id: 0, st: 0, div: 0, dvList: Array(9).fill(0) },
    { name: "name9", type: 1, id: 0, st: 0, div: 0, dvList: Array(9).fill(0) },
    { name: "name10", type: 1, id: 0, st: 0, div: 0, dvList: Array(9).fill(0) }
  ],
  currentGroup: { name: "", type: 1, id: 0, st: 0, div: 0, dvList: Array(9).fill(0) },
  selectedPos: 0,
};

export const unitGroupSlice = createSlice({
  name: "unitGroup",
  initialState,
  reducers: {
    addGroup: (state, action: PayloadAction<Unit>) => {
      state.groups.push(action.payload);
    },
    updateGroup: (state, action: PayloadAction<{ index: number; group: Unit }>) => {
      const { index, group } = action.payload;
      if (state.groups[index]) {
        state.groups[index] = group;
      } else {
        state.groups.push(group)
      }
    },
    deleteGroup: (state, action: PayloadAction<number>) => {
      state.groups.splice(action.payload, 1);
    },
    setCurrentGroup: (state, action: PayloadAction<number>) => {
      state.currentGroup = state.groups[action.payload];
    },
    updateCurrentGroup: (state, action: PayloadAction<Unit>) => {
      state.currentGroup = action.payload;
    },
    setSelectedGroup: (state, action: PayloadAction<number>) => {
      state.selectedPos = action.payload
    },
  },
});

export const {addGroup, updateGroup, deleteGroup, setCurrentGroup, updateCurrentGroup, setSelectedGroup } = unitGroupSlice.actions;
export default unitGroupSlice.reducer;
