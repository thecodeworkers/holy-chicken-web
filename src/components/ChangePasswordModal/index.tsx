import { useState, useEffect } from 'react'
import styles from './styles.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { setShowModal } from '@store/actions'
import { Button, Tooltip } from '@components'

const ChangePasswordModal = () => {

  const dispatch = useDispatch()
  const [show, setShow] = useState(false)
  const [showTwo, setShowTwo] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  let timeout

  const { intermitence: { changePasswordModal } } = useSelector((state: any) => state)

  const showPassword = () => setShow(show => !show)
  const showPasswordTwo = () => setShowTwo(showTwo => !showTwo)

  const closeModal = (event) => {
    const { target } = event
    if (target.id == 'change-password-modal') dispatch(setShowModal({ changePasswordModal: false }))
  }

  useEffect(() => {
    return () => clearTimeout(timeout)
  }, [])

  const tooltipTimer = () => {
    setShowTooltip(true)

    timeout = setTimeout(() => {
      setShowTooltip(false)
    }, 8000);
  }

  return (
    <div className={changePasswordModal ? styles._background : styles._hidden} id='change-password-modal' onClick={closeModal}>
      <div className={`${styles._modal} _generalCard`}>
        <p className={styles._title}> Nueva Contraseña</p>
        <form>
          <div className={styles._inputParent} onFocus={tooltipTimer} onBlur={() => setShowTooltip(false)}>
          <Tooltip paddinHorizontal={0} top='-75%'show={showTooltip}/>
            <label>Contraseña</label>
            <input type={!show ? 'password' : 'text'} className={styles._input} placeholder='Contraseña' />
            <div className={styles._imageParent} onClick={showPassword}>
              <img src={!show ? 'images/icons/show-password.svg' : 'images/icons/hide-password.svg'} width='18px' height='18px' />
            </div>

          </div>

          <div className={styles._inputParent}>
            <label>Confirmar Contraseña</label>
            <input type={!showTwo ? 'password' : 'text'} className={styles._input} placeholder='Contraseña' />
            <div className={styles._imageParent} onClick={showPasswordTwo}>
              <img src={!showTwo ? 'images/icons/show-password.svg' : 'images/icons/hide-password.svg'} width='18px' height='18px' />
            </div>
          </div>

          <div className={styles._btnParent}>
            <Button color='#000' textColor='#FFF' text='Guardar'/>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChangePasswordModal
