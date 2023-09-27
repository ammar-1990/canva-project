import React from 'react'
import { IconType } from 'react-icons'

type Props = {
    name:string,
    Icon:IconType,
    onClick:()=>void,
    type:string
}

const Button = ({name,Icon,onClick,type}: Props) => {
  return (
    <button
    onClick={onClick}
    type="button"
    className={`p-2 flex flex-col items-center w-full rounded-md  text-zinc-400 cursor-pointer ${
      type !== name &&
      "hover:bg-zinc-300 hover:text-zinc-700 transition"
    }  ${type === name && "bg-zinc-700"} `}
  >
    <Icon />
    <p className="cursor-pointer capitalize">{name}</p>
  </button>
  )
}

export default Button