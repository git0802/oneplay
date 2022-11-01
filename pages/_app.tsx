import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { PlayerProvider } from '../contexts/PlayerContext'
import AppProvider from '../contexts/AppContext'
import { Analytics } from '@vercel/analytics/react'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <PlayerProvider>
        <Component {...pageProps} />
        <Analytics />
      </PlayerProvider>
    </AppProvider>
  )
}

export default MyApp
