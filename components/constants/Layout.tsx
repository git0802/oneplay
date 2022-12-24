import Head from 'next/head'
import React from 'react'
import Footer from './Footer'
import LinearLoader from './LinearProgress'
import Navbar from './NavBar'
import Navigator from './Navigator'

type LayoutProps = {
  children: React.ReactNode
  title?: string
  linear?: boolean
}

const Layout = ({ children, title, linear }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title ?? 'Oneplay'}</title>
      </Head>
      <div className="bg relative flex h-screen flex-col overflow-x-hidden bg-[#030305] text-white">
        {linear && <LinearLoader />}
        <Navbar />
        <div className="flex w-full">
          <Navigator />
          {children}
        </div>
        {/* <Footer /> */}
      </div>
    </>
  )
}

export default Layout
