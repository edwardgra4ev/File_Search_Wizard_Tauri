import { useRef } from 'react'

import { Fieldset } from 'primereact/fieldset'
import { Card } from 'primereact/card'
import { Toast } from 'primereact/toast'

import SearchTextInput from './components/SearchTextInput'
import OpenFolderButton from './components/OpenFolderButton'
import StartSearchButton from './components/StartSearchButton'
import SearchProgressBar from './components/SearchProgressBar'
import SettingsSearch from './components/SettingsSearch'
import SearchResult from './components/SearchResult'

import 'primereact/resources/themes/bootstrap4-dark-purple/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeflex/primeflex.css'

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
							<StartSearchButton style={{ width: '49.5%' }} toast={toast} />
							<span
								style={{
									width: '1%',
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
			<SearchResult className={'pt-2'} />
			<div className='container'></div>
		</div>
	)
}

export default App
