import React, { useEffect, useState } from 'react'
import { LinearProgress, Stack } from '@mui/material'

const LinearLoader = () => {
  const [progress, setProgress] = useState<number>(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 100
        }
        const diff = Math.random() * 10
        return Math.min(oldProgress + diff, 100)
      })
    }, 500)

    return () => {
      clearInterval(timer)
    }
  }, [])
  return (
    <Stack
      sx={{ width: '100%', color: '#f75802', position: 'absolute', top: 0, zIndex: 100 }}
    >
      {/* <LinearProgress color='inherit' variant='determinate'  value={progress}/> */}
      <LinearProgress color="inherit" variant="determinate" value={progress} />
    </Stack>
  )
}

export default LinearLoader
