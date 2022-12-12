/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { usePlayer } from '../../contexts/PlayerContext'
import useKeyPress from './usePress'

export default function usePlayerKeyPressed() {
  const { playerState, setPlayerState, currentPlaying, handleNext } =
    usePlayer()
  const nextKey = useKeyPress('n')

  useEffect(() => {
    if (nextKey) {
        handleNext();
    }
  }, [nextKey])
}
