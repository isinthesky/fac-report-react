import { combineReducers, configureStore } from "@reduxjs/toolkit";

import settingReducer, { SettingState } from "../features/reducers/settingSlice"
import tabPageReducer, { TabPageState } from "../features/reducers/tabPageSlice"
import deviceReducer, { DeviceState } from "../features/reducers/deviceSlice";

export interface RootStore {
  settingReducer: SettingState;
  deviceReducer: DeviceState;
  tabPageReducer: TabPageState;
}

const rootReducer = combineReducers({
  settingReducer,
  tabPageReducer,
  deviceReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
