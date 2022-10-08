import { Slider, useMediaQuery } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {
  FaBackward,
  FaCompressArrowsAlt,
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
import { usePlayer } from '../../contexts/PlayerContext'
import { IPlayerState } from '../../utils/types'

type Props = {
  element: HTMLVideoElement | HTMLAudioElement | any
  player: HTMLDivElement | null
  file: File
  togglePlay?: any
  hide: boolean
}

const Controls = ({ element, file, togglePlay, player, hide }: Props) => {
  const {
    playerState,
    setPlayerState,
    handleNext,
    handlePrev,
    currentPlaying,
  } = usePlayer()
  const [isFront, setFront] = useState(false)
  const phone = useMediaQuery('(max-width: 500px)')

  const handleVideoSpeed = (event: any) => {
    const speed = Number(event.target.value)
    element.playbackRate = speed
    setPlayerState({ ...playerState, speed })
  }

  const toggleFullScreen = () => {
    if (playerState.isFullScreen && document.fullscreenElement) {
      document.exitFullscreen()
      setPlayerState({ ...playerState, isFullScreen: false })
      setFront(false)
    } else {
      player?.requestFullscreen()
      setFront(true)
      setPlayerState({ ...playerState, isFullScreen: true })
    }
  }

  const togglePictureInPicture = () => {
    if (!playerState.isPicInPic) {
      element.requestPictureInPicture()
      setPlayerState({ ...playerState, isPicInPic: true })
    } else {
      document.exitPictureInPicture()
      setPlayerState({ ...playerState, isPicInPic: false })
    }
  }

  const handleVolume = (event: any) => {
    const volume = Number(event.target.value)
    element.volume = volume / 100
    setPlayerState({ ...playerState, isMuted: false, volume })
  }

  const handleMute = () => {
    if (playerState.isMuted) {
      element.volume = playerState.volume / 100
      setPlayerState({ ...playerState, isMuted: false })
    } else {
      element.volume = 0
      setPlayerState({ ...playerState, isMuted: true })
    }
  }

  // useEffect(() => {
  //   const listener = (e: any) => {
  //     console.log(e.code)

  //     if (e.code === 'Space' || e.code === 'MediaPlayPause') {
  //       togglePlay()
  //       setPlayerState({ ...playerState, isPlaying: !playerState.isPlaying })
  //       console.log(playerState.isPlaying)
  //     }
  //   }
  //   document.addEventListener('keydown', listener)
  //   return () => {
  //     document.removeEventListener('keydown', listener)
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  // useEffect(() => {
  //   if (playerState.isFullScreen && document.fullscreenElement) {
  //     setFront(true)
  //   } else {
  //     setFront(false)
  //   }
  //   console.log('toogle', playerState.isFullScreen)

  // }, [playerState.isFullScreen])

  useEffect(() => {
    if (file.type.includes('audio')) setFront(false)
  }, [file.type])
  return (
    <div
      className={` bottom-0 flex w-full flex-col items-center justify-between bg-gradient-to-t
     from-pink-600/30 to-pink-600/10 py-2 px-5 ${
       isFront ? 'absolute duration-500' : ''
     } ${hide && isFront ? 'opacity-0' : 'opcity-100'}`}
    >
      <div className="flex w-full flex-col items-center justify-between five:flex-row">
        <div className="flex w-full items-start justify-start overflow-hidden five:w-1/3">
          <p
            title={file.name}
            className="w-full truncate text-clip text-left text-xs five:text-sm"
          >
            {file.name}
          </p>
        </div>
        <div className="mt-2 flex items-center justify-center five:mt-0 five:w-1/3">
          <FaFastBackward
            onClick={handlePrev}
            className="cursor-pointer text-sm five:text-xl"
          />
          <button
            onClick={togglePlay}
            className=" mx-3 cursor-pointer rounded-full border-2 p-1 five:p-2"
          >
            {playerState.isPlaying && !element.paused ? (
              <FaPause className="text-sm five:text-lg" />
            ) : (
              <FaPlay className="translate-x-[2px] five:text-lg" />
            )}
          </button>
          <FaFastForward
            onClick={handleNext}
            className="cursor-pointer text-sm five:text-xl"
          />
        </div>
        <div className="flex items-center justify-end five:w-1/3">
          <div onClick={handleMute} className="cursor-pointer">
            {playerState.isMuted ? (
              <BiVolumeMute className="five:text-2xl" />
            ) : (
              <BiVolumeFull className="five:text-2xl" />
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
          {file.type.includes('video') && (
            <div onClick={toggleFullScreen} className="ml-4 cursor-pointer">
              {isFront && document.fullscreenElement ? (
                <FaCompressArrowsAlt className="cursor-pointer five:text-xl" />
              ) : (
                <BiExpand className="five:text-2xl" />
              )}
            </div>
          )}
        </div>
      </div>
      <div className="flex w-full items-center">
        <p className="text-xs five:text-base">
          {formatTime(element?.currentTime)}
        </p>
        <Slider
          sx={{ marginX: '2%' }}
          size={phone ? 'small' : 'medium'}
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
        <p className="text-xs five:text-base">
          {formatTime(element?.duration)}
        </p>
      </div>
    </div>
  )
}

export default Controls
