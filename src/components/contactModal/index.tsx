import { useState } from 'react'
import styles from './styles.module.scss'
import { ModalFrame, Button } from '@components'
import { Phone, Mail, Insta, Twitter, WhatsApp, Location, PaperClip } from '@images/icons'
import { useDispatch } from 'react-redux'
import { setShowModal } from '@store/actions'
import { useSelector } from 'react-redux'
import FormikConfig from './formik'

const ModalContact = () => {

  const dispatch = useDispatch()
  const formik = FormikConfig()

  const { errors, touched } = formik

  const { resource: { general: { general } } } = useSelector((state: any) => state)


  return (
    <ModalFrame>
      <div className={styles._main}>
        <div className={styles._leftSection}>
          <div className={styles._closeParent}>
            <p className={styles._title}>Contáctanos</p>

            <div className={styles._responsiveIconParent} onClick={() => dispatch(setShowModal(false))}>
              <img src='images/icons/close.svg' width='16px'></img>
            </div>

          </div>

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
              <a href={general?.socialNetworks[0]?.link} target='_blank'>
                <Insta color='#000' />
              </a>
            </div>
            <div>
              <a href={general?.socialNetworks[1]?.link} target='_blank'>
                <Twitter color='#000' />
              </a>
            </div>
            <div>
              <a href={general?.socialNetworks[2]?.link} target='_blank'>
                <WhatsApp color='#000' />
              </a>
            </div>
          </div>

        </div>
        <div className={styles._rightSection}>
          <div className={styles._closeParent}>
            <p className={styles._title}>Tipo de contacto</p>

            <div className={styles._closeIconParent} onClick={() => dispatch(setShowModal(false))}>
              <img src='images/icons/close.svg' width='16px'></img>
            </div>
          </div>

          <form onSubmit={formik.handleSubmit}>
            <div className={styles._rightMain}>
              <div className={styles._leftSide}>
                <div className={styles._buttonsParent}>
                  <div className={styles._btnParent}>
                    <Button color='#000' text='Cliente' textColor='#FFF' />
                  </div>

                  <div className={styles._btnParent}>
                    <Button color='#F4F3EE' text='Proveedor' textColor='#000' />
                  </div>

                  <div className={styles._btnParent}>
                    <Button color='#F4F3EE' text='Personal' textColor='#000' />
                  </div>
                </div>

                <div className={styles._inputRow}>
                  <div className={styles._halfWidth} >
                    <div className={styles._inputParent}>
                      <label>Nombre</label>
                      <input
                        placeholder='Nombre'
                        type='text'
                        name='name'
                        id='name'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                        className={errors.name && touched.name ? styles._inputError : styles._input} />
                    </div>
                  </div>

                  <div className={styles._halfWidth}>
                    <div className={`${styles._inputParent} ${styles._separation}`}>
                      <label>Apellido</label>
                      <input
                        placeholder='Apellido'
                        type='text'
                        name='lastname'
                        id='lastname'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.lastname}
                        className={errors.lastname && touched.lastname ? styles._inputError : styles._input} />

                    </div>
                  </div>
                </div>

                <div className={styles._inputRow}>
                  <div style={{ width: '100%' }}>
                    <div className={styles._inputParent}>
                      <label>Teléfono</label>
                      <input
                        name='phone'
                        id='phone'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.phone}
                        placeholder='+58 (000) 000 00 00'
                        type='text'
                        className={errors.phone && touched.phone ? styles._inputError : styles._input} />
                    </div>
                  </div>
                </div>

                <div className={styles._inputRow}>
                  <div style={{ width: '100%' }}>
                    <div className={styles._inputParent}>
                      <label>Email</label>
                      <input
                        name='email'
                        id='email'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        placeholder='correo@dominio.com'
                        type='text'
                        className={errors.email && touched.email ? styles._inputError : styles._input} />
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles._rightSide}>
                <div className={styles._textAreaParent}>
                  <textarea
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                     value={formik.values.message}
                     name='message'
                     id='message'
                     className={styles._textArea}
                     placeholder='Escriba su mensaje aqui...'
                    >
                    </textarea>
                  <div className={styles._paperClipParent}>
                    <PaperClip color='#000' />
                  </div>
                </div>

                <div className={styles._termsParent}>
                  <p className={styles._termsText}>Al enviar, acepta nuestros <strong>términos y condiciones</strong> y <strong>nuestra política de privacidad</strong>, que explica cómo podemos recopilar y usar su información personal.</p>
                </div>

                <div className={styles._sendBtn}>
                  <Button color='#000' text='Enviar' textColor='#FFF'  type='submit'/>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </ModalFrame>
  )
}

export default ModalContact
