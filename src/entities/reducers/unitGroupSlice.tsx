import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Preset, updateCurrentGroupType, updateCurrenUnitDevice, Item } from "../../static/types";


export interface UnitGroupState {
  groups: Preset[],
  currentPresetTable: Preset,
  selectedPos: number
}

const initialState: UnitGroupState = {
  groups: [
    {id: 1, name: "name1", type: 1, search_st: 0, search_div: 0, tab_device_presets: Array(9).fill(0), max_device: 0},
  ],
  currentPresetTable: { id: 0, name: "", type: 1, search_st: 0, search_div: 0, tab_device_presets: Array(9).fill(0), max_device: 0},
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
    updateGroup: (state, action: PayloadAction<{ index: number; group: Partial<Preset> }>) => {
      const { index, group } = action.payload;
      if (state.groups[index]) {
        state.groups[index] = { ...state.groups[index], ...group };
    
        // 현재 선택된 그룹이면 currentGroup도 업데이트
        if (state.selectedPos === index) {
          state.currentPresetTable = { ...state.currentPresetTable, ...group };
        }
      } else {
        state.groups.push({ ...group } as Preset);
      }
    },
    updateFromCurrent: (state, action: PayloadAction<number>) => {
      if (state.groups[action.payload]) {
        state.groups[action.payload] = { ...state.currentPresetTable };
      }
    },
    deleteGroup: (state, action: PayloadAction<number>) => {
      state.groups.splice(action.payload, 1);
    },
    setSelectedGroup: (state, action: PayloadAction<number>) => {
      state.selectedPos = action.payload
    },
    setCurrentGroup: (state, action: PayloadAction<number>) => {
      state.currentPresetTable = state.groups[action.payload];
    },
    updateCurrentGroup: (state, action: PayloadAction<Preset>) => {
      state.currentPresetTable = action.payload;
    },
    updateCurrentUnitDevice: (state, action: PayloadAction<updateCurrenUnitDevice>) => {
      state.currentPresetTable.tab_device_presets[action.payload.devicePosition] = action.payload.device;
    },
    updateCurrentGroupUnit: (
      state,
      action: PayloadAction<updateCurrentGroupType>
    ) => {
      if (action.payload.arrKey in state.currentPresetTable) {
        (state.currentPresetTable as any)[action.payload.arrKey] = action.payload.value;
      }
    },
    addDevice: (state) => {
      const currentDevices = state.currentPresetTable.tab_device_presets;
      const newIdx = currentDevices.length > 0 
        ? Math.max(...currentDevices.map(device => device.idx || 0)) + 1 
        : 1;
      const newDevice: Item = {
        id: 0,
        idx: newIdx,
        station_id: 0,
        division_id: 0,
        path_id: 0,
        decimal_part_digits: 2
      };
      state.currentPresetTable.tab_device_presets.push(newDevice);
    },
    deleteDevice: (state, action: PayloadAction<number>) => {
      state.currentPresetTable = {
        ...state.currentPresetTable,
        tab_device_presets: state.currentPresetTable.tab_device_presets.filter((_, idx) => idx !== action.payload),
      };
    },
    updateDevice: (state, action: PayloadAction<{ index: number; group: Preset }>) => {
      const { index, group } = action.payload;
      if (state.groups[index]) {
        state.groups[index] = { ...group };
      }
    },
  },
});

export const { loadUnitGroupList, addUnitGroup, updateGroup, updateFromCurrent, deleteGroup, setCurrentGroup, updateCurrentGroup, setSelectedGroup, updateCurrentGroupUnit, updateCurrentUnitDevice, 
  addDevice, deleteDevice, updateDevice } = unitGroupSlice.actions;
export default unitGroupSlice.reducer;
