import React from 'react'
import Head from 'next/head'
import { Navbar, ModalFrame, ModalContact, LoginModal, RegisterModal, ChangePasswordModal, LocationModal} from '@components'
import Footer from '../Footer'
import { FirstBanner, SecondBanner, SocialSwipe, ThirdBanner } from './elements'
import ForgotPasswordModal from '../ForgotPasswordModal'

const Home = ({ content, data, resource }) => {

  return (
    <div>
      <Head>
        <title>Holy Chicken</title>
      </Head>

      <Navbar data={data?.header}/>
      {content ? (<>
      <FirstBanner data={content?.firstBanner} content={content?.outstanding} publicity={content?.secondBanner} resource={resource}/>
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

