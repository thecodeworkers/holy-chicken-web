import { useState } from 'react'
import styles from './styles.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import FormikConfig from './formik'
import { Button } from '@components'

const UserData = () => {

  const dispatch = useDispatch()
  const formik = FormikConfig(dispatch)
  const { errors, touched } = formik


  return (
    <>
      <div className={styles._titleParent}>
        <p className={styles._title}>Tus Datos</p>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className={styles._rightMain}>

          <div className={styles._inputRow}>
            <div className={styles._halfWidth} >
              <div className={styles._inputParent}>
                <label>Nombre</label>
                <input
                  placeholder='Nombre'
                  type='text'
                  name='name'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  className={errors.name && touched.name ? styles._inputError : styles._input} />
              </div>
            </div>

            <div className={styles._halfWidth}>
              <div className={`${styles._inputParent} ${styles._separation}`}>
                <label>Apellido</label>
                <input
                  placeholder='Apellido'
                  type='text'
                  name='lastname'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastname}
                  className={errors.lastname && touched.lastname ? styles._inputError : styles._input} />
              </div>
            </div>
          </div>

          <div className={styles._inputRow}>
            <div className={styles._fullContainer}>
              <div className={styles._inputParent}>
                <label>Cedula</label>
                <input
                  name='identification'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.identification}
                  placeholder='V-00-000-000'
                  type='text'
                  className={errors.identification && touched.identification ? styles._inputError : styles._input} />
              </div>
            </div>
          </div>

          <div className={styles._inputRow}>
            <div className={styles._fullContainer}>
              <div className={styles._inputParent}>
                <label>Email</label>
                <input
                  name='email'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  placeholder='correo@dominio.com'
                  type='text'
                  className={errors.email && touched.email ? styles._inputError : styles._input} />
              </div>
            </div>
          </div>

          <div className={styles._inputRow}>
            <div className={styles._fullContainer}>
              <div className={styles._inputParent}>
                <label>Telefono</label>
                <input
                  name='phone'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                  placeholder='+58 (000) 000 00 00'
                  type='text'
                  className={errors.phone && touched.phone ? styles._inputError : styles._input} />
              </div>
            </div>
          </div>
          <div className={styles._buttonContainer}>


            <div className={styles._btnParent}>
              <Button
                color='#000'
                text='Siguiente'
                textColor='#FFF'
                type='submit' flag
              />
            </div>

            <p className={styles._terms}>Al enviar, acepta nuestros <strong>términos y condiciones</strong> y
              nuestra <strong>política de privacidad</strong>, que explica cómo podemos
              recopilar y usar su información personal.</p>
          </div>
        </div>
      </form>
    </>
  )
}

export default UserData
