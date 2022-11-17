'use-client'

import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import Layout from '../components/constants/Layout'

const IndexPage = () => {
  const router = useRouter()
  const [position, setPosition] = React.useState({x: 0, y: 0});
  const {x, y} = position;

  const handleNavigation = (path: string) => {
    router.push(`/${path}`)
  }

  useEffect(()=> {
    window.addEventListener('mousemove', (e: any)=>{
      const xPos = e.clientX - 90; ;
      const yPos = e.clientY - 90;
      // get width of the target element
      const width = e.target?.offsetWidth;
      // get the percentage of the mouse position
      const xPercent = xPos / width;
      
      console.log(e.target?.offsetWidth, e.target?.offsetHeight)
      setPosition({x: xPos , y: yPos})
    })
  },[])

  return (
    <Layout>
      <div className="my-auto overflow-x-hidden flex min-h-[92vh] w-full flex-col items-center justify-center">
        {/* <h2 className='text-4xl text font-bold text-white bg-blue-400/0 z-10'>Reveal This word </h2> */}
        <h2 className="introh text-center text-4xl font-bold">
          Listen and watch to your favorite music and videos with your a cool
          media player
        </h2>
        <div
          style={{ left: x, top: y }}
          className={`absolute torch  h-1/4 aspect-square rounded-full`}
        ></div>
        <h2 className="introh mt-6 text-2xl font-semibold">
          How to get started?
        </h2>
        <p className="mt-3 text-center text-lg">
          You can play online music or upload files from your computer.
          Currently only musics are available for online
        </p>
        <div className="mt-8 flex w-full items-center justify-center">
          <button className="btnstarted relative overflow-hidden rounded-lg bg-main/90 px-4 py-2 text-lg font-semibold text-white duration-300 hover:bg-main">
            <span
              onClick={() => handleNavigation('local')}
              className="relative z-20"
            >
              Use Local Files
            </span>{' '}
          </button>
          <span className="mx-5">Or</span>
          <button
            onClick={() => handleNavigation('online')}
            className="btnstarted relative overflow-hidden rounded-lg bg-main/90 px-4 py-2 text-lg font-semibold text-white duration-300 hover:bg-main"
          >
            <span className="z-[2]">Listen online</span>
          </button>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
