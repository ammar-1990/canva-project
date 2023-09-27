import React, { ChangeEvent } from 'react'
import { ShapeComponent } from '../../types'

type Props = {
    selected:ShapeComponent,
    changeWidth:(id:number,e:ChangeEvent<HTMLInputElement>)=>void,
    changeHeight:(id:number,e:ChangeEvent<HTMLInputElement>)=>void,
    changeColor:(id:number,color:string)=>void
}

const ComponentOptions = ({selected,changeWidth,changeHeight,changeColor}: Props) => {
  return (
    <div className='fixed right-0 top-[100px] w-[150px] bg-zinc-600 rounded-l-md flex flex-col items-center p-3 gap-3'>
        <div className='w-full flex flex-col items-center gap-1'>
            <label className='text-zinc-100 text-xs capitalize' > Height</label>
            <input type='number' value={selected.height} className='p-1 outline-none  w-12 rounded-md border-none  ' onChange={(e)=>changeHeight(selected.id,e)} />
        </div>
        <div className='w-full flex flex-col items-center gap-1'>
            <label className='text-zinc-100 text-xs capitalize' > width</label>
            <input type='number' value={selected.width} className='p-1 outline-none  w-12 rounded-md border-none  ' onChange={(e)=>changeWidth(selected.id,e)} />
        </div>
        <div className='w-full grid grid-cols-3 items-center gap-2'>
<span onClick={()=>changeColor(selected.id,'black')} className={`w-8 h-8 rounded-full border-2  cursor-pointer bg-black ${selected.color==='black'? 'border-white':'border-transparent'}`}></span>
<span onClick={()=>changeColor(selected.id,'red')} className={`w-8 h-8 rounded-full border-2  cursor-pointer  bg-rose-500 ${selected.color==='red'? 'border-white':'border-transparent'}`}></span>
<span onClick={()=>changeColor(selected.id,'blue')} className={`w-8 h-8 rounded-full border-2  cursor-pointer bg-blue-500 ${selected.color==='blue'? 'border-white':'border-transparent'}`}></span>
<span onClick={()=>changeColor(selected.id,'yellow')} className={`w-8 h-8 rounded-full border-2  cursor-pointer bg-yellow-500  ${selected.color==='yellow'? 'border-white':'border-transparent'}`}></span>
<span onClick={()=>changeColor(selected.id,'purple')} className={`w-8 h-8 rounded-full border-2  cursor-pointer bg-violet-500 ${selected.color==='purple'? 'border-white':'border-transparent'}`}></span>
        </div>

    </div>
  )
}

export default ComponentOptions