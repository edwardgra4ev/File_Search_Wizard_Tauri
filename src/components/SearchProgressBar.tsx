import { FC } from 'react'
import { ProgressBar } from 'primereact/progressbar'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'

const SearchProgressBar: FC = () => {
	const { isHiddenProgressBar } = useSelector(
		(state: RootState) => state.progressBar
	)
	return <ProgressBar mode='indeterminate' hidden={isHiddenProgressBar} />
}

export default SearchProgressBar
