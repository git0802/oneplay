import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../../components/constants/Layout'
import HomeComp from '../../components/Home'

const Home: NextPage = () => {


  return (
    <Layout>
      <HomeComp />
    </Layout>
  )
}

export default Home
