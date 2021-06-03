import { useState, useEffect } from 'react'
import styles from './styles.module.scss'
import { Button } from '@components'
import { useDispatch, useSelector } from 'react-redux'
import { setShowModal } from '@store/actions'

const LoginModal = () => {

  const dispatch = useDispatch()
  const { intermitence: { loginModal } } = useSelector((state: any) => state)

  const [show, setShow] = useState(false)

  const showPassword = () => setShow(show => !show)

  const closeModal = (event) => {
    const { target } = event
    if(target.id == 'background') dispatch(setShowModal({ loginModal: false }))
  }

  const openModal = (name) => {
    dispatch(setShowModal({ [name]: true }))
    dispatch(setShowModal({ loginModal: false }))
  }

  return (
    <div className={`${loginModal ? styles._background : styles._hidden} ${styles._flex}`} onClick={closeModal} id='background'>
      <div className={`${styles._modal} _generalCard`}>
        <p className={styles._title}> Ingresar</p>
        <form>
          <div className={styles._inputParent}>
            <label>Email</label>
            <input type="text" className={styles._input} placeholder='Correo'/>
          </div>

          <div className={styles._inputParent}>
            <label>Password</label>
            <input type={!show ? 'password' : 'text'} className={styles._input} placeholder='Contraseña' />
            <div className={styles._imageParent} onClick={showPassword}>
            <img src={!show ? 'images/icons/show-password.svg' : 'images/icons/hide-password.svg'}  width='18px' height='18px' />
            </div>
          </div>

          <div className={styles._btnParent} >
            <Button color='#000' text='Ingresar' textColor='#FFF' />
          </div>
        </form>

        <p className={styles._blackLink}>Comprar sin registrarse</p>
        <p className={styles._grayLink}>¿Nuevo cliente? <a onClick={() => openModal('registerModal')}>Crear Cuenta</a></p>
        <p className={styles._grayLink}>¿Olvidaste tu contraseña? <a onClick={() => openModal('forgotPasswordModal')}>Recuperar Contraseña</a></p>

      </div>
    </div>
  )
}

export default LoginModal;
