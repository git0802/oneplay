'use-client'

import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import Layout from '../components/constants/Layout'

const IndexPage = () => {
  const router = useRouter()
  const [position, setPosition] = React.useState({ x: 0, y: 0 })
  const { x, y } = position
  const [deferredPrompt, setDeferredPrompt] = React.useState<any>(null)
  const [linear, setLinear] = React.useState(false)

  const handleNavigation = (path: string) => {
    setLinear(true)
    router.push(`/${path}`)
  }

  const installApp = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt')
        } else {
          console.log('User dismissed the A2HS prompt')
        }
        setDeferredPrompt(null)
      })
    }
  }

  useEffect(() => {
    window.addEventListener('mousemove', (e: any) => {
      const xPos = e.clientX - 90
      const yPos = e.clientY - 90
      // get width of the target element
      const width = e.target?.offsetWidth
      // get the percentage of the mouse position
      const xPercent = xPos / width

      // console.log(e.target?.offsetWidth, e.target?.offsetHeight)
      setPosition({ x: xPos, y: yPos })
    })

    window.addEventListener('beforeinstallprompt', (e: any) => {
      console.log('beforeinstallprompt fired', e)

      // Stash the event so it can be triggered later.
      // @ts-ignore
      window.deferredPrompt = e
      setDeferredPrompt(e)
    })
  }, [])

  return (
    <Layout linear={linear}>
      <div className="flex w-full flex-col py-6">
        <div className="my-auto flex min-h-[82vh] w-full flex-col items-center justify-center overflow-x-hidden five:min-h-[72vh]">
          {/* <h2 className='text-4xl text font-bold text-white bg-blue-400/0 z-10'>Reveal This word </h2> */}
          <h2 className="introh text-center text-2xl font-bold five:text-4xl">
            Listen and watch to your favorite music and videos with your a cool
            media player
          </h2>
          {/* <div
            style={{ left: x, top: y }}
            className={`torch absolute  aspect-square h-1/4 rounded-full`}
          ></div> */}
          <h2 className="introh mt-6 text-xl font-semibold five:text-2xl">
            How to get started?
          </h2>
          <p className="mt-3 text-center text-lg five:text-xl">
            You can play online music or upload files from your computer.
            Currently only musics are available for online
          </p>
          <div className="mt-8 flex w-full flex-col items-center justify-center five:flex-row">
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
        <div className="flex flex-col items-center">
          <h2 className="introh mt-6 text-center text-xl font-semibold five:text-2xl">
            Download and listen on PC
          </h2>
          <p className="mt-5 max-w-[900px] text-center text-lg five:text-xl">
            You can download the app for windows and listen to your favorite.
            Oneplay provides two ways to download the app. You can download a
            progressive web app or a desktop app
          </p>
          <div className="mt-8 flex w-full flex-col items-center justify-center five:flex-row ">
            <button
              onClick={installApp}
              className="btnstarted relative overflow-hidden rounded-lg bg-main/90 px-4 py-2 text-lg font-semibold text-white duration-300 hover:bg-main"
            >
              <span className="z-[2]">Install PWA</span>
            </button>
            <span className="mx-5">Or</span>
            <a
              href="https://github.com/NdungutseCharles103/oneplay_desktop_app/releases"
              target="_blank"
              rel="noreferrer"
              className="btnstarted relative overflow-hidden rounded-lg bg-main/90 px-4 py-2 text-lg font-semibold text-white duration-300 hover:bg-main"
            >
              <span className="z-[2]">Download Desktop App</span>
            </a>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
