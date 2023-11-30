import  { useEffect, useState } from 'react'
import {Editor as EditorVs} from '@monaco-editor/react';
import { useSnippetStore } from '../store/snippetStore'
import { writeTextFile } from '@tauri-apps/api/fs';
import { join } from '@tauri-apps/api/path';
import { useConfigStore } from '../store/configStore';
import { Triangle } from  'react-loader-spinner'


// TODO cerrar el edito desde el mismo editor
// TODO tips e instrucciones en la pagina de descanso con un div desplegable animado

const languages: { [key: string]: string }= {
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
  const [text, setText] = useState<string|undefined>("")
  const dir = useConfigStore(state => state.dir)


  useEffect(()=> {
    if(!selectedSnippet) return

    const autoSave = setTimeout( async()=>{
      const filepath = await join(dir, `${selectedSnippet.name}`)
      if(text){
        await writeTextFile(filepath, text)  
      }
      
    }, 500)

    return () => {clearTimeout(autoSave)}
  },[text])

  return (
    < >
     { selectedSnippet  ? 
      ( <EditorVs  language={languages[selectedSnippet.name.split(".").pop() || "javascript"] } defaultValue="" theme='vs-dark' 
            options={{fontSize: 16, minimap: {enabled: false} ,  wordWrap: "on"}}
            onChange={(value) => setText(value)}    
            value={selectedSnippet?.code ?? ""}
            className='editor'
        />)
     : 
      (
      <div className='flex flex-col gap-10 justify-center items-center'>
        <Triangle
          height="100"
          width="100"
          color="#F05941"
          ariaLabel="triangle-loading"
          wrapperStyle={{}}
          // wrapperClassName=""
          visible={true}
        />
      <h1 className='text-slate-400'>No snippet Selected</h1>
      <button type='button' title='Select directory (Ctrl+Q)'  
        className='bg-[#4c0519]  w-full text-slate-300  hover:bg-[#F05941] transition-colors rounded-md '>Browse folder <span className='pl-1'>&#128447;</span> </button>
        {/* TODO que este boton lleve al buscador de carpetas */}
      </div>
      ) 
     }
     </>
  )
}

export default Editor;