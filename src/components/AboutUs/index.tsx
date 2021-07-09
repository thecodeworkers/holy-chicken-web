import React from 'react'
import Head from 'next/head'
import { Navbar } from '@components'
import Footer from '../Footer'
import { FirstBanner, SecondBanner } from './elements'

const AboutUs = ({ content, data }) => {

  return (
    <div>
      <Head>
        <title>Holy Chiken</title>
      </Head>
      <Navbar data={data?.header} />
      {content ? (<>
        <FirstBanner data={content?.roadmap} />
        <SecondBanner data={content?.downBanner} />
      </>
      ) : null}
      <Footer data={data?.footer} content={data?.socialNetworks} />
    </div>
  )
}
export default AboutUs

