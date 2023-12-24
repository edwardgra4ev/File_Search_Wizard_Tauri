import { createSlice } from '@reduxjs/toolkit'

export const searchTextSlice = createSlice({
	name: 'searchText',
	initialState: {
		text: '',
		textLength: 0,
	},
	reducers: {
		setText: (state, action) => {
			state.text = action.payload
			state.textLength = action.payload.length
		},
	},
})

export const { actions, reducer } = searchTextSlice
