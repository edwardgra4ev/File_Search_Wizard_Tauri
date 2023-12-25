import { readTextFile } from '@tauri-apps/api/fs'
import { Accordion, AccordionTab } from 'primereact/accordion'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { ColumnGroup } from 'primereact/columngroup'
import { DataTable } from 'primereact/datatable'
import { Fieldset } from 'primereact/fieldset'
import { Row } from 'primereact/row'
import { FC, useEffect, useState } from 'react'
import { MdFileOpen } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { error_message } from '../hooks/messages'
import { useActions } from '../hooks/useActions'
import { RootState } from '../store/store'
import ResultTableHeader from './ResultTableHeader'

interface ISearchResult {
	className?: string
	toast: any
}

const SearchResult: FC<ISearchResult> = ({ className, toast }) => {
	const [isHiddenResult, setIsHiddenResult] = useState(true)
	const [isHiddenError, setIsHiddenError] = useState(true)
	const { result, error, filters } = useSelector(
		(state: RootState) => state.searchResult
	)
	const {
		setIndexes,
		setEditorHeader,
		setIsVisibleEditor,
		setEditorContents
	} = useActions()

	const footerGroup = (array: any) => {
		return (
			<ColumnGroup>
				<Row>
					<Column
						footer='Всего записей:'
						colSpan={1}
						footerStyle={{ textAlign: 'right' }}
					/>
					<Column footer={array.length} />
				</Row>
			</ColumnGroup>
		)
	}

	useEffect(() => {
		if (!result || result.length == 0) setIsHiddenResult(true)
		else setIsHiddenResult(false)

		if (!error || error.length == 0) setIsHiddenError(true)
		else setIsHiddenError(false)
	}, [result, error])

	const openModal = async (data: any) => {
		const contents = await readTextFile(data.file_path)
		if (contents && contents != '') {
			setIndexes(data.indexes)
			setEditorHeader(data.file_path)
			setIsVisibleEditor(true)
			setEditorContents(contents)
		} else {
			await error_message(toast, 'Не удалось открыть файл')
		}
	}

	const openBodyTemplate = (data: any) => {
		return (
			<Button
				icon={<MdFileOpen />}
				onClick={() => openModal(data)}
			></Button>
		)
	}
	return (
		<div className={className} hidden={isHiddenResult}>
			<Fieldset className='' legend='Найденные файлы'>
				<div className='card'>
					<DataTable
						value={result}
						paginator
						rows={5}
						rowsPerPageOptions={[5, 10, 25, 50]}
						sortOrder={-1}
						dataKey='file_path'
						filters={filters}
						globalFilterFields={['file_path', 'repetitions_count']}
						header={<ResultTableHeader />}
						emptyMessage='Нет записей.'
						footerColumnGroup={footerGroup(result)}
					>
						<Column
							field='file_path'
							header='Путь к файлу'
						></Column>
						<Column
							field='repetitions_count'
							header='Кол-во совпадений'
							sortable
						></Column>
						<Column body={openBodyTemplate}></Column>
					</DataTable>
					<div className='pt-2' hidden={isHiddenError}>
						<Accordion>
							<AccordionTab header='Файлы которые не удалось прочитать'>
								<DataTable
									paginator
									value={error}
									rows={5}
									rowsPerPageOptions={[5, 10, 25, 50]}
									footerColumnGroup={footerGroup(error)}
								>
									<Column
										field='path'
										header='Путь к файлу'
									></Column>
								</DataTable>
							</AccordionTab>
						</Accordion>
					</div>
				</div>
			</Fieldset>
		</div>
	)
}

export default SearchResult
