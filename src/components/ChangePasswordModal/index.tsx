import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setShowModal } from '@store/actions'
import { Button, Tooltip } from '@components'
import formikConfig from './formik'
import styles from './styles.module.scss'
import { useRouter } from 'next/router'

const ChangePasswordModal = () => {
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)
  const [showTwo, setShowTwo] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  const formik = formikConfig(dispatch)
  const { errors, touched } = formik

  let timeout

  const { intermitence: { changePasswordModal }, auth: { tmpEmail } } = useSelector((state: any) => state)

  const showPassword = () => setShow(show => !show)
  const showPasswordTwo = () => setShowTwo(showTwo => !showTwo)

  const closeModal = (event) => {
    const { target } = event
    if (target.id == 'change-password-modal') dispatch(setShowModal({ changePasswordModal: false }))
  }

  const router = useRouter()

  useEffect(() => {
    if (!tmpEmail) {
      dispatch(setShowModal({ changePasswordModal: false }))
      formik.resetForm()

      if (router.query.key)
        window.history.replaceState(null, '', '/')
    }

    return () => clearTimeout(timeout)

  }, [tmpEmail])

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
        <form onSubmit={formik.handleSubmit}>
          <div className={styles._inputParent} onFocus={tooltipTimer} onBlur={() => setShowTooltip(false)}>
            <Tooltip paddinHorizontal={0} top='-75%' show={showTooltip} />
            <label>Contraseña</label>
            <input
              type={!show ? 'password' : 'text'}
              placeholder='Contraseña'
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className={errors.password && touched.password ? styles._inputError : styles._input}
            />
            <div className={styles._imageParent} onClick={showPassword}>
              <img src={!show ? 'images/icons/show-password.svg' : 'images/icons/hide-password.svg'} width='18px' height='18px' />
            </div>

          </div>

          <div className={styles._inputParent}>
            <label>Confirmar Contraseña</label>
            <input
              type={!showTwo ? 'password' : 'text'}
              placeholder='Contraseña'
              name="confirmPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              className={errors.confirmPassword && touched.confirmPassword ? styles._inputError : styles._input}
            />
            <div className={styles._imageParent} onClick={showPasswordTwo}>
              <img src={!showTwo ? 'images/icons/show-password.svg' : 'images/icons/hide-password.svg'} width='18px' height='18px' />
            </div>
          </div>

          <div className={styles._btnParent}>
            <Button
              color='#000'
              textColor='#FFF'
              text='Guardar'
              type="submit"
              flag={true}
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChangePasswordModal
