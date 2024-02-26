import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Unit, updateCurrentGroupType, updateCurrenUnitDevice } from "../../static/types";


export interface UnitGroupState {
  groups: Unit[],
  currentGroup: Unit,
  selectedPos: number
}

const initialState: UnitGroupState = {
  groups: [
    { name: "name1", type: 1, id: 1, st: 0, div: 0, dvList: Array(9).fill(0) },
    { name: "name2", type: 1, id: 2, st: 0, div: 0, dvList: Array(9).fill(0) },
    { name: "name3", type: 1, id: 3, st: 0, div: 0, dvList: Array(9).fill(0) },
    { name: "name4", type: 1, id: 4, st: 0, div: 0, dvList: Array(9).fill(0) },
    { name: "name5", type: 1, id: 5, st: 0, div: 0, dvList: Array(9).fill(0) },
    { name: "name6", type: 1, id: 6, st: 0, div: 0, dvList: Array(9).fill(0) },
    { name: "name7", type: 1, id: 7, st: 0, div: 0, dvList: Array(9).fill(0) },
    { name: "name8", type: 1, id: 8, st: 0, div: 0, dvList: Array(9).fill(0) },
    { name: "name9", type: 1, id: 9, st: 0, div: 0, dvList: Array(9).fill(0) },
    { name: "name10", type: 1, id: 10, st: 0, div: 0, dvList: Array(9).fill(0) }
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
    updateFromCurrent: (state, action: PayloadAction<{ index: number }>) => {
      const { index} = action.payload;
      if (state.groups[index]) {
        state.groups[index] = state.currentGroup;
      }
    },
    deleteGroup: (state, action: PayloadAction<number>) => {
      state.groups.splice(action.payload, 1);
    },
    setSelectedGroup: (state, action: PayloadAction<number>) => {
      state.selectedPos = action.payload
    },
    setCurrentGroup: (state, action: PayloadAction<number>) => {
      state.currentGroup = state.groups[action.payload];
    },
    updateCurrentGroup: (state, action: PayloadAction<Unit>) => {
      state.currentGroup = action.payload;
    },
    updateCurrentUnitDevice: (state, action: PayloadAction<updateCurrenUnitDevice>) => {

      state.currentGroup.dvList[action.payload.devicePosition] = action.payload.deviceId;
    },
    updateCurrentGroupUnit: (
      state,
      action: PayloadAction<updateCurrentGroupType>
    ) => {
      if (action.payload.arrKey in state.currentGroup) {
        (state.currentGroup as any)[action.payload.arrKey] = action.payload.value;
      }
    },
  },
});

export const {addGroup, updateGroup, updateFromCurrent, deleteGroup, setCurrentGroup, updateCurrentGroup, setSelectedGroup, updateCurrentGroupUnit, updateCurrentUnitDevice } = unitGroupSlice.actions;
export default unitGroupSlice.reducer;
