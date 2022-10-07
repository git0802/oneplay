import React, { ChangeEventHandler, useState } from 'react'
import { BiFile } from 'react-icons/bi'
import FileRow from './FileRow'
import Navbar from './NavBar'
import Player from './Player'

const HomeComp = () => {
  const [files, setFiles] = useState<File[]>([])
  const [current, setCurrent] = useState<any>(null)
  const [isVideo, setIsVideo] = useState(false)
  const [showPlayer, setShowPlayer] = useState(false)

  const onFileInputChange: ChangeEventHandler<HTMLInputElement> = (e: any) => {
    const selected: File[] = Array.from(e.target.files)
    console.log(selected)
    setFiles(selected)
  }

  return (
    <div className="flex min-h-screen w-full flex-col text-white">
      <Navbar />
      <div className="flex h-[90vh] w-full pt-11">
        <div className="flex h-full w-1/2 flex-col items-center justify-center">
          {showPlayer ? (
            <Player source={current ?? ''} isVideo={isVideo} file={files[0]} files={files}  />
          ) : (
            <>
              <label htmlFor="files">
                <BiFile className="text-[10em]" />
              </label>
              <input
                multiple
                accept="video/* , audio/*"
                type="file"
                name=""
                id="files"
                hidden
                onChange={onFileInputChange}
              />
            </>
          )}
        </div>
        <span className="h-full w-[1px] bg-white"></span>
        <div className="flex h-full w-1/2 flex-col items-center p-4">
          {files.length === 0 ? (
            <p className="h-full w-full">No Selected files</p>
          ) : (
            <>
              <p className="">Selected files</p>
              <div className="flex flex-col h-[80vh] overflow-auto">
                {files?.map((file: File, index) => (
                  <FileRow
                    key={index}
                    i={index}
                    isVideo={isVideo}
                    setIsVideo={setIsVideo}
                    file={file}
                    setCurrent={setCurrent}
                    setShowPlayer={setShowPlayer}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default HomeComp
