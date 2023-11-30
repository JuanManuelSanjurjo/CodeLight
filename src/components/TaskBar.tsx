import { appWindow } from '@tauri-apps/api/window'
import { useConfigStore } from '../store/configStore'

function TaskBar() {
const directory = useConfigStore(state => state.dir)

// TODO QUICK tips dropdown in taskbar, shortcuts like F1 Ctrl+Q Ctrl+W

  return (
    <div data-tauri-drag-region className="titlebar bg-[#0f0513] flex justify-between h-[30px] " > 
        
        <h1 className='pl-2 leading-[30px] text-slate-200 flex gap-2 h-[30px]'>
            <img src="/icon.ico" className='flex justify-center self-center h-6' />
            Playcode  <span className='text-[#F05941]'>&#10100; &#10101;</span> 
            {/* &#60;  &#8725; &#62; */}
            </h1>
        <h3 className="text-sm flex items-center text-slate-400">{directory}</h3>
        <div>
            <div className="font-bold inline-flex justify-center items-center w-[30px] h-[30px] hover:bg-rose-900 transition-colors" id="titlebar-minimize" 
                onClick={() => appWindow.minimize()}>
                &#8722;
            </div>
            <div className="font-bold inline-flex justify-center items-center w-[30px] h-[30px] hover:bg-rose-900 transition-colors"  id="titlebar-maximize" 
                onClick={() => appWindow.toggleMaximize()}>
                &#10066;
            </div>
            <div className="font-bold inline-flex justify-center items-center w-[30px] h-[30px] hover:bg-rose-900 transition-colors"  id="titlebar-close" 
                onClick={() => appWindow.close()}>
                &#10005;
            </div>
        </div>
  </div>
  )
}

export default TaskBar