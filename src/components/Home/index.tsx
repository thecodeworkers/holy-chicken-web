import React from 'react'
import Head from 'next/head'
import { Navbar, GeneralCard } from '@components'

const Home = () => {
  return (
    <div>
      <Head>
        <title>Holy Chiken</title>
      </Head>
      {/* <Navbar /> */}
      <GeneralCard />
    </div>
  )
}

export default Home
