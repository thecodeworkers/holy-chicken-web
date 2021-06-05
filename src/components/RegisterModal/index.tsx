import { useState } from 'react'
import styles from './styles.module.scss'
import { Button } from '@components'
import { useDispatch, useSelector } from 'react-redux'
import { setShowModal } from '@store/actions'
import FormikConfig from './formik'

const RegisterModal = () => {

  const formik = FormikConfig()
  const { errors, touched } = formik

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

        <form onSubmit={formik.handleSubmit}>
          <div className={styles._row}>
            <div className={styles._halfWidth}>
              <div className={styles._inputParent}>
                <label>Nombre</label>
                <input
                placeholder='Nombre'
                type='text'
                name='name'
                id='name'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                className={errors.name && touched.name ? styles._inputError : styles._input} />
              </div>
            </div>

            <div className={styles._halfWidth}>
              <div className={`${styles._inputParent} ${styles._marginTop}`}>
                <label>Apellido</label>
                <input
                  type="text"
                  placeholder='Apellido'
                  name='lastname'
                  id='lastname'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastname}
                  className={errors.lastname && touched.lastname ? styles._inputError : styles._input}
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
              placeholder='correo'
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
                <label>Password</label>
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
              <div className={`${styles._inputParent} ${styles._marginTop}`}>
                <label>Password</label>
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
    </div>
  )
}

export default RegisterModal
