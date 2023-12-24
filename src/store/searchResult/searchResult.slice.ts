import { createSlice } from '@reduxjs/toolkit'

interface IResultData {
	path: string
	repeatCount: number
	indexes: number[]
}

interface IErrorData {
	path: string
}

interface IState {
	result: IResultData[]
	error: IErrorData[]
}

const initialState: IState = {
	result: [],
	error: [],
}

export const searchResultSlice = createSlice({
	name: 'searchResult',
	initialState: initialState,
	reducers: {
		setSearchResult: (state, action) => {
			state.result = action.payload
		},
		setSearchError: (state, action) => {
			state.error = action.payload
		},
	},
})

export const { actions, reducer } = searchResultSlice
