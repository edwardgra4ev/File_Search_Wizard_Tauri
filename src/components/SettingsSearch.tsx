import { FC } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { useActions } from '../hooks/useActions'

import { Checkbox } from 'primereact/checkbox'
import { Accordion, AccordionTab } from 'primereact/accordion'
import { Calendar } from 'primereact/calendar'

import { InputText } from 'primereact/inputtext'
import { useEffect, useState } from 'react'

import { format } from 'date-fns'
import { Nullable } from 'primereact/ts-helpers'

import { info_message, success_message } from '../hooks/messages'

import { listen } from '@tauri-apps/api/event'

interface ISettingsSearch {
	toast: any
}

const SettingsSearch: FC<ISettingsSearch> = ({ toast }) => {
	const [date, setDate] = useState<Date | null>(null)
	const { isSearch } = useSelector((state: RootState) => state.searchButton)
	const {
		isRecursion,
		isFileNames,
		isExtensions,
		isDateModification,
		fileNames,
		extensions,
	} = useSelector((state: RootState) => state.settingsSearch)
	const {
		setDateModification,
		setExtensions,
		setFileNames,
		setIsDateModification,
		setIsExtensions,
		setIsFileNames,
		setIsRecursion,
		setIsSearch,
		setSearchResult,
		setSearchError,
		setHiddenProgressBar,
	} = useActions()

	const changeDate = (date: Nullable<Date>) => {
		if (date) {
			setDate(date)
			setDateModification(format(date, 'dd-MM-yyyy'))
		}
	}

	useEffect(() => {
		if (!date) changeDate(new Date())

		const search_result = listen('SEARCH_RESULT', (e: any) => {
			setIsSearch(false)
			setHiddenProgressBar(true)
			if (e && e.payload && e.payload.result && e.payload.error) {
				setSearchResult(e.payload.result)
				setSearchError(e.payload.error)
				success_message(
					toast,
					`Поиск завершен, найдено ${e.payload.result.length} файлов`
				)
			}
		})

		const count_files_found = listen('COUNT_FILE_FOUND', e => {
			info_message(
				toast,
				`Найдено ${e.payload} файлов соответствующих критериям отбора`
			)
		})

		return () => {
			search_result.then((f: any) => f())
			count_files_found.then((f: any) => f())
		}
	}, [])

	return (
		<Accordion className='pt-2'>
			<AccordionTab header='Настройки'>
				<div className='pt-2 p-inputgroup flex-1'>
					<span className='p-inputgroup-addon'>
						<Checkbox
							inputId='isDateModification'
							onChange={e => setIsDateModification(e.checked)}
							checked={isDateModification}
						/>
						<i className='pl-2 text-white w-20rem'>Поиск по дате модификации</i>
					</span>
					<Calendar
						value={date}
						onChange={e => changeDate(e.value)}
						dateFormat='dd.mm.yy'
						disabled={!isDateModification}
					/>
				</div>
				<div className='pt-2 p-inputgroup flex-1'>
					<span className='p-inputgroup-addon'>
						<Checkbox
							inputId='isDateModification'
							onChange={e => setIsFileNames(e.checked)}
							checked={isFileNames}
						/>
						<i className='pl-2 text-white w-20rem'>
							Поиск с учетом имени файла
						</i>
					</span>
					<InputText
						className='text-white'
						placeholder='Пример: "test, file". Результат ["test.txt", "my_test.json", "file1.xml"]'
						value={fileNames}
						onChange={e => setFileNames(e.target.value)}
						disabled={!isFileNames}
					/>
				</div>
				<div className='pt-2 p-inputgroup flex-1'>
					<span className='p-inputgroup-addon'>
						<Checkbox
							inputId='isDateModification'
							onChange={e => setIsExtensions(e.checked)}
							checked={isExtensions}
						/>
						<i className='pl-2 text-white w-20rem'>
							Поиск с учетом расширения файла
						</i>
					</span>
					<InputText
						className='text-white'
						placeholder='Пример: [txt, log, json, xml]'
						value={extensions}
						disabled={!isExtensions}
						onChange={e => setExtensions(e.target.value)}
					/>
				</div>
				<div className='pt-2 p-inputgroup flex-1'>
					<span className='p-inputgroup-addon'>
						<Checkbox
							inputId='isDateModification'
							onChange={e => setIsRecursion(e.checked)}
							checked={isRecursion}
						/>
						<i className='pl-2 text-white w-20rem'>Рекурсивный поиск файлов</i>
					</span>
				</div>
			</AccordionTab>
		</Accordion>
	)
}

export default SettingsSearch
