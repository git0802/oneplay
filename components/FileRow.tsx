import React, { useEffect, useState } from 'react'
import { BiFile, BiPause, BiPlay } from 'react-icons/bi'
import { FaFileVideo } from 'react-icons/fa'
import { MdAudiotrack } from 'react-icons/md'
import { usePlayer } from '../contexts/PlayerContext'
import { formatBytes } from '../utils'

type Props = {
  file: File
  i: number
  setShowPlayer: React.Dispatch<boolean>
}

const FileRow: React.FC<Props> = ({ file, i, setShowPlayer }) => {
  const [isVideo, setIsVideo] = useState(file?.type.includes('video'))
  const { setCurrentPlaying, currentPlaying, playerState, setPlayerState } =
    usePlayer()

  const isTheFile = currentPlaying.file?.name === file.name

  const handleSelect = () => {
    if (isTheFile) {
      setPlayerState({ ...playerState, isPlaying: !playerState.isPlaying })
    } else {
      setShowPlayer(true)
      const url = URL.createObjectURL(file)
      setCurrentPlaying({ file: file, url: url })
    }
  }

  // const handleRowClick = () => {
  //   if(!)
  //     setShowPlayer(true)
  //     const url = URL.createObjectURL(file)
  //     setCurrentPlaying({ file: file, url: url })
  // }

  useEffect(() => {
    if (file.type.includes('video')) setIsVideo(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file])

  return (
    <div
      onDoubleClick={handleSelect}
      className={`cursor-pointer mt-4 flex items-center justify-between
     py-2 px-3 hover:bg-stone-800 ${isTheFile && 'bg-stone-800'}`}
    >
      <div className="flex items-center">
        {isVideo ? (
          <FaFileVideo className="text-2xl" />
        ) : (
          <MdAudiotrack className="text-2xl" />
        )}
        <div className="ml-2 flex flex-col">
          <p className="'text-xs font-semibold">{file.name}</p>
          <p className="text-xs font-semibold">
            size: {formatBytes(file.size)}
          </p>
        </div>
      </div>
      <button onClick={handleSelect} className="ml-3 rounded-full border-2 p-1">
        {currentPlaying.file?.name === file.name && playerState.isPlaying ? (
          <BiPause className="text-3xl" />
        ) : (
          <BiPlay className="text-3xl" />
        )}
      </button>
    </div>
  )
}

export default FileRow
