import { FC, useEffect } from 'react'
import { AppProps } from 'next/app'
import { useStore } from 'react-redux'
import { wrapper } from '@store'
import '@styles/globals.scss'
import Head from 'next/head'
import { Loader } from '@components'
import { useSelector } from 'react-redux'
import { ModalContact, LoginModal, RegisterModal, ForgotPasswordModal, ChangePasswordModal, LocationModal, Toast} from '@components'

const WrappedApp: FC<AppProps> = ({ Component, pageProps }) => {

  const { show } = useSelector((state: any) => state.loader)
  const { toast } = useSelector((state: any) => state)

  const store: any = useStore()

  useEffect(() => {
    store.__persistor.persist()
  }, [])

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <>
      <Toast icon={toast?.type} text={toast?.text} status={toast?.status}></Toast>
      <ModalContact />
      <LoginModal />
      <RegisterModal />
      <ForgotPasswordModal />
      <ChangePasswordModal />
      <LocationModal />
      </>

      { show && <Loader />}

      <Component {...pageProps} />
    </>
  )
}

export default wrapper.withRedux(WrappedApp)
