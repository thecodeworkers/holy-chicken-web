import { useState, useEffect } from 'react'
import styles from './styles.module.scss'
import { Button, Tooltip } from '@components'
import { useDispatch, useSelector } from 'react-redux'
import { setShowModal, resetModals, setToast } from '@store/actions'
import FormikConfig from './formik'

const LoginModal = () => {

  const dispatch = useDispatch()
  const changeStatus = () => setStatus(true)
  const formik = FormikConfig(dispatch, changeStatus)
  const [status, setStatus] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const { intermitence: { loginModal }, auth } = useSelector((state: any) => state)
  const [show, setShow] = useState(false)
  const { errors, touched } = formik
  const showPassword = () => setShow(show => !show)

  let timeout

  const closeModal = (event) => {
    const { target } = event
    if(target.id == 'background') {
      dispatch(setShowModal({ loginModal: false }))
      formik.resetForm()
      dispatch(setToast('', '', 0))
      setStatus(false)
    }
  }

  useEffect(() => {
    if(auth?.login?.login && status) {
      dispatch(setToast('check', 'Usuario autenticado exitosamente', 1))
      dispatch(setShowModal({ loginModal: false }))
      setStatus(false)
      formik.resetForm()
    }

    if(!auth?.login?.login && status) dispatch(setToast('error', 'Error al autenticar usuario', 1))

    return () => clearTimeout(timeout)

  }, [auth?.login])

  const openModal = (name) => {
    dispatch(resetModals())
    dispatch(setShowModal({ [name]: true }))
  }

  const tooltipTimer = () => {
    setShowTooltip(true)

    timeout = setTimeout(() => {
      setShowTooltip(false)
    }, 8000);
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
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className={errors.email && touched.email ? styles._inputError : styles._input} />
          </div>

          <div className={styles._inputParent} onFocus={tooltipTimer} onBlur={() => setShowTooltip(false)}>
          <Tooltip paddinHorizontal={0} top='-75%'show={showTooltip}/>
            <label>Password</label>
            <input
              type={!show ? 'password' : 'text'}
              placeholder='Contraseña'
              name='password'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className={errors.password && touched.password ? styles._inputError : styles._input} />

            <div className={styles._imageParent} onClick={showPassword}>
            <img src={!show ? 'images/icons/show-password.svg' : 'images/icons/hide-password.svg'}  width='18px' height='18px' />
            </div>
          </div>

          <div className={styles._btnParent}>
            <Button
              color='#000'
              text='Ingresar'
              textColor='#FFF'
              type='submit' flag={true}/>
          </div>
        </form>

        <p className={styles._blackLink}  onClick={() => openModal('locationModal')}>Comprar sin registrarse</p>
        <p className={styles._grayLink}>¿Nuevo cliente? <a onClick={() => openModal('registerModal')}>Crear Cuenta</a></p>
        <p className={styles._grayLink}>¿Olvidaste tu contraseña? <a onClick={() => openModal('forgotPasswordModal')}>Recuperar Contraseña</a></p>
      </div>
    </div>
  )
}

export default LoginModal;
