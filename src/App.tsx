import SnippetList from './components/SnippetList'
import Form from './components/Form'
import Editor from './components/Editor'
import { Toaster } from 'react-hot-toast'
import { useState, useEffect } from 'react'
import TaskBar from "./components/TaskBar";
import { useSnippetStore } from './store/snippetStore'


const App = () => {
  const [language, setLanguage] = useState("js")
  const [sidebar, setSidebar] = useState(true)
  const setSelectedSnippet = useSnippetStore( state => state.setSelectedSnippet)

  useEffect(() => {
    const handleSidebar = (event: KeyboardEvent) => {
      if (event.code === 'KeyS' && event.ctrlKey) {
        setSidebar(!sidebar);
      }
    };
    const handleEditor = (event: KeyboardEvent) => {
      if (event.code === 'KeyW' && event.ctrlKey) {
        setSelectedSnippet(null);
      }
    };
    window.addEventListener('keydown', handleSidebar);
    window.addEventListener('keydown', handleEditor);
    return () => {
      window.removeEventListener('keydown', handleSidebar);
      window.removeEventListener('keydown', handleEditor);
    };
  }, [sidebar]);

  

  return (
    <div className='bg-[#16071b] font-sans tracking-wider h-screen w-screen fixed top-7  text-orange-50  grid grid-cols-12 overflow-hidden'>
      <button className={'absolute top-[2px] z-10 h-full w-4 bg-[#4c0519]  hover:bg-[#F05941] transition-colors' 
        + (sidebar ? " hidden": " block")}
        onClick={()=> setSidebar(!sidebar)}
        >&#8644;
      </button>
      <TaskBar />
      <div className={" h-full border-r-2 border-[#2a0d33] overflow-auto overflow-x-hidden " + (sidebar ? "col-span-3" : "hidden")}>
        <Form language={language} setLanguage={setLanguage} sideBar={sidebar} setSidebar={setSidebar}/>
        <SnippetList />
    </div>
      <div className={`bg-[#16071b] flex justify-center items-center ` + (sidebar ? "col-span-9" : "col-span-12")} >
        <Editor />
      </div>

      <Toaster />
      <div className={'flex text-sm items-center justify-center absolute bottom-7 right-0  z-20 h-5 w-5 bg-[#4c0519] rounded-tl-md ' }
        >&#8644;
      </div>
    </div>
  )
}




export default App