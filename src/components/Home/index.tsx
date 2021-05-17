import React from 'react'
import Head from 'next/head'
import { Navbar } from '@components'

const Home = () => {
  return (
    <div>
      <Head>
        <title>Holy Chiken</title>
      </Head>
      <Navbar />
    </div>
  )
}

export default Home
