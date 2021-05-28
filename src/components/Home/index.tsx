import React from 'react'
import Head from 'next/head'
import { Navbar, ModalFrame, ModalContact } from '@components'
import Footer from '../Footer'
import styles from './styles.module.scss'

import Button from '../Button'
import { FirstBanner, SecondBanner, SocialSwipe, ThirdBanner } from './elements'

const Home = ({ content, data}) => {

  return (
    <div>
      <Head>
        <title>Holy Chiken</title>
      </Head>
      <ModalContact />
      <Navbar data={data?.header}/>
      {content ? (<>
      <FirstBanner data={content?.firstBanner} content={content?.outstanding} publicity={content?.secondBanner}/>
      <SocialSwipe />
      <SecondBanner data={content?.thirdBanner} />
      <ThirdBanner data={content?.fourthBanner} />

      </>
    ) : null}
     <Footer data={data?.footer} content={data?.socialNetworks}  />
    </div>
  )
}
export default Home

