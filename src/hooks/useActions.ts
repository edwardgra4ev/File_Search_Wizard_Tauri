import { bindActionCreators } from '@reduxjs/toolkit'
import { useMemo } from 'react'
import { useDispatch } from 'react-redux'

import { actions as modalEditorActions } from '../store/modalEditor/modalEditor.slice'
import { actions as pathActions } from '../store/path/path.slice'
import { actions as progressBarActions } from '../store/progressBar/progressBar.slice'
import { actions as searchResultActions } from '../store/searchResult/searchResult.slice'
import { actions as searchTextActions } from '../store/searchText/searchText.slice'
import { actions as settingsSearchActions } from '../store/settingsSearch/settingsSearch.slice'
import { actions as searchButtonActions } from '../store/startButton/startButton.slice'

const rootActions = {
	...searchTextActions,
	...pathActions,
	...searchButtonActions,
	...progressBarActions,
	...settingsSearchActions,
	...searchResultActions,
	...modalEditorActions
}
export const useActions = () => {
	const dispatch = useDispatch()

	return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch])
}
