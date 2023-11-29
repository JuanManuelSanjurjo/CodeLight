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
    const confirm = await window.confirm("Are you sure you want to delete the file from de disk?")
    if(!confirm) return

    // const extension =  file.path.split(".").pop()
    const filepath = await join(dir, `${snippetName}` )
    console.log(filepath)
    await removeFile(filepath)
    toast.error("Snippet deleted", { duration: 2000, position:"bottom-right", style: {background: "#181818", color: "#fff"} })

  }


  return (
    <div className={twMerge(selectedSnippet?.name === snippetName ? "bg-[#BE3144]" : "",'text-slate-300  flex justify-between py-1 px-4 hover:bg-[#4c0519] hover:cursor-pointer ')}
        onClick={ async ()=>{ 
          // const extension =  file.path.split(".").pop()
          const filepath = await join(dir, `${snippetName}`)
          const snippetCode = await readTextFile(filepath)
          setSelectedSnippet({name : snippetName, code: snippetCode})
        }}
    
    > <h1>{snippetName.split(".")[0]} <span className='text-[#F05941]'>{snippetName.split(".")[1]}</span></h1>
    { snippetName === selectedSnippet?.name &&
      <div className='flex gap-2 justify-center items-center text-slate-700 hover:scale-110 transition'>
        <FiTrash 
          onClick={ (e: React.MouseEvent) => {
          e.stopPropagation()
          handleDelete(snippetName)
          setSelectedSnippet(null)

        }}
        />
        <FiX
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