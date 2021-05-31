import React from 'react'
import Head from 'next/head'
import { Navbar } from '@components'
import Footer from '../Footer'


const AboutUs = ({ content, data }) => {

  console.log(content, data);

  return (
    <div>
      <Head>
        <title>Holy Chiken</title>
      </Head>
      <Navbar data={data?.header} />
      {content ? (<>

      </>
      ) : null}
      <Footer data={data?.footer} content={data?.socialNetworks} />
    </div>
  )
}
export default AboutUs

