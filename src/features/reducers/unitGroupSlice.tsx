import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Preset, updateCurrentGroupType, updateCurrenUnitDevice, Item } from "../../static/types";


export interface UnitGroupState {
  groups: Preset[],
  currentGroup: Preset,
  selectedPos: number
}

const initialState: UnitGroupState = {
  groups: [
    {id: 1, name: "name1", type: 1, search_st: 0, search_div: 0, tab_device_presets: Array(9).fill(0), max_device: 0},
  ],
  currentGroup: { id: 0, name: "", type: 1, search_st: 0, search_div: 0, tab_device_presets: Array(9).fill(0), max_device: 0},
  selectedPos: 0,
};

export const unitGroupSlice = createSlice({
  name: "unitGroup",
  initialState,
  reducers: {
    loadUnitGroupList: (state, action: PayloadAction<Preset[]>) => {
      state.groups = action.payload;
    },
    addUnitGroup: (state, action: PayloadAction<Preset>) => {
      state.groups.push(action.payload);
    },
    updateGroup: (state, action: PayloadAction<{ index: number; group: Preset }>) => {
      const { index, group } = action.payload;
      if (state.groups[index]) {
        state.groups[index] = group;
      } else {
        state.groups.push(group)
      }
    },
    updateFromCurrent: (state, action: PayloadAction<number>) => {
      if (state.groups[action.payload]) {
        state.groups[action.payload] = JSON.parse(
          JSON.stringify(state.currentGroup)
        );
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
    updateCurrentGroup: (state, action: PayloadAction<Preset>) => {
      state.currentGroup = action.payload;
    },
    updateCurrentUnitDevice: (state, action: PayloadAction<updateCurrenUnitDevice>) => {
      state.currentGroup.tab_device_presets[action.payload.devicePosition] = action.payload.device;
    },
    updateCurrentGroupUnit: (
      state,
      action: PayloadAction<updateCurrentGroupType>
    ) => {
      if (action.payload.arrKey in state.currentGroup) {
        (state.currentGroup as any)[action.payload.arrKey] = action.payload.value;
      }
    },
    addDevice: (state, action: PayloadAction<Item>) => {
      state.currentGroup.tab_device_presets.push(action.payload);
    },
    deleteDevice: (state, action: PayloadAction<number>) => {
      state.currentGroup = {
        ...state.currentGroup,
        tab_device_presets: state.currentGroup.tab_device_presets.filter((_, idx) => idx !== action.payload),
      };
    },
    updateDevice: (state, action: PayloadAction<number>) => {      
      state.groups[action.payload] = state.currentGroup;
    },
  },
});

export const { loadUnitGroupList, addUnitGroup, updateGroup, updateFromCurrent, deleteGroup, setCurrentGroup, updateCurrentGroup, setSelectedGroup, updateCurrentGroupUnit, updateCurrentUnitDevice, 
  addDevice, deleteDevice, updateDevice } = unitGroupSlice.actions;
export default unitGroupSlice.reducer;
