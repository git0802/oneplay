import React, { useEffect, useRef, useState } from 'react'
import Controls from './Controls'

type Props = {
  source: string
  isVideo: boolean
  file: File
  files?: File[];
}

const Player = ({ source, isVideo , file}: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [curRef , setCurRef] = React.useState<any>(videoRef?.current)
  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    progress: 0,
    speed: 1,
    isMuted: false,
    isFullScreen: false,
    isPicInPic: false,
    volume: 50,
  })

  const videoElement = videoRef?.current

    const togglePlay = () => {
      setPlayerState({
        ...playerState,
        isPlaying: !playerState.isPlaying,
      })
    }

    const handleOnTimeUpdate = () => {
      const progress =
        curRef.currentTime
      setPlayerState({
        ...playerState,
        progress,
      })
    }

  useEffect(()=> {
    console.log(videoRef?.current)
    setCurRef(videoRef?.current)
  },[videoRef])

  useEffect(() => {
    playerState.isPlaying
      ? videoElement?.play()
      : videoElement?.pause()
  }, [playerState.isPlaying, videoElement])

  return (
    <div className="relative flex aspect-video h-full w-full flex-col text-white">
      {isVideo ? (
        <video id='video' ref={videoRef} className=" max-h-full" src={source} onTimeUpdate={handleOnTimeUpdate} />
      ) : (
        <audio src={source} />
      )}
      <Controls setPlayerState={setPlayerState}
      element={curRef} file={file} playerState={playerState} togglePlay={togglePlay} />
    </div>
  )
}

export default Player
