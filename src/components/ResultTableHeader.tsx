import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { FC, useState } from 'react'
import { MdFilterAltOff } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { useActions } from '../hooks/useActions'
import { RootState } from '../store/store'

const ResultTableHeader: FC = () => {
	const { filters } = useSelector((state: RootState) => state.searchResult)
	const { setResultFilter } = useActions()
	const [globalFilterValue, setGlobalFilterValue] = useState<string>('')

	const onGlobalFilterChange = (value: string) => {
		let _filters = structuredClone({ ...filters })
		// @ts-ignore
		_filters['global'].value = value

		setResultFilter(_filters)
		setGlobalFilterValue(value)
	}
	return (
		<div className='p-inputgroup'>
			<InputText
				value={globalFilterValue}
				onChange={e => onGlobalFilterChange(e.target.value)}
				placeholder='Поиск по таблице'
			/>
			<Button
				icon={<MdFilterAltOff color='white' />}
				onClick={_ => onGlobalFilterChange('')}
			/>
		</div>
	)
}

export default ResultTableHeader
