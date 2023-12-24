import { createSlice } from '@reduxjs/toolkit'

export const searchButtonSlice = createSlice({
	name: 'searchButton',
	initialState: {
		isSearch: false,
	},
	reducers: {
		setIsSearch: (state, action) => {
			state.isSearch = action.payload
		}
	},
})

export const { actions, reducer } = searchButtonSlice
