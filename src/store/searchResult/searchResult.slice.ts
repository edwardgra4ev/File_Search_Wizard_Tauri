import { createSlice } from '@reduxjs/toolkit'
import { FilterMatchMode } from 'primereact/api'
import { DataTableFilterMeta } from 'primereact/datatable'

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
	defaultFilters: DataTableFilterMeta
	filters: DataTableFilterMeta
}

const defaultFilters: DataTableFilterMeta = {
	global: { value: null, matchMode: FilterMatchMode.CONTAINS },
	file_path: { value: null, matchMode: FilterMatchMode.CONTAINS },
	repetitions_count: { value: null, matchMode: FilterMatchMode.EQUALS }
}

const initialState: IState = {
	result: [],
	error: [],
	defaultFilters: defaultFilters,
	filters: defaultFilters
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
		setResultFilter: (state, action) => {
			state.filters = action.payload
		}
	}
})

export const { actions, reducer } = searchResultSlice
