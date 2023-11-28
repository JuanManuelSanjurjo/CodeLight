import SnippetList from './components/SnippetList'
import Form from './components/Form'
import Editor from './components/Editor'
import { Toaster } from 'react-hot-toast'
import { useState } from 'react'
import TaskBar from "./components/TaskBar";

const App = () => {
  const [language, setLanguage] = useState("js")

  return (
    <div className='bg-[#16071b] h-screen w-screen fixed top-7  text-orange-50  grid grid-cols-12 overflow-auto'>
      <TaskBar />
      <div className="col-span-3 border-r-2 h-full border-slate-900 overflow-auto overflow-x-hidden">
        <Form language={language} setLanguage={setLanguage}/>
        <SnippetList />
      </div>
      <div className="col-span-9 bg-[#16071b] flex justify-center items-center">
        <Editor/>
      </div>
        <Toaster />
    </div>
  )
}

export default App