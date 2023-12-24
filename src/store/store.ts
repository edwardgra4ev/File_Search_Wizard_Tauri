import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { reducer as pathReducer } from './path/path.slice'
import { reducer as searchTextReducer } from './searchText/searchText.slice'
import { reducer as searchButtonReducer } from './searchButton/searchButton.slice'
import { reducer as progressBarReducer } from './progressBar/progressBar.slice'
import { reducer as settingsSearchReducer } from './settingsSearch/settingsSearch.slice'
import { reducer as searchResultReducer } from './searchResult/searchResult.slice'

const reducers = combineReducers({
	path: pathReducer,
	searchText: searchTextReducer,
	searchButton: searchButtonReducer,
	progressBar: progressBarReducer,
	settingsSearch: settingsSearchReducer,
	searchResult: searchResultReducer,
})

export const store = configureStore({
	reducer: reducers,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
