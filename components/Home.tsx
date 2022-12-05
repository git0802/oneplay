import React, { ChangeEventHandler, useEffect, useState } from 'react'
import { BiFile } from 'react-icons/bi'
import FileRow from './FileRow'
import Player from './Player'
import Dropzone from 'react-dropzone'
import { usePlayer } from '../contexts/PlayerContext'
import Multimedia from './constants/Multimedia'

const HomeComp = () => {
  const { files, setFiles, showPlayer, setShowPlayer } = usePlayer()

  const onFileInputChange: ChangeEventHandler<HTMLInputElement> = (e: any) => {
    const selected: File[] = Array.from(e.target.files)
    const newFiles: File[] = files.concat(selected)
    setFiles(newFiles)
  }

  const onDrop = (acceptedFiles: File[]) => {
    const newFiles: File[] = files.concat(acceptedFiles)
    setFiles(newFiles)
  }

  return (
    <div className="flex h-[90vh] w-full flex-col overflow-auto pt-11 xtab:flex-row">
      <div className="flex h-full flex-col items-center justify-center xtab:w-1/2">
        {showPlayer ? (
          <div className="flex w-full items-center justify-center">
            <Player />
          </div>
        ) : (
          <Dropzone
            accept={{ 'audio/*': [], 'video/*': [] }}
            onDrop={onDrop}
            multiple
          >
            {({ getRootProps, getInputProps }) => (
              <div
                {...getRootProps({ className: 'dropzone' })}
                className="flex h-full w-full items-center justify-center"
              >
                <label
                  // htmlFor="files"
                  className="flex flex-col items-center justify-center"
                >
                 <div className='max-w-[200px] flex'>
										<Multimedia />
									</div>
                  <p className="text-center">
                    Select a file or drag and drop multiple files here
                  </p>
                </label>
                <input
                  {...getInputProps()}
                  multiple
                  accept="video/* , audio/*"
                  type="file"
                  name=""
                  id="files"
                  hidden
                  onChange={onFileInputChange}
                />
              </div>
            )}
          </Dropzone>
        )}
      </div>
      <span className="h-full w-[1px] bg-blue-400/10"></span>
      <div className="flex h-full flex-col items-center p-4 xtab:w-1/2">
        {files.length === 0 ? (
          <p className="flex h-full w-full items-center justify-center text-2xl">
            No Selected files
          </p>
        ) : (
          <Dropzone
            accept={{ 'audio/*': [], 'video/*': [] }}
            onDrop={onDrop}
            multiple
          >
            {({ getRootProps, getInputProps }) => (
              <div
                {...getRootProps()}
                onClick={() => {}}
                className="flex h-full w-full flex-col"
              >
                <div className="flex w-full items-center justify-between px-4 py-2">
                  <p className="text-xl font-semibold text-main">
                    Selected files
                  </p>
                  <label
                    htmlFor="files"
                    className="flex cursor-pointer items-center rounded-md bg-main px-2"
                  >
                    <span className="-translate-y-[1px] text-2xl">+</span>
                    <span className="ml-2">ADD</span>
                  </label>
                  <input
                    {...getInputProps()}
                    multiple
                    accept="video/* , audio/*"
                    type="file"
                    name=""
                    id="files"
                    hidden
                    onChange={onFileInputChange}
                  />
                </div>
                <div className="flex h-[80vh] w-full flex-col overflow-auto">
                  {files?.map((file: File, index) => (
                    <FileRow
                      key={index}
                      i={index}
                      file={file}
                      setShowPlayer={setShowPlayer}
                    />
                  ))}
                </div>
              </div>
            )}
          </Dropzone>
        )}
      </div>
    </div>
  )
}

export default HomeComp
