import { useState, useCallback, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { FirstBanner, SecondBanner, SocialSwipe, ThirdBanner, Catering } from './elements'
import { Navbar, IndividualProductModal, CartModal } from '@components'
import { setStringKey, setShowModal, getTmpSession } from '@store/actions'
import { scrollTo } from '@utils/common'
import Footer from '../Footer'
import Head from 'next/head'

const Home = ({ content, data, resource }) => {

  const { scrollReference: { homeReference }, guest: { tmpSessionToken } } = useSelector((state: any) => state)

  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    const passwordKey = router?.query?.key
    if (passwordKey) {
      dispatch(setShowModal({ changePasswordModal: true }))
      dispatch(setStringKey(passwordKey))
    }

    if (!tmpSessionToken) dispatch(getTmpSession())
  }, [])

  const outstandingRef = useCallback((node) => {
    scrollingReference(node, 'outstanding')
  }, [homeReference?.outstanding])

  const cateringRef = useCallback((node) => {
    scrollingReference(node, 'catering')
  }, [homeReference?.catering])

  const locationRef = useCallback((node) => {
    scrollingReference(node, 'location', 120)
  }, [homeReference?.location])

  const scrollingReference = (node, state, offset = 0) => {
    if (homeReference?.current == state) {
      if (node) scrollTo(node, offset)
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
        <FirstBanner data={content?.firstBanner}
          content={content?.outstanding}
          resource={resource}
          reference={outstandingRef} />
        {/* <SocialSwipe /> */}
        <Catering publicity={content?.secondBanner} reference={cateringRef} />
        <SecondBanner data={content?.thirdBanner} reference={locationRef} contact={data} />
        <ThirdBanner data={content?.fourthBanner} />
      </>
      ) : null}
      <Footer data={data?.footer} content={data?.socialNetworks} />
    </div>
  )
}
export default Home
