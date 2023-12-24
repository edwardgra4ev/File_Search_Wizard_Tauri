import { bindActionCreators } from '@reduxjs/toolkit'
import { useMemo } from 'react'
import { useDispatch } from 'react-redux'

import { actions as searchTextActions } from '../store/searchText/searchText.slice'
import { actions as pathActions } from '../store/path/path.slice'
import { actions as searchButtonActions } from '../store/searchButton/searchButton.slice'
import { actions as progressBarActions } from '../store/progressBar/progressBar.slice'
import { actions as settingsSearchActions } from '../store/settingsSearch/settingsSearch.slice'
import { actions as searchResultActions } from '../store/searchResult/searchResult.slice'

const rootActions = {
	...searchTextActions,
	...pathActions,
	...searchButtonActions,
	...progressBarActions,
	...settingsSearchActions,
	...searchResultActions,
}
export const useActions = () => {
	const dispatch = useDispatch()

	return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch])
}
