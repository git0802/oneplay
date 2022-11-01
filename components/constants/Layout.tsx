import Head from 'next/head'
import React from 'react'
import Navbar from './NavBar'
import Navigator from './Navigator'

type LayoutProps = {
  children: React.ReactNode
  title?: string
}

const Layout = ({ children, title }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title??'Oneplay'}</title>
        <link rel="shortcut icon" href="favicon.svg" type="image/x-icon" />
      </Head>
      <div className="bg flex h-screen flex-col bg-[#030305] text-white">
        <Navbar />
        <div className="flex w-full">
          <Navigator />
          {children}
        </div>
      </div>
    </>
  )
}

export default Layout
