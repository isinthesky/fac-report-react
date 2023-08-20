import { combineReducers, configureStore } from "@reduxjs/toolkit";

import optionReducer from "../features/reducers/optionSlice";
import deviceReducer from "../features/reducers/deviceSlice";

const rootReducer = combineReducers({
  optionReducer,
  deviceReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
