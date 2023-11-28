import  { useEffect, useState } from 'react'
import {Editor as EditorVs} from '@monaco-editor/react';
import { useSnippetStore } from '../store/snippetStore'
import { writeTextFile } from '@tauri-apps/api/fs';
import { join } from '@tauri-apps/api/path';
import { useConfigStore } from '../store/configStore';

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
      await writeTextFile(filepath, text ?? "")  
      
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
      (<h1>No snippet Selected</h1>) 
     }
     </>
  )
}

export default Editor;