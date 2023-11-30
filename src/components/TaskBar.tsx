import { appWindow } from '@tauri-apps/api/window'
import { useConfigStore } from '../store/configStore'

function TaskBar() {
const directory = useConfigStore(state => state.dir)

  return (
    <div data-tauri-drag-region className="titlebar bg-[#0f0513] flex justify-between h-[30px] " > 
        <h1 className='pl-2 font-semibold leading-[30px] text-slate-200 flex gap-2 h-[30px]'>
            <img src="/icon.ico" className='flex justify-center self-center h-6' />
            Playcode  <span className='text-[#F05941]'>&#10100; &#10101;</span> 
            {/* &#60;  &#8725; &#62; */}
            </h1>
        <h3 className="text-sm flex items-center text-slate-400">{directory}</h3>

        <div className='flex '>
            <div className="group font-bold text-[12px] inline-flex   justify-center items-center w-[30px] h-[30px] hover:bg-rose-900 transition-colors" id="titlebar-minimize" >
                <div className='absolute hidden z-10  font-normal text-[12px]  top-10 py-5 px-4 w-1/6  bg-[#2a0d33] 
                rounded-lg border-2 border-[#1d0d25] text-slate-500 transition-all leading-6
                group-hover:block' >
                    {/* //TODO QUE EL DIV SE VEA POR ENCIMA DEL EDITOR */}
                    <h1><b>Tips</b></h1>
                    <ul className='px-4'>
                    <li>Ctrl + Q to select folder</li>
                    <li>Ctrl + S to toggle sidebar</li>
                    <li>Ctrl + W to close current editor</li>
                    </ul>
                </div>
               &#8910;
            </div>
            <div className="font-bold inline-flex justify-center items-center w-[50px] h-[30px] hover:bg-rose-900 transition-colors" id="titlebar-minimize" 
                onClick={() => appWindow.minimize()}>
                &#8722;
            </div>
            <div className="font-bold inline-flex justify-center items-center w-[50px] h-[30px] hover:bg-rose-900 transition-colors"  id="titlebar-maximize" 
                onClick={() => appWindow.toggleMaximize()}>
                &#10066;
            </div>
            <div className="font-bold inline-flex justify-center items-center w-[50px] h-[30px] hover:bg-rose-900 transition-colors"  id="titlebar-close" 
                onClick={() => appWindow.close()}>
                &#10005;
            </div>
        </div>
  </div>
  )
}

export default TaskBar