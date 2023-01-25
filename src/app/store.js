import { configureStore } from "@reduxjs/toolkit";
import appReducer from "../features/appSlice";
import camReducer from "../features/camSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    cam: camReducer,
  },
});
