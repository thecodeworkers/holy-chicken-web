import React, { useEffect } from 'react'
import Head from 'next/head'
import { Navbar, ModalContact, LoginModal, RegisterModal, ChangePasswordModal, CartModal } from '@components'
import Footer from '../Footer'
import { FirstBanner } from './elements'
import ForgotPasswordModal from '../ForgotPasswordModal'
import { useDispatch, useSelector } from 'react-redux'
import { setShowModal } from '@store/actions'

const Shop = ({ content, data, filters, backup }) => {

  const dispatch = useDispatch()

  const { intermitence } = useSelector((state: any) => state)

  useEffect(() => {
    if (intermitence?.showLocationModal) dispatch(setShowModal({ locationModal: true }))
  }, [])

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
      <Navbar data={data?.header} />
      <ChangePasswordModal />
      {content ? (<>
        <FirstBanner content={content} filters={filters} backup={backup} />
      </>
      ) : null}
      <Footer data={data?.footer} content={data?.socialNetworks} />
    </div>
  )
}
export default Shop

