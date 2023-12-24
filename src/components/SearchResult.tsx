import { FC, useEffect, useState, CSSProperties } from 'react'
import { Fieldset } from 'primereact/fieldset'
import { DataTable, DataTableFilterMeta } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { FilterMatchMode } from 'primereact/api'
import { ColumnGroup } from 'primereact/columngroup'
import { Row } from 'primereact/row'
import { Accordion, AccordionTab } from 'primereact/accordion'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { InputText } from 'primereact/inputtext'
import { MdFilterAltOff } from 'react-icons/md'
import { Button } from 'primereact/button'

interface ISearchResult {
	className?: string
}

const defaultFilters: DataTableFilterMeta = {
	global: { value: null, matchMode: FilterMatchMode.CONTAINS },
	file_path: { value: null, matchMode: FilterMatchMode.CONTAINS },
	repetitions_count: { value: null, matchMode: FilterMatchMode.EQUALS },
}

const SearchResult: FC<ISearchResult> = ({ className }) => {
	const [isHiddenResult, setIsHiddenResult] = useState(true)
	const [isHiddenError, setIsHiddenError] = useState(true)
	const [filters, setFilters] = useState<DataTableFilterMeta>(defaultFilters)
	const [globalFilterValue, setGlobalFilterValue] = useState<string>('')
	const { result, error } = useSelector(
		(state: RootState) => state.searchResult
	)

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

	const onGlobalFilterChange = (value: string) => {
		let _filters = { ...filters }
		// @ts-ignore
		_filters['global'].value = value

		setFilters(_filters)
		setGlobalFilterValue(value)
	}

	const renderHeader = () => {
		return (
			<div className='flex align-items-center justify-content-center'>
				<div className='p-inputgroup flex-1'>
					<Button
						icon={<MdFilterAltOff color='white' />}
						onClick={_ => onGlobalFilterChange('')}
					/>
					<InputText
						value={globalFilterValue}
						onChange={e => onGlobalFilterChange(e.target.value)}
						placeholder='Поиск по таблице'
					/>
				</div>
			</div>
		)
	}

	const header = renderHeader()
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
						header={header}
						emptyMessage='Нет записей.'
						footerColumnGroup={footerGroup(result)}
						// paginatorTemplate='RowsPerPageDropdown PrevPageLink CurrentPageReport NextPageLink'
						// footerColumnGroup={footerGroup}
					>
						<Column field='file_path' header='Путь к файлу'></Column>
						<Column
							field='repetitions_count'
							header='Кол-во совпадений'
							sortable
						></Column>
						{/* <Column body={openBodyTemplate}></Column> */}
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
									<Column field='path' header='Путь к файлу'></Column>
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
