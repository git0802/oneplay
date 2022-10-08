import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { PlayerProvider } from '../contexts/PlayerContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Oneplay</title>
        <link rel="icon" href="/logo2.png" />
      </Head>
      <div className="bg-stone-900 text-white">
        <PlayerProvider>
          <Component {...pageProps} />
        </PlayerProvider>
      </div>
    </>
  )
}

export default MyApp
