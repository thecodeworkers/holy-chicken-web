import styles from './styles.module.scss'
import { Button } from '@components'
import { useDispatch, useSelector } from 'react-redux'
import { setShowModal } from '@store/actions'

const ForgotPasswordModal = () => {

  const { intermitence: { forgotPasswordModal } } = useSelector((state: any) => state)
  const dispatch = useDispatch()

  const closeModal = (event) => {
    const { target } = event

    console.log(target)
    if(target.id == 'forgot-password-modal') dispatch(setShowModal({ forgotPasswordModal: false }))
  }

  return (
    <div className={forgotPasswordModal ? styles._background : styles._hidden} id='forgot-password-modal' onClick={closeModal}>
      <div className={`${styles._modal} _generalCard`}>
        <p className={styles._title}> ¿Olvidó su Contraseña?</p>
        <p className={styles._parragraph}> Ingrese la dirección de correo electrónico. Le enviaremos un enlace para restablecer su contraseña.</p>

        <div className={styles._inputParent}>
          <label>Email</label>
          <input type="text" className={styles._input} placeholder='Correo' />
        </div>

        <div className={styles._buttonParent}>
          <Button color='#000' text='Enviar' textColor='#FFF' />
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordModal
