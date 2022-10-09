/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import { MdAudiotrack } from 'react-icons/md'
import { usePlayer } from '../../contexts/PlayerContext'
import Controls from './Controls'

const Player = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [curRef, setCurRef] = React.useState<any>(videoRef?.current)
  const [hide, setHide] = useState(false)
  const [timer, setTimer] = useState<number | NodeJS.Timeout>(0)
  const playerRef = useRef<HTMLDivElement>(null)
  const {
    playerState,
    setPlayerState,
    currentPlaying,
    setCurrentPlaying,
    handleNext,
  } = usePlayer()

  const isVideo = currentPlaying.file.type.includes('video')

  const videoElement = videoRef?.current

  const togglePlay = () => {
    setPlayerState({
      ...playerState,
      isPlaying: !playerState.isPlaying,
    })
  }

  const handleOnTimeUpdate = () => {
    const progress = curRef.currentTime
    setPlayerState({
      ...playerState,
      progress,
    })
    if (curRef.currentTime === curRef.duration) handleNext()
  }

  useEffect(() => {
    console.log(videoRef?.current)
    setCurRef(videoRef?.current)
  }, [videoRef])

  useEffect(() => {
    playerState.isPlaying ? videoElement?.play() : videoElement?.pause()
  }, [playerState.isPlaying, videoElement])

  useEffect(() => {
    if (!curRef) return
    curRef?.play()
    setPlayerState({ ...playerState, isPlaying: true })
    return () => {
      curRef?.pause()
    }
  }, [curRef])

  useEffect(() => {
    if (isVideo) {
      setCurRef(videoRef?.current)
    } else {
      setCurRef(audioRef?.current)
    }
  }, [currentPlaying])

  return (
    <div
      onMouseMove={() => {
        setHide(false)
        clearTimeout(timer as number)
        const timeout = setTimeout(() => {
          setHide(true)
        }, 2000)
        setTimer(timeout)
      }}
      // onMouseLeave={() => clearTimeout(timer as number)}
      ref={playerRef}
      className={`${hide && 'cursor-none'}
      player relative flex aspect-video h-full w-full flex-col text-white`}
    >
      {isVideo ? (
        <video
          poster=""
          id="video"
          ref={videoRef}
          autoPlay
          className=" my-auto max-h-full"
          src={currentPlaying.url}
          onTimeUpdate={handleOnTimeUpdate}
        />
      ) : (
        <>
          <div className="flex h-[50vh] w-full items-center justify-center bg-stone-800">
            <MdAudiotrack className="text-[5em]" />
          </div>
          <audio
            className="my-auto"
            ref={audioRef}
            onTimeUpdate={handleOnTimeUpdate}
            src={currentPlaying.url}
            autoPlay
          />
        </>
      )}
      <Controls
        element={curRef}
        player={playerRef?.current}
        file={currentPlaying.file}
        togglePlay={togglePlay}
        hide={hide}
      />
      <p> {currentPlaying.file.name} </p>
    </div>
  )
}

export default Player
