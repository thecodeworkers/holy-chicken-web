import { useState, useEffect } from 'react'
import styles from './styles.module.scss'
import { Button, Tooltip } from '@components'
import { useDispatch, useSelector } from 'react-redux'
import { resetModals, setShowModal, setToast } from '@store/actions'
import FormikConfig from './formik'

const RegisterModal = () => {
  const dispatch = useDispatch()
  const formik = FormikConfig(dispatch)
  const { errors, touched } = formik
  const [showTooltip, setShowTooltip] = useState(false)
  const [show, setShow] = useState(false)
  const [showTwo, setShowTwo] = useState(false)

  let timeout

  const { intermitence: { registerModal }, auth } = useSelector((state: any) => state)

  const showPassword = () => setShow(show => !show)
  const showPasswordTwo = () => setShowTwo(showTwo => !showTwo)

  const closeModal = (event, flag = false) => {
    const { target } = event
    if (target.id == 'close-register') {
      dispatch(setShowModal({ registerModal: false }))
      formik.resetForm()
      dispatch(setToast('', '', 0))
    }
  }

  useEffect(() => {
    if (auth?.register?.registerCustomer) {
      dispatch(setShowModal({ registerModal: false }))
      formik.resetForm()
    }

    return () => clearTimeout(timeout)

  }, [auth?.register])

  const openLocations = () => {
    formik.resetForm()
    dispatch(resetModals())
  }

  const tooltipTimer = () => {
    setShowTooltip(true)

    timeout = setTimeout(() => {
      setShowTooltip(false)
    }, 8000);
  }

  return (
    <div className={registerModal ? styles._background : styles._hidden} onClick={closeModal} id='close-register'>
      <div className={`${styles._modal} _generalCard`}>
        <p className={styles._title}> Regístrate</p>

        <form onSubmit={formik.handleSubmit}>
          <div className={styles._row}>
            <div className={styles._halfWidth}>
              <div className={styles._inputParent}>
                <label>Nombre</label>
                <input
                  placeholder='Nombre'
                  type='text'
                  name='firstName'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName}
                  className={errors.firstName && touched.firstName ? styles._inputError : styles._input} />
              </div>
            </div>

            <div className={styles._halfWidth}>
              <div className={`${styles._inputParent} ${styles._responsiveMarginTop}`}>
                <label>Apellido</label>
                <input
                  type="text"
                  placeholder='Apellido'
                  name='lastName'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastName}
                  className={errors.lastName && touched.lastName ? styles._inputError : styles._input}
                />
              </div>
            </div>
          </div>

          <div className={styles._inputParent}>
            <label>Teléfono</label>
            <input
              type="text"
              placeholder='+58 (000) 000 00 00'
              name='phone'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              className={errors.phone && touched.phone ? styles._inputError : styles._input}
            />
          </div>

          <div className={styles._inputParent}>
            <label>Correo</label>
            <input
              type="mail"
              placeholder='Correo'
              name='email'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className={errors.email && touched.email ? styles._inputError : styles._input}
            />
          </div>

          <div className={`${styles._row} ${styles._marginTop}`}>
            <div className={styles._halfWidth}>
              <div className={styles._inputParent} onFocus={tooltipTimer} onBlur={() => setShowTooltip(false)}>
                <Tooltip paddinHorizontal={1} top='-75%' show={showTooltip} />
                <label>Contraseña</label>
                <input
                  type={!show ? 'password' : 'text'}
                  placeholder='Contraseña'
                  name='password'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className={errors.password && touched.password ? styles._inputError : styles._input}
                />
                <div className={styles._imageParent} onClick={showPassword}>
                  <img src={!show ? 'images/icons/show-password.svg' : 'images/icons/hide-password.svg'} width='18px' height='18px' />
                </div>
              </div>
            </div>

            <div className={styles._halfWidth}>
              <div className={`${styles._inputParent} ${styles._responsiveMarginTop}`} >

                <label>Confirmar Contraseña</label>
                <input
                  type={!showTwo ? 'password' : 'text'}
                  placeholder='Contraseña'
                  name='confirmPassword'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                  className={errors.confirmPassword && touched.confirmPassword ? styles._inputError : styles._input}
                />
                <div className={styles._imageParent} onClick={showPasswordTwo}>
                  <img src={!showTwo ? 'images/icons/show-password.svg' : 'images/icons/hide-password.svg'} width='18px' height='18px' />
                </div>
              </div>
            </div>
          </div>

          <div className={`${styles._buttonsRow} ${styles._buttonsMarginTop}`}>
            <div className={styles._halfWidth}>
              <Button color='#F4F3EE' textColor='#000' text='Hacerlo luego' method={openLocations} />
            </div>

            <div className={styles._halfWidth}>
              <Button color='#000' textColor='#FFF' text='Confirmar' type='submit' flag />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterModal
