import { Slider } from '@mui/material'
import React, { useEffect } from 'react'
import {
  FaBackward,
  FaFastBackward,
  FaFastForward,
  FaForward,
  FaPause,
  FaPlay,
} from 'react-icons/fa'
import {
  BiExitFullscreen,
  BiExpand,
  BiFullscreen,
  BiVolume,
  BiVolumeFull,
  BiVolumeMute,
} from 'react-icons/bi'
import { formatTime } from '../../utils'

type Props = {
  element: HTMLVideoElement | HTMLAudioElement | any
  file: File
  playerState?: any
  setPlayerState?: any
  togglePlay?: any
}

const Controls = ({
  element,
  file,
  playerState,
  togglePlay,
  setPlayerState,
}: Props) => {
  const handleVideoSpeed = (event: any) => {
    const speed = Number(event.target.value)
    element.playbackRate = speed
    setPlayerState((prev: any) => ({ ...prev, speed }))
  }

  const toggleFullScreen = () => {
    if (playerState.isFullScreen && document.fullscreenElement) {
      document.exitFullscreen()
      setPlayerState((prev: any) => ({ ...prev, isFullScreen: false }))
    } else {
      element.requestFullscreen()
      setPlayerState((prev: any) => ({ ...prev, isFullScreen: true }))
    }
  }

  const togglePictureInPicture = () => {
    if (!playerState.isPicInPic) {
      element.requestPictureInPicture()
      setPlayerState((prev: any) => ({ ...prev, isPicInPic: true }))
    } else {
      document.exitPictureInPicture()
      setPlayerState((prev: any) => ({ ...prev, isPicInPic: false }))
    }
  }

  const handleVolume = (event: any) => {
    const volume = Number(event.target.value)
    element.volume = volume / 100
    setPlayerState((prev: any) => ({ ...prev, isMuted: false, volume }))
  }

  const handleMute = () => {
    if (playerState.isMuted) {
      element.volume = playerState.volume / 100
      setPlayerState((prev: any) => ({ ...prev, isMuted: false }))
    } else {
      element.volume = 0
      setPlayerState((prev: any) => ({ ...prev, isMuted: true }))
    }
  }

  useEffect(()=> {
    // const listener = (e: any)=> {
    //     if (e.keyCode === 32) {
    //     //   togglePlay()
    //     console.log('space pressed');
    //     setPlayerState({...playerState, isPlaying: !playerState.isPlaying })
    //     console.log(playerState.isPlaying);
        
    //     }
    // }
    // document.addEventListener('keydown', listener)
    // return () => {
    //   document.removeEventListener('keydown', listener)
    // }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div
      className=" bottom-0 flex w-full flex-col items-center justify-between bg-gradient-to-t
     from-black to-black/10 py-2 px-5"
    >
      <div className="flex w-full items-center justify-between">
        <div className="flex w-1/3">
          <p>{file.name}</p>
        </div>
        <div className="flex items-center justify-center w-1/3">
          <FaFastBackward className="cursor-pointer text-2xl" />
          <button className=" mx-3 cursor-pointer rounded-full border-2 p-2">
            {playerState.isPlaying ? (
              <FaPause onClick={togglePlay} className="text-xl" />
            ) : (
              <FaPlay
                onClick={togglePlay}
                className="translate-x-[2px] text-xl"
              />
            )}
          </button>
          <FaFastForward className="cursor-pointer text-2xl" />
        </div>
        <div className="flex items-center w-1/3">
          <div onClick={handleMute} className="">
            {playerState.isMute ? (
              <BiVolumeMute className="text-2xl" />
            ) : (
              <BiVolumeFull className="text-2xl" />
            )}
          </div>
          <Slider
            min={0}
            sx={{ width: 100, marginLeft: 2 }}
            max={100}
            size="small"
            value={playerState.volume}
            onChange={(e) => handleVolume(e)}
            aria-label="Small"
            valueLabelDisplay="auto"
          />
          <div onClick={toggleFullScreen} className="ml-4 cursor-pointer">
            {playerState.isFullScreen && document.fullscreenElement ? (
              <BiExitFullscreen className="text-2xl" />
            ) : (
              <BiExpand className="text-2xl" />
            )}
          </div>
        </div>
      </div>
      <div className="flex w-full items-center">
        <p>{formatTime(element?.currentTime)}</p>
        <Slider
          sx={{ marginX: '2%' }}
          size="medium"
          onChange={(e: any) => {
            element.currentTime = Number(e.target.value)
          }}
          // defaultValue={70}
          min={0}
          max={element?.duration}
          value={playerState.progress}
          aria-label="Small"
          valueLabelDisplay="auto"
        />
        <p>{formatTime(element?.duration)}</p>
      </div>
    </div>
  )
}

export default Controls
