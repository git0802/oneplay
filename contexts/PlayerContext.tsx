import React, { createContext, useContext, useState } from 'react'
import { Curr, PlayerContextData } from '../utils/types'

const PlayerContext = createContext({} as PlayerContextData)

export const usePlayer = () => useContext(PlayerContext)

interface ChildrenProps{
  
  children:React.ReactNode;
  
}

export const PlayerProvider = ({ children }: ChildrenProps) => {
  const [files, setFiles] = useState<File[]>([])
  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    progress: 0,
    speed: 1,
    isMuted: false,
    isFullScreen: false,
    isPicInPic: false,
    volume: 50,
  })
  const [currentPlaying, setCurrentPlaying] = useState<Curr>({
    file: files[0],
    url: '',
  })

  const handleNext = () => {
    const index = files.findIndex(
      (file) => file.name === currentPlaying.file.name
    )
    if (index < files.length - 1) {
      const file = files[index + 1]
      const url = URL.createObjectURL(file)
      setCurrentPlaying({ file, url })
    }
  }

  const handlePrev = () => {
    const index = files.findIndex(
      (file) => file.name === currentPlaying.file.name
    )
    if (index > 0) {
      const file = files[index - 1]
      const url = URL.createObjectURL(file)
      setCurrentPlaying({ file, url })
    }
  }

  return (
    <PlayerContext.Provider
      value={{
        playerState,
        setPlayerState,
        currentPlaying,
        setCurrentPlaying,
        files,
        setFiles,
        handleNext,
        handlePrev,
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}
