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
      <div style={{width: '13.5rem'}}>
        <GeneralCard />
      </div>
    </div>
  )
}

export default Home
