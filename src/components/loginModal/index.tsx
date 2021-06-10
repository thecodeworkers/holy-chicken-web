import { useState, useEffect } from 'react'
import styles from './styles.module.scss'
import { Button, Toast } from '@components'
import { useDispatch, useSelector } from 'react-redux'
import { setShowModal } from '@store/actions'
import FormikConfig from './formik'

const LoginModal = () => {

  const dispatch = useDispatch()

  const changeStatus = () => setStatus(true)

  const formik = FormikConfig(dispatch, changeStatus)
  const [showToast, setShowToast ] = useState(0)
  const [toastText, setToastText] = useState('')
  const [toastIcon, setToastIcon ] = useState('check')
  const [status, setStatus] = useState(false)

  const { intermitence: { loginModal }, auth } = useSelector((state: any) => state)

  const [show, setShow] = useState(false)
  const { errors, touched } = formik

  let interval

  const showPassword = () => setShow(show => !show)

  const closeModal = (event) => {
    const { target } = event
    if(target.id == 'background') {
      dispatch(setShowModal({ loginModal: false }))
      formik.resetForm()
      setShowToast(0)
      setStatus(false)
    }
  }

  useEffect(() => {
    if(auth?.login?.login && status) {
      toastHandler('Usuario autenticado exitosamente', 'check')
      formik.resetForm()
    }

    if(!auth?.login?.login && status) toastHandler('Error al autenticar usuario', 'error')

    return () => { clearTimeout(interval) }
  }, [auth])

  const toastHandler = (message, type) => {
    setToastText(message)
      setShowToast(1)
      setToastIcon(type)

      interval = setTimeout(() => {
        setShowToast(2)
        setStatus(false)
      }, 2000);
  }

  const openModal = (name) => {
    dispatch(resetModals())
    dispatch(setShowModal({ [name]: true }))
  }

  return (
    <div className={`${loginModal ? styles._background : styles._hidden} ${styles._flex}`} onClick={closeModal} id='background'>
      <div className={`${styles._modal} _generalCard`}>
        <p className={styles._title}> Ingresar</p>
        <form onSubmit={formik.handleSubmit}>
          <div className={styles._inputParent}>
            <label>Email</label>
            <input
              type='text'
              placeholder='Correo'
              name='email'
              id='email'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className={errors.email && touched.email ? styles._inputError : styles._input} />
          </div>

          <div className={styles._inputParent}>
            <label>Password</label>
            <input
              type={!show ? 'password' : 'text'}
              placeholder='Contraseña'
              name='password'
              id='password'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className={errors.password && touched.password ? styles._inputError : styles._input} />

            <div className={styles._imageParent} onClick={showPassword}>
            <img src={!show ? 'images/icons/show-password.svg' : 'images/icons/hide-password.svg'}  width='18px' height='18px' />
            </div>
          </div>

          <div className={styles._btnParent}>
            <Button color='#000' text='Ingresar' textColor='#FFF' type='submit'/>
          </div>
        </form>

        <p className={styles._blackLink}  onClick={() => openModal('locationModal')}>Comprar sin registrarse</p>
        <p className={styles._grayLink}>¿Nuevo cliente? <a onClick={() => openModal('registerModal')}>Crear Cuenta</a></p>
        <p className={styles._grayLink}>¿Olvidaste tu contraseña? <a onClick={() => openModal('forgotPasswordModal')}>Recuperar Contraseña</a></p>
      </div>

      <Toast status={showToast} text={toastText} icon={toastIcon}></Toast>
    </div>
  )
}

export default LoginModal;
