import type { NextPage } from 'next'
import Head from 'next/head'
import HomeComp from '../components/Home'

const Home: NextPage = () => {


  return (
    <>
      <Head>
        <title>Some Content</title>
        <link rel="icon" href="/logo2.png" />
      </Head>
      <HomeComp />
    </>
  )
}

export default Home
