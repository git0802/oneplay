/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import { BiPause, BiPlay } from 'react-icons/bi'
import { MdAudiotrack } from 'react-icons/md'
import { usePlayer } from '../../contexts/PlayerContext'
import Controls from './Controls'

const Player = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [curRef, setCurRef] = React.useState<HTMLMediaElement>(
    videoRef?.current as HTMLMediaElement
  )
  const [hide, setHide] = useState(false)
  const [timer, setTimer] = useState<number | NodeJS.Timeout>(0)
  const playerRef = useRef<HTMLDivElement>(null)
  const [showPausePlay, setShowPausePlay] = useState({ state: false, timer: 0 })
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
    clearTimeout(showPausePlay.timer)
    setShowPausePlay({ ...showPausePlay, state: true })
    setPlayerState({
      ...playerState,
      isPlaying: !playerState.isPlaying,
    })
    setTimeout(() => {
      setShowPausePlay({ ...showPausePlay, state: false })
    }, 1000)
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
    console.log(videoRef?.current as HTMLVideoElement)
    setCurRef(videoRef?.current as HTMLVideoElement)
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
      setCurRef(videoRef?.current as HTMLVideoElement)
    } else {
      setCurRef(audioRef?.current as HTMLAudioElement)
    }
  }, [currentPlaying])

  useEffect(() => {
    if (typeof window !== undefined) {
      window.addEventListener('keydown', (e: KeyboardEvent) => {
        console.log(e.code)
        if (e.code === 'KeyD') {
          e.preventDefault()
          togglePlay()
        }
      })
    }
  }, [])

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
      <div
        onClick={togglePlay}
        className="relative flex h-full w-full items-center justify-center"
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
              onClick={togglePlay}
              className="my-auto"
              ref={audioRef}
              onTimeUpdate={handleOnTimeUpdate}
              src={currentPlaying.url}
              autoPlay
            />
          </>
        )}
        {showPausePlay.state && (
          <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center bg-black/10">
            <div
              onClick={togglePlay}
              className="flex items-center justify-center rounded-full bg-stone-800/50 p-2"
            >
              {playerState.isPlaying ? (
                <BiPause className="text-[3em]" />
              ) : (
                <BiPlay className="ml-1 text-[3em]" />
              )}
            </div>
          </div>
        )}
      </div>
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
