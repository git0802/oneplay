import React, { useEffect, useState } from 'react'
import { BiFile, BiPlay } from 'react-icons/bi'

type Props = {
  file: File
  i: number
  setCurrent: React.Dispatch<any>
  isVideo: boolean
  setIsVideo: React.Dispatch<boolean>
  setShowPlayer: React.Dispatch<boolean>
}

const FileRow: React.FC<Props> = ({ file, i , setCurrent, isVideo, setIsVideo, setShowPlayer}) => {

    const handleSelect = () => {
        setShowPlayer(true)
        // const reader = new FileReader();
        const url = URL.createObjectURL(file)
        // reader.readAsDataURL(file)
        // reader.onload = () => {
        //     const url = reader.result
            setCurrent(url)
        // }
    }
    
    useEffect(() => {
        if(file.type.includes('video')) setIsVideo(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[file])

  return (
    <div
      className="cursor-pointr mt-4 flex items-center
     justify-between rounded-3xl border-2 border-purple-400/30 px-3 hover:bg-stone-900"
    >
      <div className="flex items-center">
        <BiFile className="text-2xl" />
        <div className="ml-2 flex flex-col">
          <p className="truncate">{file.name}</p>
          <p>{file.size}</p>
        </div>
      </div>
      <button onClick={handleSelect} className="ml-3 rounded-full border-2 p-1">
        <BiPlay className="text-3xl" />
      </button>
    </div>
  )
}

export default FileRow
