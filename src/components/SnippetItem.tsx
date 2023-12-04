import { useSnippetStore } from '../store/snippetStore'
import { twMerge } from 'tailwind-merge'
import { readTextFile, removeFile, FileEntry } from '@tauri-apps/api/fs'
import { join } from '@tauri-apps/api/path'
import toast from 'react-hot-toast'
import {FiTrash, FiX} from "react-icons/fi"
import { useConfigStore } from '../store/configStore'

interface Props {
  snippetName: string,
  file: FileEntry
}

function SnippetItem({snippetName}: Props) {
  const setSelectedSnippet = useSnippetStore(state => state.setSelectedSnippet)
  const selectedSnippet = useSnippetStore(store => store.selectedSnippet)
  const dir = useConfigStore(state => state.dir)


  async function handleDelete(snippetName: string) {
    const confirm = await window.confirm("This will completely remove the file from de disk\nAre you sure you want to proceed?")
    if(!confirm) return

    const filepath = await join(dir, `${snippetName}` )
    await removeFile(filepath)
    toast.error("Snippet deleted", { duration: 2000, position:"bottom-center", style: {background: "#181818", color: "#fff"} })
  }


  return (
    <div className={twMerge(selectedSnippet?.name === snippetName ?  "bg-[#BE3144] " : "",'text-slate-300  flex justify-between py-1 px-4 hover:bg-[#4c0519] hover:cursor-pointer hover:pl-10 transition-all  ')}
        title={snippetName}    
        onClick={ async ()=>{ 
          const filepath = await join(dir, `${snippetName}`)
          const pathComponents = filepath.split("\\");
          const fileDirectory = pathComponents.slice(0, -1).join("\\");
          const snippetCode = await readTextFile(filepath) 
          setSelectedSnippet(null)
          setSelectedSnippet({name : snippetName, code: snippetCode, dir:fileDirectory })
        }}
    > 
    <h1>{snippetName.split(".")[0]} <span className='text-[#F05941] '>{snippetName.split(".")[1]}</span></h1>
    { snippetName === selectedSnippet?.name &&
      <div className='flex gap-2 justify-center items-center text-[#16071b]   transition'>
        <FiTrash 
          title="Delete"
          className="hover:scale-125 hover:text-[#F05941] transition"
          onClick={ (e: React.MouseEvent) => {
          e.stopPropagation()
          handleDelete(snippetName)
          setSelectedSnippet(null)

        }}
        />
        <FiX
          title="Close"
          className="hover:scale-125 hover:text-[#F05941] transition"
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation()
            setSelectedSnippet(null)
          }}
        />
      </div>}
    </div>
  )
}

export default SnippetItem