import { useState, useEffect } from 'react'
import styles from './styles.module.scss'
import { Button, Toast } from '@components'
import { useDispatch, useSelector } from 'react-redux'
import { setShowModal } from '@store/actions'
import FormikConfig from './formik'


const RegisterModal = () => {

  const changeStatus = () => setStatus(true)

  const dispatch = useDispatch()
  const formik = FormikConfig(dispatch, changeStatus)
  const { errors, touched } = formik

  const [show, setShow] = useState(false)
  const [showTwo, setShowTwo] = useState(false)
  const [showToast, setShowToast ] = useState(0)
  const [toastText, setToastText] = useState('')
  const [toastIcon, setToastIcon ] = useState('check')
  const [status, setStatus] = useState(false)

  let interval

  const { intermitence: { registerModal }, auth } = useSelector((state: any) => state)

  const showPassword = () => setShow(show => !show)
  const showPasswordTwo = () => setShowTwo(showTwo => !showTwo)

  const closeModal = (event, flag = false) => {
    const { target } = event
    if (target.id == 'close-register' || flag) {
      dispatch(setShowModal({ registerModal: false }))
      formik.resetForm()
      setShowToast(0)
      setStatus(false)
    }
  }

  useEffect(() => {
    if(auth.register?.registerCustomer && status) {
      toastHandler('Usuario creado de exitosamente', 'check')
      formik.resetForm()
    }

    if(!auth.register?.registerCustomer && status) toastHandler('Error al registar usuario', 'error')

    return () => { clearTimeout(interval) }
  }, [auth])

  const toastHandler = (message, type) => {
    setToastText(message)
      setShowToast(1)
      setToastIcon(type)

      interval = setTimeout(() => {
        setShowToast(2)
      }, 2000);
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
                id='firstName'
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
                  id='lastName'
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
              id='phone'
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
              id='email'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className={errors.email && touched.email ? styles._inputError : styles._input}
               />
          </div>

          <div className={`${styles._row} ${styles._marginTop}`}>
            <div className={styles._halfWidth}>
              <div className={styles._inputParent}>
                <label>Contraseña</label>
                <input
                  type={!show ? 'password' : 'text'}
                  placeholder='Contraseña'
                  name='password'
                  id='password'
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
              <div className={`${styles._inputParent} ${styles._responsiveMarginTop}`}>
                <label>Confirmar Contraseña</label>
                <input
                  type={!showTwo ? 'password' : 'text'}
                  placeholder='Contraseña'
                  name='confirmPassword'
                  id='confirmPassword'
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
              <Button color='#F4F3EE' textColor='#000' text='Hacerlo luego' method={(event) => closeModal(event, true)} />
            </div>

            <div className={styles._halfWidth}>
              <Button color='#000' textColor='#FFF' text='Confirmar' type='submit'/>
            </div>
          </div>
        </form>
      </div>

      <Toast status={showToast} text={toastText} icon={toastIcon}></Toast>
    </div>
  )
}

export default RegisterModal
