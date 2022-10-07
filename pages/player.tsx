import React, { useEffect, useState } from 'react'
import Player from '../components/Player'

const PlayerPage = () => {
  const [file, setFile] = useState<any>('')
  useEffect(() => {
    const file = new File([], 'Therefore I am', {
      type: 'video/mp4',
      lastModified: 1629200000000,
    })
    setFile(file)
  }, [])
  return (
    <div>
      <Player source="/sample.mp4" isVideo file={file} />
    </div>
  )
}

export default PlayerPage
