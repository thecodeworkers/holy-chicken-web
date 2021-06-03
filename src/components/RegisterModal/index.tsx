import { useState } from 'react'
import styles from './styles.module.scss'
import { Button } from '@components'
import { useDispatch, useSelector } from 'react-redux'
import { setShowModal } from '@store/actions'

const RegisterModal = () => {

  const dispatch = useDispatch()
  const [show, setShow] = useState(false)
  const [showTwo, setShowTwo] = useState(false)
  const { intermitence: { registerModal } } = useSelector((state: any) => state)

  const showPassword = () => setShow(show => !show)

  const showPasswordTwo = () => setShowTwo(showTwo => !showTwo)

  const closeModal = (event, flag = false) => {
    const { target } = event
    if (target.id == 'close-register' || flag) dispatch(setShowModal({ registerModal: false }))
  }

  return (
    <div className={registerModal ? styles._background : styles._hidden} onClick={closeModal} id='close-register'>
      <div className={`${styles._modal} _generalCard`}>
        <p className={styles._title}> Regístrate</p>

        <form>
          <div className={styles._row}>
            <div className={styles._halfWidth}>
              <div className={styles._inputParent}>
                <label>Nombre</label>
                <input type="text" className={styles._input} placeholder='Nombre' />
              </div>
            </div>

            <div className={styles._halfWidth}>
              <div className={styles._inputParent}>
                <label>Apellido</label>
                <input type="text" className={styles._input} placeholder='Apellido' />
              </div>
            </div>
          </div>

          <div className={styles._inputParent}>
            <label>Teléfono</label>
            <input type="text" className={styles._input} placeholder='+58 (000) 000 00 00' />
          </div>

          <div className={styles._inputParent}>
            <label>Correo</label>
            <input type="mail" className={styles._input} placeholder='correo' />
          </div>

          <div className={`${styles._row} ${styles._marginTop}`}>
            <div className={styles._halfWidth}>
              <div className={styles._inputParent}>
                <label>Password</label>
                <input type={!show ? 'password' : 'text'} className={styles._input} placeholder='Contraseña' />
                <div className={styles._imageParent} onClick={showPassword}>
                  <img src={!show ? 'images/icons/show-password.svg' : 'images/icons/hide-password.svg'} width='18px' height='18px' />
                </div>
              </div>
            </div>

            <div className={styles._halfWidth}>
              <div className={styles._inputParent}>
                <label>Password</label>
                <input type={!showTwo ? 'password' : 'text'} className={styles._input} placeholder='Contraseña' />
                <div className={styles._imageParent} onClick={showPasswordTwo}>
                  <img src={!showTwo ? 'images/icons/show-password.svg' : 'images/icons/hide-password.svg'} width='18px' height='18px' />
                </div>
              </div>
            </div>
          </div>

          <div className={`${styles._row} ${styles._buttonsMarginTop}`}>
            <div className={styles._halfWidth}>
              <Button color='#F4F3EE' textColor='#000' text='Hacerlo luego' method={(event) => closeModal(event, true)} />
            </div>

            <div className={styles._halfWidth}>
              <Button color='#000' textColor='#FFF' text='Confirmar' />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterModal
