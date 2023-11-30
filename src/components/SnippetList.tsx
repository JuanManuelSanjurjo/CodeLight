import { useEffect, useState } from 'react'
import { FileEntry, readDir } from '@tauri-apps/api/fs'
import { desktopDir} from '@tauri-apps/api/path'
import { useSnippetStore } from '../store/snippetStore'
import { useConfigStore } from '../store/configStore'
import SnippetItem from './SnippetItem'
import { languages } from './Editor'

function SnippetList() {
	const setSnippetsNames = useSnippetStore(state => state.setSnippetsNames)
	const directory = useConfigStore(state => state.dir)
	const setDir = useConfigStore(state => state.setDir)
	const [files, setFiles] = useState<FileEntry[]>([])

 //TODO usar 'react-treebeard' para arbol de directorios

	useEffect(()=> {
		async function loadFiles(){
		  let dir = localStorage.getItem("directory");
			
		  if (!dir) {
			dir = await desktopDir();
		  }
		  setDir(dir!)
		  let files = await readDir(`${dir}` )
		  // TODO filtrar por archivos que tienen la extension que soporta el programa
		  files = files.filter( file =>  Object.keys(languages).includes(file.name!.split(".")[1])
		  )

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