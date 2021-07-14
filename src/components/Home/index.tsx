import {useState, useCallback, useRef, useEffect} from 'react'
import { Navbar, IndividualProductModal, CartModal } from '@components'
import { FirstBanner, SecondBanner, SocialSwipe, ThirdBanner, Catering } from './elements'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { scrollTo } from '@utils/common'
import Footer from '../Footer'
import Head from 'next/head'
import { setStringKey, setShowModal, getTmpSession } from '@store/actions'

const Home = ({ content, data, resource }) => {
  const { scrollReference: { homeReference } } = useSelector((state: any) => state)

  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    const passwordKey = router.query?.key
    if (passwordKey) {
      dispatch(setShowModal({ changePasswordModal: true }))
      dispatch(setStringKey(passwordKey))
    }

    dispatch(getTmpSession())
  }, [])

  const outstandingRef = useCallback((node) => {
    scrollingReference(node, 'outstanding')
  }, [homeReference?.catering])

  const cateringRef = useCallback((node) => {
    scrollingReference(node, 'catering')
  }, [homeReference?.catering])

  const locationRef = useCallback((node) => {
    scrollingReference(node, 'location')
  }, [homeReference?.location])

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
        <FirstBanner data={content?.firstBanner} content={content?.outstanding} resource={resource}  reference={outstandingRef}/>
        {/* <SocialSwipe /> */}
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
