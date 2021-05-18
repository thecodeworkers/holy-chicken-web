import React from 'react'
import Head from 'next/head'
import { Navbar, GeneralCard } from '@components'
import { FirstBanner } from './elements'

const Home = ({ content }) => {
  return (
    <div>
      <Head>
        <title>Holy Chiken</title>
      </Head>
      <Navbar />
      {content ? (<>
      <FirstBanner data={content?.firstBanner} />
       <div style={{width: '13.5rem'}}>
        <GeneralCard />
      </div>
      </>
    ) : null}
    </div>
  )
}
export default Home

