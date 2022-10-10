import { createContext, useContext, useState } from 'react'
import { Curr, PlayerContextData } from '../utils/types'

const PlayerContext = createContext({} as PlayerContextData)

export const usePlayer = () => useContext(PlayerContext)

export const PlayerProvider = ({ children }: any) => {
  const [files, setFiles] = useState<File[]>([])
  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    progress: 0,
    speed: 1,
    isMuted: false,
    isFullScreen: false,
    isPicInPic: false,
    volume: 50,
    loop: 'none',
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
    } else if (index === files.length -1 && playerState.loop === 'all') {
      const file = files[0]
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

  const handleLoop = (el: HTMLMediaElement) => {
    if (playerState.loop === 'none') {
      el.loop = false
      setPlayerState({ ...playerState, loop: 'all' })
    } else if (playerState.loop === 'all') {
      el.loop = true
      setPlayerState({ ...playerState, loop: 'one' })
    } else {
      el.loop = false
      setPlayerState({ ...playerState, loop: 'none' })
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
        handleLoop,
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}
