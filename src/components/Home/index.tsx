import React from 'react'
import Head from 'next/head'
import { Navbar, ModalFrame, ModalContact } from '@components'
import Footer from '../Footer'
import styles from './styles.module.scss'

import Button from '../Button'
import { FirstBanner, SecondBanner, SocialSwipe, ThirdBanner } from './elements'

const Home = ({ content, data}) => {
  return (
    <div>
      <Head>
        <title>Holy Chiken</title>
      </Head>
      {/* <ModalFrame>
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
            <h1>Tipo de contacto</h1>

            <div className={styles._rightMain}>
              <div  className={styles._leftSide}>
                <div className={styles._buttonsParent}>
                  <div className={styles._btnParent}>
                   <Button color='#000' text='Cliente' textColor='#FFF'/>
                  </div>

                  <div className={styles._btnParent}>
                    <Button color='#F4F3EE' text='Proveedor' textColor='#000'/>
                  </div>

                 <div className={styles._btnParent}>
                   <Button color='#F4F3EE' text='Personal' textColor='#000'/>
                 </div>
                </div>

                <form>
                  <div className={styles._inputRow}>
                    <div style={{width: '48%'}}>
                      <div className={styles._inputParent}>
                        <label>Nombre</label>
                        <input placeholder='Nombre' type='text' className={styles._input} />
                      </div>
                    </div>


                    <div style={{width: '48%'}}>
                    <div className={styles._inputParent}>
                      <label>Apellido</label>
                      <input placeholder='Apellido' type='text' className={styles._input} />
                    </div>
                  </div>
                  </div>

                  <div className={styles._inputRow}>
                    <div style={{width: '100%'}}>
                      <div className={styles._inputParent}>
                        <label>Teléfono</label>
                        <input placeholder='+58 (000) 000 00 00' type='text' className={styles._input} />
                      </div>
                    </div>
                  </div>

                  <div className={styles._inputRow}>
                    <div style={{width: '100%'}}>
                      <div className={styles._inputParent}>
                        <label>Email</label>
                        <input placeholder='correo@dominio.com' type='text' className={styles._input} />
                      </div>
                    </div>
                  </div>

                </form>
              </div>

              <div className={styles._rightSide}>
                <div className={styles._textAreaParent}>
                  <textarea className={styles._textArea} placeholder='Escriba su mensaje aqui...'></textarea>
                  <div className={styles._paperClipParent}>
                    <PaperClip color='#000'/>
                  </div>
                </div>

                <div className={styles._termsParent}>
                  <p className={styles._termsText}>Al enviar, acepta nuestros <strong>términos y condiciones</strong> y <strong>nuestra política de privacidad</strong>, que explica cómo podemos recopilar y usar su información personal.</p>
                </div>

                <div className={styles._sendBtn}>
                   <Button color='#000' text='Enviar' textColor='#FFF'/>
                </div>

              </div>
            </div>
          </div>
        </div>

      </ModalFrame> */}
      <ModalContact />
      <Navbar data={data?.header}/>
      {content ? (<>
      <FirstBanner data={content?.firstBanner} content={content?.outstanding} publicity={content?.secondBanner}/>
      <SocialSwipe />
      <SecondBanner data={content?.thirdBanner} />
      <ThirdBanner data={content?.fourthBanner} />

      </>
    ) : null}
     <Footer data={data?.footer} />
    </div>
  )
}
export default Home

