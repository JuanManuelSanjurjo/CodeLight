import  { useEffect, useState, useRef } from 'react'
import {Editor as EditorVs} from '@monaco-editor/react';
import { useSnippetStore } from '../store/snippetStore'
import { readTextFile, writeTextFile } from '@tauri-apps/api/fs';
import { join } from '@tauri-apps/api/path';
import { useConfigStore } from '../store/configStore';
import { Triangle } from  'react-loader-spinner'
import { dialog } from '@tauri-apps/api';

export const languages: { [key: string]: string }= {
  js : "javascript",
  ty: "typescript",
  c: "c",
  cpp: "cpp",
  cs: "csharp",
  css: "css",
  html: "html",
  go: "go",
  java: "java",
  kt: "kotlin",
  sql: "sql",
  php: "php",
  ps1: "powershell",
  py: "python",
  r: "r",
  rs: "rust",
  sh: "shell",
  yml: "yaml",
  json: "json",
  md: "markdown",
  txt: "plaintext"
}


function Editor() {
  const selectedSnippet = useSnippetStore( state => state.selectedSnippet)
  const setSelectedSnippet = useSnippetStore( state => state.setSelectedSnippet)
  const [text, setText] = useState<string|undefined>("")
  const dir = useConfigStore(state => state.dir)


  useEffect(()=> {
    if(!selectedSnippet) return

    const autoSave = setTimeout( async()=>{
      const filepath = await join(`${selectedSnippet.dir}/${selectedSnippet.name}`)
      if(text){
        await writeTextFile(filepath, text)  
      }
    }, 1000)

    return () => {clearTimeout(autoSave)}
  },[text])

  useEffect(() => {
    const listenerHandleOpenFile = (event: KeyboardEvent) => {
      if (event.code === 'KeyE' && event.ctrlKey) {
        handleOpenFile()
      }
    };
  
    window.addEventListener('keydown', listenerHandleOpenFile);
    return () => {
      window.removeEventListener('keydown', listenerHandleOpenFile);
    };
  }, []);

  function handleCloseEditor(e: React.MouseEvent){
      e.stopPropagation()
      setSelectedSnippet(null)
    }

  async function handleOpenFile(){
    const resultPath = await dialog.open();
    if (resultPath){
      const filepath = Array.isArray(resultPath) ? resultPath[0] : resultPath;
      const pathComponents = filepath.split("\\");
      const filename = pathComponents[pathComponents.length - 1];
      const fileDirectory = pathComponents.slice(0, -1).join("\\");
      const snippetCode = await readTextFile(filepath)
      setSelectedSnippet({name : filename, code: snippetCode, dir: fileDirectory})
    }
  }
  

  return (
    < >
     { selectedSnippet  ? 
      ( <>
      <div autoFocus>
        <div className='absolute text-sm z-10 top-2 right-5 h-5 pr-10 w-auto flex justify-center items-center p-4 rounded-sm  bg-rose-900 ' 
         title='file'
        > 
         {selectedSnippet.dir !== dir ? selectedSnippet.dir : selectedSnippet.name }
        </div>
        <button className='absolute z-10 top-2 right-5 h-5 w-5 flex justify-center items-center p-4 rounded-sm  bg-[#BE3144] hover:bg-[#F05941]' 
         title='Ctrl+W'
         onClick={handleCloseEditor}
        > 
          &#10005;
        </button>
      </div>
        <EditorVs language={languages[selectedSnippet.name.split(".").pop() || "javascript"] } defaultValue="" theme='vs-dark' 
              options={{fontSize: 16, minimap: {enabled: false} ,  wordWrap: "on"}}
              onChange={(value) => setText(value)}    
              value={selectedSnippet?.code ?? ""}
              className='editor'
          />
      </>
        )
     : 
      (
      <div className='flex flex-col h-full gap-14 w-full justify-center items-center '>
          <div className='group hidden -mt-32 py-5 px-10 w-4/6 hover:w-5/6 hover:bg-[#2a0d33] rounded-lg border-2 border-[#2a0d33] text-slate-500 text-sm transition-all leading-6
         lg:block'>
            <h1><b># Quick start:</b></h1>
            <ul className='px-4'>
              <li><span className='bg-[#4c0519] text-slate-400 rounded-sm px-1 leading-7 border-2 border-[#2a0d33]'>Ctrl + Q</span> to select folder</li>
              <li><span className='bg-[#4c0519] text-slate-400 rounded-sm px-1 leading-7 border-2 border-[#2a0d33]'>Ctrl + E</span> to open file </li>
              <li><span className='bg-[#4c0519] text-slate-400 rounded-sm px-1 leading-7 border-2 border-[#2a0d33]'>Ctrl + S</span> to toggle sidebar</li>
              <li><span className='bg-[#4c0519] text-slate-400 rounded-sm px-1 leading-7 border-2 border-[#2a0d33]'>Ctrl + W</span> to close current editor</li>
              <li><span className='bg-[#4c0519] text-slate-400 rounded-sm px-1 leading-7 border-2 border-[#2a0d33]'>Ctrl + Q <b className='px-2'>&</b> Ctrl + E</span> to <u>set folder</u> and then search <u>files</u>  </li>
              <li><span className='bg-[#4c0519] text-slate-400 rounded-sm px-1 leading-7 border-2 border-[#2a0d33]'>..</span> on file explorer goes to previous level in tree</li>
              <li className='mt-2'><b>Be aware</b> when deleting files, those files are deleted completely</li>
            </ul>

          </div>
          <Triangle
            height="100"
            width="100"
            color="#F05941"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            visible={true}
          />
        <h1 className='text-slate-500'>No file Selected</h1>
        <button type='button' title='Open file (Ctrl+E)'  
          className='bg-[#4c0519] p-2 w-1/5 min-w-fit text-slate-300  hover:bg-[#F05941] transition-colors rounded-sm '
          onClick={handleOpenFile}
          >Open file <span className='pl-1'>&#128447;</span> </button>
      </div>
      ) 
     }
     </>
  )
}

export default Editor;
