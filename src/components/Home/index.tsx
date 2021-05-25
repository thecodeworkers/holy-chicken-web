import React from 'react'
import Head from 'next/head'
import { Navbar, ModalFrame } from '@components'
import Footer from '../Footer'
import { FirstBanner } from './elements'
import styles from './styles.module.scss'
import { Phone, Mail, Insta, Twitter, WhatsApp, Location } from '@images/icons'

const Home = ({ content }) => {
  return (
    <div>
      <Head>
        <title>Holy Chiken</title>
      </Head>
      <Navbar />
      <ModalFrame>
        <div className={styles._main}>
          <div className={styles._leftSection}>
            <h1>Contáctanos</h1>
            <div className={`${styles._itemParent} ${styles._marginBottom}`}>
              <div className={styles._iconParent}>
                <Phone />
              </div>
              <div>
                <p>Teléfono</p>
                <p>+58 412-2485668</p>
              </div>
            </div>

            <div className={`${styles._itemParent} ${styles._marginBottom}`}>
              <div className={styles._iconParent}>
                <Mail color='#000' />
              </div>
              <div>
                <p>Email</p>
                <p>infoholychicken@gmail.com</p>
              </div>
            </div>

            <div className={styles._itemParent}>
              <div className={styles._iconParent}>
                <Location color='#000' />
              </div>

              <div className={styles._textColumn}>
                <div className={styles._textParent}>
                  <p>Las Mercedes</p>
                  <p>Calle París de Las Mercedes,
                entre Calle Nueva York y Calle Caron</p>
                </div>

                <div className={styles._textParent}>
                  <p>El hatillo</p>
                  <p>Calle Bolívar del pueblo de El Hatillo.
                  A una cuadra de la Plaza Bolívar.
                  Quinta Nuti.
                </p>
                </div>

                <div className={styles._textParent}>
                  <p>La Castellana</p>
                  <p>
                    Av. Principal de La Castellana,
                    Sector La Castellana.
                </p>
                </div>
              </div>
            </div>

            <div className={styles._socialMediaParent}>
              <div>
                <Insta color='#000'/>
              </div>
              <div>
                <Twitter color='#000'/>
              </div>
              <div>
                <WhatsApp color='#000'/>
              </div>
            </div>

          </div>
          <div className={styles._rightSection}>
            <h1>Right</h1>
          </div>
        </div>

      </ModalFrame>
      {content ? (<>
        <FirstBanner data={content?.firstBanner} content={content?.outstanding} />

      </>
      ) : null}
      {/* <Footer /> */}
    </div>
  )
}
export default Home

