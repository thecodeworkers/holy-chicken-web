import React from 'react'
import Head from 'next/head'
import { Navbar } from '@components'
import { FirstBanner } from './elements'

const Home = ({ content }) => {
  return (
    <div>
      <Head>
        <title>Holy Chiken</title>
      </Head>
      <Navbar />
      {content ? (<>
      <FirstBanner data={content?.firstBanner} content={content?.outstanding}/>

      </>
    ) : null}
    </div>
  )
}
export default Home

