import React from 'react'
import Head from 'next/head'
import { Navbar, ModalFrame, ModalContact, LoginModal, RegisterModal, ChangePasswordModal } from '@components'
import Footer from '../Footer'
import { FirstBanner } from './elements'
import ForgotPasswordModal from '../ForgotPasswordModal'

const Shop = ({ content, data}) => {
  console.log(content);

  return (
    <div>
      <Head>
        <title>Holy Chicken</title>
      </Head>
      {/* <ModalContact />
      <LoginModal />
      <RegisterModal />
      <ForgotPasswordModal />
      <Navbar data={data?.header}/> */}
      <ChangePasswordModal />
      {content ? (<>
       <FirstBanner />
      {/* <SecondBanner data={content?.thirdBanner} />
      <ThirdBanner data={content?.fourthBanner} /> */}
      </>
    ) : null}
     {/* <Footer data={data?.footer} content={data?.socialNetworks}  /> */}
    </div>
  )
}
export default Shop

