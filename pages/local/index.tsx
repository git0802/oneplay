import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import Layout from '../../components/constants/Layout'
import HomeComp from '../../components/Home'

const Home: NextPage = () => {
const [linear, setLinear] = useState(false)

  return (
    <Layout linear={linear} title="Oneplay - Local">
      <HomeComp />
    </Layout>
  )
}

export default Home
