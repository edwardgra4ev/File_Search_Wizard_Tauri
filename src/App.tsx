import { useRef } from 'react'

import { Card } from 'primereact/card'
import { Fieldset } from 'primereact/fieldset'
import { Toast } from 'primereact/toast'

import ModalEditor from './components/ModalEditor'
import OpenFolderButton from './components/OpenFolderButton'
import SearchProgressBar from './components/ProgressBar'
import SearchResult from './components/SearchResult'
import SettingsSearch from './components/Settings'
import StartSearchButton from './components/StartButton'
import SearchTextInput from './components/TextInput'

import 'primeflex/primeflex.css'
import 'primereact/resources/primereact.min.css'
import 'primereact/resources/themes/bootstrap4-dark-purple/theme.css'

function App() {
	const toast = useRef(null)
	return (
		<div className='container'>
			<Toast ref={toast} />
			<div className='container'>
				<Fieldset legend='Поиск файла'>
					<Card>
						<div className='flex flex-column'>
							<SearchTextInput />
						</div>
						<div className='pt-2 flex flex-row flex-wrap'>
							<StartSearchButton
								style={{ width: '49.5%' }}
								toast={toast}
							/>
							<span
								style={{
									width: '1%'
								}}
							/>
							<OpenFolderButton style={{ width: '49.5%' }} />
						</div>
						<div className='pt-2'>
							<SearchProgressBar />
							<SettingsSearch toast={toast} />
						</div>
					</Card>
				</Fieldset>
			</div>
			<SearchResult className={'pt-2'} toast={toast} />
			<div className='container'>
				<ModalEditor />
			</div>
		</div>
	)
}

export default App
