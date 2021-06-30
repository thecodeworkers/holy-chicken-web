import React from 'react'
import Head from 'next/head'
import { Navbar, ModalFrame, ModalContact, LoginModal, RegisterModal, ChangePasswordModal, CartModal, PaymentModal } from '@components'
import Footer from '../Footer'
import { FirstBanner } from './elements'
import ForgotPasswordModal from '../ForgotPasswordModal'

const Shop = ({ content, data, filters, backup }) => {

  return (
    <div>
      <Head>
        <title>Holy Chicken</title>
      </Head>
      <ModalContact />
      <LoginModal />
      <RegisterModal />
      <ForgotPasswordModal />
      <CartModal />
      <PaymentModal />
      <Navbar data={data?.header} />
      <ChangePasswordModal />
      {content ? (<>
        <FirstBanner content={content} filters={filters} backup={backup} />
      </>
      ) : null}
      <Footer data={data?.footer} content={data?.socialNetworks}  />
    </div>
  )
}
export default Shop

