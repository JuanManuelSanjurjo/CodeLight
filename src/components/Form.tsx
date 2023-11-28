import { useState, useEffect } from 'react'
import { writeTextFile } from '@tauri-apps/api/fs'
import { desktopDir, join } from '@tauri-apps/api/path'
import { useSnippetStore } from '../store/snippetStore'
import { dialog } from '@tauri-apps/api';
import toast from 'react-hot-toast'
import { useConfigStore } from '../store/configStore';


interface Props {
  language: string,
  setLanguage:  React.Dispatch<React.SetStateAction<string>>;
}


function Form({language, setLanguage}: Props) {
  const [snippetName, setSnippetName] = useState("")
  const addSnippetName = useSnippetStore(state => state.setSnippetName)
  const snippetNames = useSnippetStore((state) => state.snippetsNames);
  const directory = useConfigStore(state => state.dir)
  const setDir = useConfigStore( state => state.setDir)


  useEffect(() => {
    (async() => {
      const customDir = localStorage.getItem("directory")
      const dir = await desktopDir();
      if(!customDir){
        setDir(dir);

      }
    })();
  }, []);


  async function handleSetDirectory(){
    const result = await dialog.open({ directory: true });
    if (result != null &&  !Array.isArray(result)){
      setDir(result)
      localStorage.setItem("directory", result)
    }
  }

  return (
    <>
    <button type='button' onClick={handleSetDirectory} className='bg-[#BE3144] w-full hover:bg-[#F05941] transition-colors rounded-sm'>Set directory</button>
    <form
    onSubmit={ async (e) => {
      e.preventDefault()

      console.log(snippetNames)
      if (snippetNames.includes(`${snippetName}.${language}`) || !snippetNames || snippetName === "") {
        toast.error("Snippet can't be empty or have same name as another file", {duration: 4000, position: "bottom-right",style: {background: "#181818", color: "#fff"},});
        return;
      }

      const filepath = await join(directory, `${snippetName}.${language}`)
      await writeTextFile(filepath, ``)  
      addSnippetName(`${snippetName}.${language}`)
      setSnippetName("")

      toast.success("Snippet saved", { duration: 2000, position:"bottom-right", style: {background: "#181818", color: "#fff"} })
    }}
    >
      <div className='bg-[#16071b] flex justify-center items-center mb-[1px] rounded-sm'>
        <input type="text" placeholder='Add snippet' 
          className='bg-[#2a0d33] p-4 w-full border-none focus:outline-none' 
          onChange={(e)=> setSnippetName(e.target.value) }
          value={snippetName}
        />
        <select name="language" className=' bg-[#BE3144] p-4 rounded-sm hover:bg-[#F05941]' onChange={(e)=> setLanguage(e.target.value)}>
            <option value="js">javascript</option>
            <option value="ty">typescipt</option>
            <option value="c">c</option>
            <option value="cpp">c++</option>
            <option value="cs">c#</option>
            <option value="css">css</option>
            <option value="html">html</option>
            <option value="json">json</option>
            <option value="go">go</option>
            <option value="java">java</option>
            <option value="kt">kotlin</option>
            <option value="php">php</option>
            <option value="py">python</option>
            <option value="rs">rust</option>
            <option value="r">r</option>
            <option value="sql">sql</option>
            <option value="ps1">powershell</option>
            <option value="sh">shell</option>
            <option value="yml">yaml</option>
            <option value="md">markdown</option>
            <option value="txt">plaintext</option>
        </select>

      </div>
  
    </form>
    </>
  )
}

export default Form