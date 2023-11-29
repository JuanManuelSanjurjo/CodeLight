import SnippetList from './components/SnippetList'
import Form from './components/Form'
import Editor from './components/Editor'
import { Toaster } from 'react-hot-toast'
import { useState } from 'react'
import TaskBar from "./components/TaskBar";

const App = () => {
  const [language, setLanguage] = useState("js")
  const [sidebar, setSidebar] = useState(true)



  return (
    <div className='bg-[#16071b] h-screen w-screen fixed top-7  text-orange-50  grid grid-cols-12 overflow-hidden'>
      <button className={'absolute z-10 h-screen w-4 bg-[#4c0519]  hover:bg-[#F05941] transition-colors' 
        + (sidebar ? " hidden": " block")}
        onClick={()=> setSidebar(!sidebar)}
        >&#8644;
      </button>
      <TaskBar />
      <div className={"h-full border-r-2 border-slate-900  overflow-auto overflow-x-hidden " + (sidebar ? "col-span-3" : "hidden")}>
        <Form language={language} setLanguage={setLanguage} sideBar={sidebar} setSidebar={setSidebar}/>
        <SnippetList />
      </div>
      <div className={`bg-[#16071b] flex justify-center items-center ` + (sidebar ? "col-span-9" : "col-span-12")} >
        <Editor />
      </div>
        <Toaster />
    </div>
  )
}

export default App