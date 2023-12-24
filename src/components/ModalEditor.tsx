import { FC, useEffect, useRef } from 'react'

import { Dialog } from 'primereact/dialog'
import { Editor } from 'primereact/editor'
import { RootState } from '../store/store'
import { useSelector } from 'react-redux'
import { useActions } from '../hooks/useActions'
import { Button } from 'primereact/button'
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6'

const ModalEditor: FC = () => {
	const { textLength } = useSelector((state: RootState) => state.searchText)
	const {
		isVisibleEditor,
		currentIndex,
		isDisableNextIndex,
		isDisablePreviousIndex,
		editorHeader,
		editorText,
		editorContents,
		indexes,
	} = useSelector((state: RootState) => state.modalEditor)
	const quillRef = useRef(null)

	const {
		setIsVisibleEditor,
		setCurrentIndex,
		setDisableNextIndex,
		setDisablePreviousIndex,
	} = useActions()

	function nexIndex() {
		let index = currentIndex + 1
		setDisablePreviousIndex(false)
		let indexCursor = indexes[index]
		// @ts-ignore
		let quill = quillRef.current.getQuill()
		quill.setSelection(indexCursor, textLength)
		quill.scrollIntoView()
		setCurrentIndex(index)
		if (index + 1 >= indexes.length) {
			setDisableNextIndex(true)
		}
	}

	function previousIndex() {
		let index = currentIndex - 1
		setDisableNextIndex(false)
		let indexCursor = indexes[index]
		// @ts-ignore
		let quill = quillRef.current.getQuill()
		quill.setSelection(indexCursor, textLength)
		quill.scrollIntoView()
		setCurrentIndex(index)
		if (index <= 0) {
			setDisablePreviousIndex(true)
		}
	}

	const loadEditor = () => {
		console.log(quillRef)
		if (quillRef && quillRef.current) {
			// @ts-ignore
			let quill = quillRef.current.getQuill()
			quill.setText(editorContents)
			quill.setSelection(indexes[0], textLength)
			quill.scrollIntoView()
			if (indexes.length > 1) {
				setDisableNextIndex(false)
			}
		}
	}
	return (
		<div className='card'>
			<Dialog
				className='w-screen h-screen'
				header={editorHeader}
				visible={isVisibleEditor}
				modal={false}
				onHide={() => setIsVisibleEditor(false)}
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
						value={editorText}
						readOnly
						onLoad={() => loadEditor()}
						style={{ height: '450px', fontSize: '18px' }}
					/>
				</div>
			</Dialog>
		</div>
	)
}

export default ModalEditor
