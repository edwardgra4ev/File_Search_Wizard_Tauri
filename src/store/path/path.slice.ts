import { createSlice } from "@reduxjs/toolkit";

export const patSlice = createSlice({
  name: "path",
  initialState: {
    path: "",
  },
  reducers: {
    setPath: (state, action) => {
      state.path = action.payload;
    },
  },
});

export const { actions, reducer } = patSlice;
