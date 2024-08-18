import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Unit, updateCurrentGroupType, updateCurrenUnitDevice } from "../../static/types";


export interface UnitGroupState {
  groups: Unit[],
  currentGroup: Unit,
  selectedPos: number
}

const initialState: UnitGroupState = {
  groups: [
    { tab_name: "", name: "name1", type: 1, idx: 1, st: 0, div: 0, devices: Array(9).fill(0), max_device: 0, disable:0},
    { tab_name: "", name: "name2", type: 1, idx: 2, st: 0, div: 0, devices: Array(9).fill(0), max_device: 0, disable:0},
    { tab_name: "", name: "name3", type: 1, idx: 3, st: 0, div: 0, devices: Array(9).fill(0), max_device: 0, disable:0},
    { tab_name: "", name: "name4", type: 1, idx: 4, st: 0, div: 0, devices: Array(9).fill(0), max_device: 0, disable:0},
    { tab_name: "", name: "name5", type: 1, idx: 5, st: 0, div: 0, devices: Array(9).fill(0), max_device: 0, disable:0},
    { tab_name: "", name: "name6", type: 1, idx: 6, st: 0, div: 0, devices: Array(9).fill(0), max_device: 0, disable:0},
    { tab_name: "", name: "name7", type: 1, idx: 7, st: 0, div: 0, devices: Array(9).fill(0), max_device: 0, disable:0},
    { tab_name: "", name: "name8", type: 1, idx: 8, st: 0, div: 0, devices: Array(9).fill(0), max_device: 0, disable:0},
    { tab_name: "", name: "name9", type: 1, idx: 9, st: 0, div: 0, devices: Array(9).fill(0), max_device: 0, disable:0},
  ],
  currentGroup: { tab_name: " ", name: "", type: 1, idx: 0, st: 0, div: 0, devices: Array(9).fill(0), max_device: 0, disable:0},
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
    updateFromCurrent: (state, action: PayloadAction<number>) => {
      if (state.groups[action.payload]) {
        state.groups[action.payload] = state.currentGroup;
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
      state.currentGroup.devices[action.payload.devicePosition] = action.payload.device;
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
