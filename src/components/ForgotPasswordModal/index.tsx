import { useEffect, useState  } from 'react'
import styles from './styles.module.scss'
import { Button, Toast } from '@components'
import { useDispatch, useSelector } from 'react-redux'
import { setShowModal, resetModals, setToast, resetForgotStatus } from '@store/actions'
import formikConfig from './formik'

const ForgotPasswordModal = () => {

  const dispatch = useDispatch()
  const { intermitence: { forgotPasswordModal }, auth } = useSelector((state: any) => state)
  const formik = formikConfig(dispatch)
  const { errors, touched } = formik

  const closeModal = (event) => {
    const { target } = event
    if(target.id == 'forgot-password-modal') {
      dispatch(setShowModal({ forgotPasswordModal: false }))
      formik.resetForm()
      dispatch(setToast('', '', 0))
    }
  }

  useEffect(() => {
    if(auth?.emailSended) {
      dispatch(setShowModal({ forgotPasswordModal: false }))
      dispatch(resetForgotStatus())
      formik.resetForm()
    }

  }, [auth?.emailSended])


  const openChangePassword = (  ) => {
    dispatch(resetModals())
    dispatch(setShowModal({ changePasswordModal: true }))
  }

  return (
    <div className={forgotPasswordModal ? styles._background : styles._hidden} id='forgot-password-modal' onClick={closeModal}>
      <div className={`${styles._modal} _generalCard`}>
        <p className={styles._title}> ¿Olvidó su Contraseña?</p>
        <p className={styles._parragraph}> Ingrese la dirección de correo electrónico. Le enviaremos un enlace para restablecer su contraseña.</p>

        <form onSubmit={formik.handleSubmit}>
        <div className={styles._inputParent}>
          <label>Email</label>
          <input
            type="text"
            placeholder='Correo'
            name='email'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className={errors.email && touched.email ? styles._inputError : styles._input} />
        </div>

        <div className={styles._buttonParent}>
          <Button color='#000' text='Enviar' textColor='#FFF' method={null} type='submit' flag={true}/>
        </div>
        </form>
      </div>
    </div>
  )
}

export default ForgotPasswordModal
