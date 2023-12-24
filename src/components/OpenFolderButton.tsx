import { FC } from 'react'
import { Button } from 'primereact/button'

import { FaFolderOpen } from 'react-icons/fa6'

import { open } from '@tauri-apps/api/dialog'
import { homeDir } from '@tauri-apps/api/path'

import { useActions } from '../hooks/useActions'
import { CSSProperties } from 'react'

interface IOpenFolderButton {
	style?: CSSProperties
}

const OpenFolderButton: FC<IOpenFolderButton> = ({ style }) => {
	const { setPath } = useActions()

	async function choiceFolder() {
		const selected = await open({
			directory: true,
			multiple: true,
			defaultPath: await homeDir(),
		})
		if (Array.isArray(selected) && selected.length === 1) {
			setPath(selected[0])
		}
	}

	return (
		<Button
			style={style}
			icon={<FaFolderOpen color='white' />}
			label='Выбор директории'
			className='text-white'
			onClick={choiceFolder}
		/>
	)
}

export default OpenFolderButton
// export default function OpenFolderButton({ style }: OpenFolderButtonProps) {}
