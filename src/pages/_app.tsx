import { FC, useEffect } from 'react'
import { AppProps } from 'next/app'
import { useStore } from 'react-redux'
import { wrapper } from '@store'
import '@styles/globals.scss'
import Head from 'next/head'
import { Loader } from '@components'
import { useSelector } from 'react-redux'
import Router from 'next/router'
import ProgressBar from '@badrap/bar-of-progress'
import { ModalContact, LoginModal, RegisterModal, ForgotPasswordModal, ChangePasswordModal, LocationModal, Toast } from '@components'

const WrappedApp: FC<AppProps> = ({ Component, pageProps }) => {

  const { show } = useSelector((state: any) => state.loader)
  const { toast } = useSelector((state: any) => state)

  const store: any = useStore()

  useEffect(() => {
    store.__persistor.persist()
  }, [])

  const progress = new ProgressBar({
    size: 2,
    color: '#FD8C2E',
    delay: 100,
    className: '_progressBar'
  })

  Router.events.on('routeChangeStart', progress.start);
  Router.events.on('routeChangeComplete', progress.finish);
  Router.events.on('routeChangeError', progress.finish);

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

      {show && <Loader />}

      <Component {...pageProps} />
    </>
  )
}

export default wrapper.withRedux(WrappedApp)
