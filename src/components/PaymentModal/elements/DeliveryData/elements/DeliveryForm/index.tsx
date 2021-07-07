import React, { useState, useEffect } from 'react'
import styles from './styles.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import deliveryConfig from './formik'
import { Button } from '@components'
import { filter } from '@utils'

const DeliveryForm = () => {

  const { resource: { general: { general }, countries }, paymentStep: { delivery_data } } = useSelector((state: any) => state)

  const dispatch = useDispatch()
  const deliveryform = deliveryConfig(dispatch, delivery_data)
  const [cities, setCities] = useState([])
  const [regions, setRegions] = useState([])
  const { errors, touched } = deliveryform

  const setDefaults = (value) => {
    deliveryform.setFieldValue('country', value)
    const filterCountry = filter(countries, value, 'slug')
    const city = filterCountry[0].cities?.nodes
    setCities(city || [])
    deliveryform.setFieldValue('city', city?.name,)
    const filterCities = filter(city, city?.name, 'name')
    setRegions(filterCities[0].region?.content || [])
    deliveryform.setFieldValue('municipality', filterCities[0].region?.content[0]?.name)
  }

  const setRegion = (value) => {
    deliveryform.setFieldValue('city', value)
    const filterCities = filter(cities, value, 'name')
    setRegions(filterCities[0].region?.content || [])
  }

  useEffect(() => {
    setDefaults('VE')
  }, [])

  return (
    <form onSubmit={deliveryform.handleSubmit}>
      <div className={styles._rightMain}>

        <div className={styles._firstRow}>
        </div>
        <div className={styles._inputRow}>
          <div className={styles._quarterWidth} >
            <div className={styles._inputParent}>
              <label>Nombre</label>
              <input
                placeholder='Nombre'
                type='text'
                name='name'
                onChange={deliveryform.handleChange}
                onBlur={deliveryform.handleBlur}
                value={deliveryform.values.name}
                className={errors.name && touched.name ? styles._inputError : styles._input} />
            </div>
          </div>

          <div className={styles._quarterWidth}>
            <div className={`${styles._inputParent} ${styles._separation}`}>
              <label>Apellido</label>
              <input
                placeholder='Apellido'
                type='text'
                name='lastname'
                onChange={deliveryform.handleChange}
                onBlur={deliveryform.handleBlur}
                value={deliveryform.values.lastname}
                className={errors.lastname && touched.lastname ? styles._inputError : styles._input} />
            </div>
          </div>


          <div className={styles._quarterWidth}>
            <div className={`${styles._inputParent} ${styles._separation}`}>
              <label>Telefono</label>
              <input
                placeholder='Telefono'
                type='text'
                name='phone'
                onChange={deliveryform.handleChange}
                onBlur={deliveryform.handleBlur}
                value={deliveryform.values.phone}
                className={errors.phone && touched.phone ? styles._inputError : styles._input} />
            </div>
          </div>
        </div>

        <div className={styles._inputRow}>
          <div className={styles._fullContainer}>
            <div className={styles._inputParent}>
              <label>Direcciónes guardadas</label>
              <select name="select"
                placeholder='Seleccione el país'
                onChange={deliveryform.handleChange}
                onBlur={deliveryform.handleBlur}
                value={deliveryform.values.country}
                className={errors.country && touched.country ? styles._inputError : styles._input}>
                <option>Dirección (zona, urbanzación, calle, casa/edificio</option>
              </select>
            </div>
          </div>
        </div>

        <div className={styles._inputRow}>
          <div className={styles._fullContainer}>
            <div className={styles._inputParent}>
              <label>Dirección (zona, urbanzación, calle, casa/edificio)</label>
              <input
                name='address'
                onChange={deliveryform.handleChange}
                onBlur={deliveryform.handleBlur}
                value={deliveryform.values.address}
                placeholder='Introducir dirección'
                type='text'
                className={errors.address && touched.address ? styles._inputError : styles._input} />
            </div>
          </div>
        </div>

        <div className={styles._inputRow}>
          <div className={styles._quarterWidth} >
            <div className={styles._inputParent}>
              <label>Punto de Referencia</label>
              <input
                placeholder='Introduzca Referencia'
                type='text'
                name='reference'
                onChange={deliveryform.handleChange}
                onBlur={deliveryform.handleBlur}
                value={deliveryform.values.reference}
                className={errors.reference && touched.reference ? styles._inputError : styles._input} />
            </div>
          </div>

          <div className={styles._quarterWidth}>
            <div className={`${styles._inputParent} ${styles._separation}`}>
              <label>Pais</label>
              <select name="country"
                placeholder='Seleccione el país'
                onChange={(event) => setDefaults(event.currentTarget.value)}
                onBlur={deliveryform.handleBlur}
                value={deliveryform.values.country}
                className={errors.country && touched.country ? styles._inputError : styles._input}>
                {countries?.length ? countries.map((country, index) =>
                  <option key={index} value={country.slug}>{country.title}</option>
                ) : <option>No Disponible</option>}
              </select>
            </div>
          </div>


          <div className={styles._quarterWidth}>
            <div className={`${styles._inputParent} ${styles._separation}`}>
              <label>Ciudad</label>
              <select name="city"
                placeholder='Seleccione el país'
                onChange={(event) => setRegion(event.currentTarget.value)}
                onBlur={deliveryform.handleBlur}
                value={deliveryform.values.city}
                className={errors.city && touched.city ? styles._inputError : styles._input}>
                {cities?.length ? cities.map((city, index) =>
                  <option key={index} value={city.name}>{city.name}</option>
                ) : <option>No Disponible</option>}
              </select>
            </div>
          </div>
        </div>

        <div className={styles._inputRow}>
          <div className={styles._quarterWidth} >
            <div className={styles._inputParent}>
              <label>Codigo Postal</label>
              <input
                placeholder='Codigo Postal'
                type='text'
                name='zipcode'
                onChange={deliveryform.handleChange}
                onBlur={deliveryform.handleBlur}
                value={deliveryform.values.zipcode}
                className={errors.zipcode && touched.zipcode ? styles._inputError : styles._input} />
            </div>
          </div>

          <div className={styles._threeQuarterWidth} >
            <div className={`${styles._inputParent} ${styles._separation}`}>
              <label>Municipio</label>
              <select name="municipality"
                placeholder='Seleccione el país'
                onChange={deliveryform.handleChange}
                onBlur={deliveryform.handleBlur}
                value={deliveryform.values.municipality}
                className={errors.municipality && touched.municipality ? styles._inputError : styles._input}>
                {regions?.length ? regions.map((region, index) =>
                  <option key={index} value={region.key}>{region.name}</option>
                ) : <option>No Disponible</option>}
              </select>
            </div>
          </div>

        </div>


        <div className={styles._buttonContainer}>
          <div className={styles._btnParent}>
            <Button
              color='#000'
              text='Ingresar'
              textColor='#FFF'
              type={'submit'} flag />
          </div>
        </div>
      </div>
    </form>

  )
}

export default DeliveryForm
