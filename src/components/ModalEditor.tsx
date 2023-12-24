import { FC, useRef } from 'react'

import { Dialog } from 'primereact/dialog'
import { Editor } from 'primereact/editor'

interface IModalEditor {
	header: string
	indexes: number[]
}

const ModalEditor: FC<IModalEditor> = ({ header, indexes }) => {
	const quillRef = useRef(null)

	return (
		<div className='card'>
			<Dialog
				className='w-screen h-screen'
				header={header}
				visible={visible}
				modal={false}
				onHide={() => setVisible(false)}
			>
				<div className='flex flex-row flex-wrap'>
					<Button
						icon={<FaArrowLeftLong />}
						style={{ width: '49.5%' }}
						disabled={isDisablePreviousIndex}
						onClick={previousIndex}
					></Button>
					<div style={{ width: '1%' }}></div>
					<Button
						icon={<FaArrowRightLong />}
						style={{ width: '49.5%' }}
						disabled={isDisableNextIndex}
						onClick={nexIndex}
					></Button>
				</div>
				<div
					className='pt-2'
					style={{
						height: '95%',
					}}
				>
					<Editor
						ref={quillRef}
						value={value}
						readOnly
						style={{ height: '450px', fontSize: '18px' }}
					/>
				</div>
			</Dialog>
		</div>
	)
}

export default ModalEditor
