import { useState, useEffect } from 'react'
import styles from './styles.module.scss'
import { ModalFrame, Button, Tooltip} from '@components'
import { Phone, Mail, Insta, Twitter, WhatsApp, Location, PaperClip } from '@images/icons'
import { useDispatch } from 'react-redux'
import { setShowModal, setToast } from '@store/actions'
import { useSelector } from 'react-redux'
import FormikConfig from './formik'

const ModalContact = () => {

  const dispatch = useDispatch()
  const [type, setType] = useState('cliente')
  const formik = FormikConfig(dispatch, type)
  const [isActive, setActive] = useState(1)

  const { errors, touched } = formik

  const { resource: { general: { general } }, contact } = useSelector((state: any) => state)
  const [showTooltip, setShowTooltip] = useState(false)
  const locations = general?.addresses

  const email = general?.email

  const activeLink = (props) => {
    setActive(props)
    if(props == 1) setType('cliente')
    if(props == 2) setType('proveedor')
    if(props == 3) setType('personal')
  }

  const tooltipTimer = () => {
    setShowTooltip(true)
  }

  useEffect(() => {
    if(contact?.contact) {
      formik.resetForm()
      dispatch(setShowModal({ contactModal: false }))
    }
  }, [contact])

  return (
    <ModalFrame >
      <div className={styles._main}>
        <div className={styles._leftSection}>
          <div className={styles._closeParent}>
            <p className={styles._title}>Contáctanos</p>
          </div>

          <div className={`${styles._itemParent} ${styles._marginBottom}`}>
            <div className={styles._iconParent}>
              <Mail color='#000' />
            </div>
            <div>
              <p>Email</p>
              <a className={styles._link} href={`mailto:${email}`}>
                {email}
              </a>
            </div>
          </div>

          <div className={styles._itemParent}>
            <div className={styles._iconParent}>
              <Location color='#000' />
            </div>
            <div className={styles._textColumn}>
            {
            locations.map((item, index) => {
              return (

              <div className={styles._textParent} key={index}>
               <p className={styles._textBold}>{item?.local}</p>
               <a className={styles._link} href={`tel:${item.phone}`}>
               <span>{item?.phone}</span>
               </a>
               <p>{item?.address}</p>

              </div>

              )
            }
            )}
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
          </div>

          <form onSubmit={formik.handleSubmit}>
            <div className={styles._rightMain}>
              <div className={styles._leftSide}>
                <div className={styles._buttonsParent}>
                  <div className={styles._btnParent}   >
                    <Button color={isActive === 1 ? '#000' : '#F4F3EE'} method={() => activeLink(1)} text='Cliente' textColor={isActive === 1 ? '#FFF' : '#000'} />
                  </div>

                  <div className={styles._btnParent}  >
                    <Button color={isActive === 2 ? '#000' : '#F4F3EE'} method={() => activeLink(2)} text='Proveedor' textColor={isActive === 2 ? '#FFF' : '#000'} />
                  </div>

                  <div className={styles._btnParent}  >
                    <Button color={isActive === 3 ? '#000' : '#F4F3EE'} method={() => activeLink(3)} text='Personal' textColor={isActive === 3 ? '#FFF' : '#000'} />
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
                    className={styles._textArea}
                    placeholder='Escriba su mensaje aqui...'
                  >
                  </textarea>

                  <div className={styles._paperClipParent} onClick={tooltipTimer}>

                    <label className={styles._filePointer}>
                    <Tooltip paddinHorizontal={5.5} top='-75px' left={'-140px'}  advice={true} show={showTooltip} />
                      <PaperClip color='#000' />
                    </label>
                  </div>
                </div>

                <div className={styles._termsParent}>
                  <p className={styles._termsText}>Al enviar, acepta nuestros <strong>términos y condiciones</strong> y <strong>nuestra política de privacidad</strong>, que explica cómo podemos recopilar y usar su información personal.</p>
                </div>

                <div className={styles._sendBtn}>
                  <Button color='#000' text='Enviar' textColor='#FFF' type='submit' flag />
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
