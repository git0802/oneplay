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
        <title>{title ?? 'Oneplay'}</title>
      </Head>
      <div className="bg relative flex h-screen flex-col overflow-x-hidden bg-[#030305] text-white">
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
