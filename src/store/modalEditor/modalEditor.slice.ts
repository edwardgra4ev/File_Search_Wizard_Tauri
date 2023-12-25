import { createSlice } from "@reduxjs/toolkit";

export const modalEditorSlice = createSlice({
  name: "modalEditor",
  initialState: {
    isVisibleEditor: false,
    currentIndex: 0,
    isDisablePreviousIndex: true,
    isDisableNextIndex: true,
    editorText: "",
    editorContents: "",
    editorHeader: "",
    indexes: [],
  },
  reducers: {
    setIsVisibleEditor: (state, action) => {
      state.isVisibleEditor = action.payload;
    },
    setCurrentIndex: (state, action) => {
      state.currentIndex = action.payload;
    },
    setDisablePreviousIndex: (state, action) => {
      state.isDisablePreviousIndex = action.payload;
    },
    setDisableNextIndex: (state, action) => {
      state.isDisableNextIndex = action.payload;
    },
    setEditorText: (state, action) => {
      state.editorText = action.payload;
    },
    setEditorHeader: (state, action) => {
      state.editorHeader = action.payload;
    },
    setIndexes: (state, action) => {
      state.indexes = action.payload;
    },
    setEditorContents: (state, action) => {
      state.editorContents = action.payload;
    },
  },
});

export const { actions, reducer } = modalEditorSlice;
