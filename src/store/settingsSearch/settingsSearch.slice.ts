import { createSlice } from "@reduxjs/toolkit";

const stringToArray = (str: String) => {
  return str != "" ? str.toLowerCase().replace(/ /g, "").split(",") : [];
};

interface IState {
  isRecursion: boolean;
  isFileNames: boolean;
  isExtensions: boolean;
  isDateModification: boolean;
  fileNames: string;
  fileNamesArray: string[];
  extensions: string;
  extensionsArray: string[];
  dateModification: string | null;
}

const initialState: IState = {
  isRecursion: false,
  isFileNames: false,
  isExtensions: false,
  isDateModification: false,
  fileNames: "",
  fileNamesArray: [],
  extensions: "",
  extensionsArray: [],
  dateModification: null,
};

export const settingsSearchSlice = createSlice({
  name: "settingsSearch",
  initialState: initialState,
  reducers: {
    setIsRecursion: (state, action) => {
      state.isRecursion = action.payload;
    },
    setIsFileNames: (state, action) => {
      state.isFileNames = action.payload;
    },
    setIsExtensions: (state, action) => {
      state.isExtensions = action.payload;
    },
    setIsDateModification: (state, action) => {
      state.isDateModification = action.payload;
    },
    setFileNames: (state, action) => {
      state.fileNames = action.payload;
      state.fileNamesArray = stringToArray(action.payload);
    },
    setExtensions: (state, action) => {
      state.extensions = action.payload;
      state.extensionsArray = stringToArray(action.payload);
    },
    setDateModification: (state, action) => {
      state.dateModification = action.payload;
    },
  },
});

export const { actions, reducer } = settingsSearchSlice;
