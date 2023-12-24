import { createSlice } from '@reduxjs/toolkit'

export const searchTextSlice = createSlice({
	name: 'progressBar',
	initialState: {
		isHiddenProgressBar: true,
	},
	reducers: {
		setHiddenProgressBar: (state, action) => {
			state.isHiddenProgressBar = action.payload
		},
	},
})

export const { actions, reducer } = searchTextSlice
