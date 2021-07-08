import React, { useState, useEffect } from 'react'
import styles from './styles.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import FormikConfig from './formik'
import { Button } from '@components'
import { filter } from '@utils'

const BillingData = () => {

  const { intermitence: { paymentModal }, resource: { general: { general }, allCountries } } = useSelector((state: any) => state)
  const dispatch = useDispatch()
  const formik = FormikConfig(dispatch)
  const { errors, touched } = formik
  const [states, setStates] = useState([])
  const [dataType, setDataType] = useState('same')

  const setDefaults = (value) => {
    formik.setFieldValue('country', value)
    const filterCountry = filter(allCountries, value, 'code')
    const newStates = filterCountry[0].states
    setStates(newStates || [])
  }

  useEffect(() => {
    setDefaults('VE')
  }, [])

  return (
    <>
      <div className={styles._titleParent}>
        <p className={styles._title}>Facturacion</p>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className={styles._rightMain}>

          <div className={styles._firstRow}>
            <div className={styles._deliveryType}>
              <div className={styles._radioContainer}>

                <div className={styles._checkParent} >
                  <input type='radio'
                    value={'same'}
                    checked={dataType === 'same'}
                    className={styles._radioBtn}
                    onChange={(check) => { setDataType(check.currentTarget.value) }}>
                  </input>
                  <p className={styles._radioTitle}>Utilizar los mismos datos de delivery</p>
                </div>
              </div>
              <div className={styles._radioContainer}>

                <div className={styles._checkParent} >
                  <input type='radio'
                    value={'none'}
                    checked={dataType === 'none'}
                    className={styles._radioBtn}
                    onChange={(check) => { setDataType(check.currentTarget.value) }}>
                  </input>
                  <p className={styles._radioTitle}>Ingresar otros datos</p>
                </div>
              </div>
            </div>
          </div>
          <>
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
                  <label>Dirección (zona, urbanzación, calle, casa/edificio)</label>
                  <input
                    name='address'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.address}
                    placeholder='Introducir dirección'
                    type='text'
                    className={errors.address && touched.address ? styles._inputError : styles._input} />
                </div>
              </div>
            </div>

            <div className={styles._inputRow}>

              <div className={styles._halfWidth}>
                <div className={`${styles._inputParent} ${styles._separation}`}>
                  <label>Telefono</label>
                  <input
                    placeholder='Telefono'
                    type='text'
                    name='phone'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phone}
                    className={errors.phone && touched.phone ? styles._inputError : styles._input} />
                </div>
              </div>

              <div className={styles._halfWidth}>
                <div className={`${styles._inputParent} ${styles._separation}`}>
                  <label>Pais</label>
                  <select name="country"
                    placeholder='Seleccione el país'
                    onChange={(event) => setDefaults(event.currentTarget.value)}
                    onBlur={formik.handleBlur}
                    value={formik.values.country}
                    className={errors.country && touched.country ? styles._inputError : styles._inputSelect}>
                    {allCountries?.length ? allCountries.map((country, index) =>
                      <option key={index} value={country.code}>{country.name}</option>
                    ) : <option>No Disponible</option>}
                  </select>
                </div>
              </div>
            </div>

            <div className={styles._inputRow}>
              <div className={styles._halfWidth}>
                <div className={`${styles._inputParent} ${styles._separation}`}>
                  <label>Estado</label>
                  <select name="state"
                    placeholder='Seleccione el país'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.state}
                    className={errors.state && touched.state ? styles._inputError : styles._inputSelect}>
                    {states?.length ? states.map((country, index) =>
                      <option key={index} value={country.code}>{country.name}</option>
                    ) : <option>No Disponible</option>}
                  </select>
                </div>
              </div>
              <div className={styles._halfWidth}>
                <div className={`${styles._inputParent} ${styles._separation}`}>
                  <label>Ciudad</label>
                  <input
                    placeholder='Ciudad'
                    type='text'
                    name='city'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.city}
                    className={errors.zipcode && touched.zipcode ? styles._inputError : styles._input} />
                </div>
              </div>
            </div>

            <div className={styles._inputRow}>
              <div className={styles._halfWidth} >
                <div className={styles._inputParent}>
                  <label>Codigo Postal</label>
                  <input
                    placeholder='Codigo Postal'
                    type='text'
                    name='zipcode'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.zipcode}
                    className={errors.zipcode && touched.zipcode ? styles._inputError : styles._input} />
                </div>
              </div>
            </div>
          </>


          <div className={styles._buttonContainer}>
            <div className={styles._btnParent}>
              <Button
                color='#000'
                text='Ingresar'
                textColor='#FFF'
                type='submit' flag />
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default BillingData
