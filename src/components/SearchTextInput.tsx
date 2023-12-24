import { FC } from 'react'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { GrPowerReset } from 'react-icons/gr'
import { useSelector } from 'react-redux'
import { useActions } from '../hooks/useActions'
import { RootState } from '../store/store'

const SearchTextInput: FC = () => {
	const { text } = useSelector((state: RootState) => state.searchText)
	const { setText } = useActions()
	return (
		<div className='flex align-items-center justify-content-center'>
			<div className='p-inputgroup flex-1'>
				<InputText
					placeholder='Укажите строку поиска'
					value={text}
					tooltip='Длинна искомого текста не должна быть меньше 3 символов'
					tooltipOptions={{ position: 'top' }}
					onChange={e => setText(e.target.value)}
				/>
				<Button
					icon={<GrPowerReset color='white' />}
					onClick={() => setText('')}
				/>
			</div>
		</div>
	)
}

export default SearchTextInput
