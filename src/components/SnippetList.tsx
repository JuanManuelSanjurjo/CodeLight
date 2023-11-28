import { useEffect, useState } from 'react'
import { FileEntry, readDir } from '@tauri-apps/api/fs'
// import { desktopDir} from '@tauri-apps/api/path'
import { useSnippetStore } from '../store/snippetStore'
import { useConfigStore } from '../store/configStore'
import SnippetItem from './SnippetItem'

function SnippetList() {
	const setSnippetsNames = useSnippetStore(state => state.setSnippetsNames)
	// const snippetNames = useSnippetStore(state => state.snippetsNames)
	const directory = useConfigStore(state => state.dir)
	const [files, setFiles] = useState<FileEntry[]>([])


  useEffect(()=> {
		async function loadFiles(){
			// const desktopPath = await desktopDir() 
			const files = await readDir(`${directory}` )
			setFiles(files)
			const filenames = files.map(file => file.name!)
			setSnippetsNames(filenames)
		}
		loadFiles(); // load files immediately on component mount

		const intervalId = setInterval(loadFiles, 2000); // reload files every 2 seconds

		return () => {
			clearInterval(intervalId); // clear interval on component unmount
		};
	},[directory])
     

	
  return (
	<>
		<div>
			
			{files.map( file => (
				<SnippetItem key={file.path} snippetName={file.name!} file={file}/>

			))}
		</div>
	</>
  )
}

export default SnippetList