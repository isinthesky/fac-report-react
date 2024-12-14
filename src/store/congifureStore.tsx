import { combineReducers, configureStore } from "@reduxjs/toolkit";

import settingReducer, { SettingState } from "@/store/slices/settingSlice";
import tabPageReducer, { TabPageState } from "@/entities/reducers/tabPageSlice";
import deviceReducer, { DeviceState } from "@/entities/reducers/deviceSlice";
import unitGroupReducer, { UnitGroupState } from "@/entities/reducers/unitGroupSlice";

export interface RootStore {
  settingReducer: SettingState;
  deviceReducer: DeviceState;
  tabPageReducer: TabPageState;
  unitGroupReducer: UnitGroupState;
}

const rootReducer = combineReducers({
  settingReducer,
  tabPageReducer,
  deviceReducer,
  unitGroupReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;