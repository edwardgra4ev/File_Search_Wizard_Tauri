import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { FC } from 'react'
import { GrPowerReset } from 'react-icons/gr'
import { useSelector } from 'react-redux'
import { useActions } from '../hooks/useActions'
import { RootState } from '../store/store'

const TextInput: FC = () => {
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

export default TextInput
