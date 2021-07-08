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

  let progress = new ProgressBar({
    size: 1,
    color: '#FFF',
    className: 'bar-of-progress',
    delay: 100,
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

      <style>{`
        .bar-of-progress {
          box-shadow: none !important;
          height: 3px !important;
          background-color: #FD8C2E !important;
        }
      `}
      </style>
    </>
  )
}

export default wrapper.withRedux(WrappedApp)
