import { ProgressBar as BP } from 'primereact/progressbar'
import { FC } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'

const ProgressBar: FC = () => {
	const { isHiddenProgressBar } = useSelector(
		(state: RootState) => state.progressBar
	)
	return <BP mode='indeterminate' hidden={isHiddenProgressBar} />
}

export default ProgressBar
