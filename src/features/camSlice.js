import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cameraImg: null,
};

// setter
export const camSlice = createSlice({
  name: "cam",
  initialState,
  reducers: {
    setCameraImg: (state, action) => {
      state.cameraImg = action.payload;
    },
    resetCameraImg: (state) => {
      state.cameraImg = null;
    },
  },
});

export const { setCameraImg, resetCameraImg } = camSlice.actions;

// getter
export const selectcameraImg = (state) => state.cam.cameraImg;

export default camSlice.reducer;
