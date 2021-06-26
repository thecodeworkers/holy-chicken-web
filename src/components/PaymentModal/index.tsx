import { useState } from 'react'
import styles from './styles.module.scss'
import { useSelector } from 'react-redux'
import FormikConfig from './formik'

const PaymentContact = () => {

  const { intermitence: { paymentModal } } = useSelector((state: any) => state)

  const { resource: { general: { general } } } = useSelector((state: any) => state)
  const formik = FormikConfig()
  const { errors, touched } = formik
  return (

    <div className={paymentModal ? styles._main : styles._hidden} id={'paymentModal'}>
      <div className={styles._modal}>


      <div className={styles._leftSection}>
        <div className={styles._closeParent}>
          <img src='images/icons/circle-arrow.svg' width='25px' height='25px'></img>
        </div>

        <div className={styles._leftBody}>
          <div className={styles._stepContainer}>
            <div className={styles._checkParent}>
              <div className={styles._radioBtn}></div>
              <p>Tus Datos</p>
            </div>
            <div className={styles._stepData}>
              <p>Nombre, apellido</p>
            </div>
          </div>

          <div>
            <div className={styles._checkParent}>
              <div className={styles._radioBtn}></div>
              <p>Formas de entrega</p>
            </div>
            <div className={styles._stepData}>
              <p>Delivery</p>
            </div>
          </div>
          <div>
            <div className={styles._checkParent}>
              <div className={styles._radioBtn}></div>
              <p>Formas de pago</p>
            </div>
            <div className={styles._stepData}>
              <p>Zelle</p>
            </div>
          </div>
          <div>
            <div className={styles._checkParent}>
              <div className={styles._radioBtn}></div>
              <p>Facturacion</p>
            </div>
            <div className={styles._stepData}>
              <p>0055</p>
            </div>
          </div>

        </div>



      </div>
      <div className={styles._rightSection}>
        <div className={styles._closeParent}>
          <p className={styles._title}>Tus Datos</p>

          {/* <div className={styles._closeIconParent} onClick={() => dispatch(setShowModal(false))}>
              <img src='images/icons/close.svg' width='16px'></img>
            </div> */}
        </div>

        <div className={styles._rightMain}>
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
                  <div style={{ width: '100%' }}>
                    <div className={styles._inputParent}>
                      <label>Cedula</label>
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

                <div className={styles._inputRow}>
                  <div style={{ width: '100%' }}>
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



            </div>
          </form>
        </div>

        </div>
      </div>
    </div>
  )
}

export default PaymentContact
