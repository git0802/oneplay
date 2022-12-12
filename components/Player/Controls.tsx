import { Slider, useMediaQuery } from '@mui/material'
import { useEffect, useState } from 'react'
import {
  FaCompressArrowsAlt,
  FaFastBackward,
  FaFastForward,
  FaPause,
  FaPlay,
} from 'react-icons/fa'
import {
  BiExpand,
  BiShuffle,
  BiVolumeFull,
  BiVolumeMute,
} from 'react-icons/bi'
import { MdRepeat, MdRepeatOne } from 'react-icons/md'
import { formatTime } from '../../utils'
import { usePlayer } from '../../contexts/PlayerContext'
import useKeyPress from '../../utils/hooks/usePress'

type Props = {
  element: HTMLMediaElement
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
    handleShuffle,
    handleLoop,
  } = usePlayer()
  const [isFront, setFront] = useState(false)
  const [hovered, setHovered] = useState(false)
  const fullKey = useKeyPress('f')
  const muteKey = useKeyPress('m')
  const phone = useMediaQuery('(max-width: 500px)')


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

  useEffect(() => {
    const textSpan: Element | null = document.querySelector(
      '.MuiSlider-valueLabelLabel'
    )
    if (textSpan) {
      textSpan.textContent = formatTime(element?.currentTime)
    }
  }, [element?.currentTime])

  useEffect(()=> {
    if(fullKey) toggleFullScreen();
    if(muteKey) handleMute();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[fullKey, muteKey])

  useEffect(() => {
    if (file.type.includes('audio')) setFront(false)
  }, [file.type])
  return (
    <div
      className={` bottom-0 flex w-full flex-col items-center justify-between bg-gradient-to-t
     from-orange-400/30 to-orange-400/10 py-2 px-5 ${
       isFront ? 'absolute duration-500' : ''
     } ${hide && isFront ? 'opacity-0' : 'opcity-100'}`}
    >
      <div className="flex w-full items-center justify-between ">
        <div className="flex w-1/3 items-center justify-start overflow-hidden">
          <div onClick={handleMute} className="cursor-pointer">
            {playerState.isMuted ? (
              <BiVolumeMute title="muted" className="five:text-2xl" />
            ) : (
              <BiVolumeFull title="volume" className="five:text-2xl" />
            )}
          </div>
          <Slider
            min={0}
            sx={{ width: 100, marginLeft: 2, color: '#ff3f00' }}
            max={100}
            size="small"
            value={playerState.volume}
            onChange={(e: Event) => handleVolume(e)}
            aria-label="Small"
            valueLabelDisplay="auto"
          />
        </div>
        <div className="flex w-1/3 items-center justify-center">
          <FaFastBackward
            title="previous"
            onClick={handlePrev}
            className="cursor-pointer text-sm five:text-xl"
          />
          <button
            onClick={togglePlay}
            className=" mx-3 cursor-pointer rounded-full border-2 p-1 five:p-2"
          >
            {playerState.isPlaying && !element.paused ? (
              <FaPause title="pause" className="text-sm five:text-lg" />
            ) : (
              <FaPlay title="play" className="translate-x-[2px] five:text-lg" />
            )}
          </button>
          <FaFastForward
            title="Next"
            onClick={handleNext}
            className="cursor-pointer text-sm five:text-xl"
          />
        </div>
        <div className="flex w-1/3 items-center justify-end">
          <button
          onClick={handleShuffle}
          className={`cursor-pointer text-xl ${playerState.shuffle? 'text-main' : 'text-gray-100'}`}
          >
            <BiShuffle />
          </button>
          <div
            onClick={() => handleLoop(element)}
            className="flex cursor-pointer text-lg five:text-2xl ml-2"
          >
            {playerState.loop === 'none' ? (
              <MdRepeat title="no repeat" />
            ) : playerState.loop === 'all' ? (
              <MdRepeat title="repeat playlist" className="text-main" />
            ) : (
              <MdRepeatOne title="repeat this" className="text-main" />
            )}
          </div>

          {file.type.includes('video') && (
            <div onClick={toggleFullScreen} className="ml-4 cursor-pointer">
              {isFront && document.fullscreenElement ? (
                <FaCompressArrowsAlt
                  title="exit fullscreen"
                  className="cursor-pointer five:text-xl"
                />
              ) : (
                <BiExpand title="fullscreen" className="five:text-2xl" />
              )}
            </div>
          )}
        </div>
      </div>
      <div
        onMouseOver={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="flex w-full items-center"
      >
        <p className="text-xs five:text-base">
          {formatTime(element?.currentTime)}
        </p>
        <Slider
          sx={{
            marginX: '2%',
            color: '#ff3f00',
            '& .MuiSlider-thumb': {
              display: hovered ? 'flex' : 'none',
              width: 10,
              height: 10,
            },
          }}
          size={phone ? 'small' : 'medium'}
          onChange={(e: any) => {
            element.currentTime = Number(e.target.value)
          }}
          // defaultValue={70} .MuiSlider-valueLabelLabel
          min={0}
          max={Number.isNaN(element?.duration) ? 0 : element?.duration}
          value={Number.isNaN(playerState.progress) ? 0 : playerState.progress}
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
