import React, {useState, useCallback} from 'react'
import Head from 'next/head'
import { Navbar, IndividualProductModal, CartModal } from '@components'
import Footer from '../Footer'
import { FirstBanner, SecondBanner, SocialSwipe, ThirdBanner, Catering } from './elements'
import { scrollTo } from '@utils/common'
import { useSelector } from 'react-redux'

const Home = ({ content, data, resource }) => {


  const { scrollReference: { homeReference } } = useSelector((state: any) => state)

  const cateringRef = useCallback((node) => {
    scrollingReference(node, 'catering')
  }, [homeReference?.visa])

  const locationRef = useCallback((node) => {
    scrollingReference(node, 'location')
  }, [homeReference?.atm])

  const scrollingReference = (node, state) => {
    if(homeReference?.current == state) {
      if(node) scrollTo(node)
    }
  }


  return (
    <div>
      <Head>
        <title>Holy Chicken</title>
      </Head>

      <Navbar data={data?.header} />
      <IndividualProductModal />
      <CartModal />
      {content ? (<>
        <FirstBanner data={content?.firstBanner} content={content?.outstanding} publicity={content?.secondBanner} resource={resource} />
        <SocialSwipe />
        <Catering publicity={content?.secondBanner} reference={cateringRef} />
       <SecondBanner data={content?.thirdBanner} reference ={locationRef}/>
        <ThirdBanner data={content?.fourthBanner} />
      </>
      ) : null}
      <Footer data={data?.footer} content={data?.socialNetworks} />
    </div>
  )
}
export default Home

