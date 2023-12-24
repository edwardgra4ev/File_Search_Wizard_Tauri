import { FC } from 'react'
import { Button } from 'primereact/button'

import { FaSearch } from 'react-icons/fa'
import { FaStop } from 'react-icons/fa'

import { CSSProperties } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'

import { invoke } from '@tauri-apps/api/tauri'
import { useActions } from '../hooks/useActions'

import { warning_message } from '../hooks/messages'

interface IStartSearchButton {
	style?: CSSProperties
	toast: any
}

const StartSearchButton: FC<IStartSearchButton> = ({ style, toast }) => {
	const { isSearch } = useSelector((state: RootState) => state.searchButton)
	const { path } = useSelector((state: RootState) => state.path)
	const { text } = useSelector((state: RootState) => state.searchText)
	const {
		isRecursion,
		isFileNames,
		isExtensions,
		isDateModification,
		dateModification,
		extensionsArray,
		fileNamesArray,
	} = useSelector((state: RootState) => state.settingsSearch)

	const { setHiddenProgressBar, setIsSearch } = useActions()

	const start = () => {
		if (path == '')
			return warning_message(toast, 'Необходимо указать путь до директории')
		if (text == '' || text.length < 3)
			return warning_message(toast, 'Указан не корректный текст поиска')
		if (isDateModification && !dateModification)
			return warning_message(
				toast,
				'При указании "Поиск по дате модификации" необходимо корректную указать дату'
			)
		if (
			isDateModification &&
			dateModification &&
			new Date(dateModification) > new Date()
		)
			return warning_message(
				toast,
				'При указании "Поиск по дате модификации" указанная дата не может быть больше текущего'
			)
		if (isFileNames && (!fileNamesArray || fileNamesArray.length == 0))
			return warning_message(
				toast,
				'При указании "Поиск с учетом имени файла" необходимо указать имя файла'
			)
		if (isExtensions && (!extensionsArray || extensionsArray.length == 0))
			return warning_message(
				toast,
				'При указании "Поиск с учетом расширения файла" необходимо указать расширение файла'
			)
		setIsSearch(true)
		setHiddenProgressBar(false)
		invoke('search_files', {
			path: path,
			text: text.toLowerCase(),
			names: isFileNames ? fileNamesArray : null,
			extensions: isExtensions ? extensionsArray : null,
			modifiedDate: isDateModification ? dateModification : null,
			isRecursion: isRecursion,
		})
	}

	const stop = () => {
		invoke('stop_search')
		setIsSearch(false)
	}
	return isSearch ? (
		<Button
			style={style}
			icon={<FaStop color='white' />}
			label='Остановить'
			onClick={stop}
			className='text-white'
			severity='danger'
		/>
	) : (
		<Button
			style={style}
			icon={<FaSearch color='white' />}
			label='Поиск'
			onClick={start}
			className='text-white'
		/>
	)
}

export default StartSearchButton
