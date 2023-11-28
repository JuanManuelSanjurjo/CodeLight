import { appWindow } from '@tauri-apps/api/window'

function TaskBar() {
  return (
    <div data-tauri-drag-region className="titlebar bg-rose-950 flex justify-between  h-[30px]" > 
        <h1 className='pl-5 font-bold leading-[30px] '>Snippet Hoarder</h1>
        <div>
            <div className="font-bold inline-flex justify-center items-center w-[30px] h-[30px] hover:bg-rose-900 transition-colors" id="titlebar-minimize" onClick={() => appWindow.minimize()}>
                &#8722;
            </div>
            <div className="font-bold inline-flex justify-center items-center w-[30px] h-[30px] hover:bg-rose-900 transition-colors"  id="titlebar-maximize" onClick={() => appWindow.toggleMaximize()}>
                &#10066;
            </div>
            <div className="font-bold inline-flex justify-center items-center w-[30px] h-[30px] hover:bg-rose-900 transition-colors"  id="titlebar-close" onClick={() => appWindow.close()}>
                &#10005;
            </div>
        </div>
  </div>
  )
}

export default TaskBar