import Link from 'next/link'
import React, { useState } from 'react'
import Layout from '../../components/constants/Layout'

const IndexPage = () => {
const [linear, setLinear] = useState(false)
  return (
    <Layout linear={linear} title="Oneplay - Online">
        <div className="flex flex-col h-[92vh] items-center justify-center w-full">
            <h1 className="text-4xl font-bold introh">This feature comming soon</h1>
            <Link href={`/local`}>
                <button 
                onClick={() => setLinear(true)}
                className="btnstarted hover:bg-main duration-300 relative overflow-hidden rounded-lg bg-main/70 px-4 py-2 text-lg font-semibold text-white mt-5">
                    <span className='z-[2]'>Use Local Files</span>
                </button>
            </Link>
        </div>
    </Layout>
  )
}

export default IndexPage