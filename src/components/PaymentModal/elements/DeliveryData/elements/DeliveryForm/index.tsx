import React, { useState, useEffect } from 'react'
import styles from './styles.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import deliveryConfig from './formik'
import { Button } from '@components'
import { filter } from '@utils'
import { saveDelivery, updateShippingMethod } from '@store/actions'

const DeliveryForm = () => {

  const { resource: { countries }, paymentStep: { delivery_data, forms }, cart: { cartProducts } } = useSelector((state: any) => state)
  const state=useSelector((state: any) => state.delivery)
  const dispatch = useDispatch()
  const deliveryform = deliveryConfig(dispatch, delivery_data, forms)
  const [cities, setCities] = useState([])
  const [regions, setRegions] = useState([])
  const [formActive, setFormActive] = useState(true)
  const { errors, touched } = deliveryform
  const data = state
  console.log(deliveryform.values)

  const setDefaults = (value) => {
    deliveryform.setFieldValue('country', value)
    const filterCountry = filter(countries, value, 'slug')
    const city = filterCountry[0].cities?.nodes
    setCities(city || [])
    deliveryform.setFieldValue('city', city[0]?.name)
    const filterCities = filter(city, city?.name, 'name')
    setRegions(filterCities[0].region?.content || [])
    deliveryform.setFieldValue('municipality', filterCities[0]?.region?.content[0]?.name)
    const shipping = getShipping(filterCities[0]?.region?.content[0]?.key)?.id
    dispatch(updateShippingMethod(shipping))
  }

  const setRegion = (value) => {
    deliveryform.setFieldValue('city', value)
    const filterCities = filter(cities, value, 'name')
    setRegions(filterCities[0].region?.content || [])
  }

  const setDefaultForm = () => {
    for (let key in delivery_data?.form) deliveryform.setFieldValue(key, delivery_data?.form[key])
  }


  const getShipping = (label) => {
    if (cartProducts?.availableShippingMethods) {
      const shippingMethods = cartProducts?.availableShippingMethods[0]?.rates || []
      const filterMethod = filter(shippingMethods, label, 'label')
      if (filterMethod[0]) return filterMethod[0]
    }
    return ''
  }

  const setShippingMethod = (label) => {
    const shipping = getShipping(label)?.id
    deliveryform.setFieldValue('municipality', label)
    deliveryform.setFieldValue('shippingMethod', shipping)
    dispatch(updateShippingMethod(shipping))
  }

  const setSaveData=(data)=>{
    for (let key in data) {
      deliveryform.setFieldValue(key, data[key])
    }
  }
  const saveData=(data)=>{
    dispatch(saveDelivery(data))
  }

  useEffect(() => {
    setDefaults('VE')
    setDefaultForm()
  }, [])

  return (
    <div className={styles._addressSelectContent}>
      <form onSubmit={deliveryform.handleSubmit}>
      {
        delivery_data.form&&formActive?
        data?.map((item, index) => {
          return (
              <button  onClick={()=>setSaveData(item)} className={styles._addressItem}>
                {item.address_1},{item.address_2}
              </button>

          )

        }):<div className={styles._rightMain}>
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
                <label>Teléfono</label>
                <input
                  placeholder='Teléfono'
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
                <label>Dirección (zona, urbanzación, calle, casa/edificio)</label>
                <input
                  name='address_1'
                  onChange={deliveryform.handleChange}
                  onBlur={deliveryform.handleBlur}
                  value={deliveryform.values.address_1}
                  placeholder='Introducir dirección'
                  type='text'
                  className={errors.address_1 && touched.address_1 ? styles._inputError : styles._input} />
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
                  name='address_2'
                  onChange={deliveryform.handleChange}
                  onBlur={deliveryform.handleBlur}
                  value={deliveryform.values.address_2}
                  className={errors.address_2 && touched.address_2 ? styles._inputError : styles._input} />
              </div>
            </div>

            <div className={styles._quarterWidth}>
              <div className={`${styles._inputParent} ${styles._separation}`}>
                <label>País</label>
                <select name="country"
                  placeholder='Seleccione el país'
                  onChange={(event) => setDefaults(event.currentTarget.value)}
                  onBlur={deliveryform.handleBlur}
                  value={deliveryform.values.country}
                  className={errors.country && touched.country ? styles._inputError : styles._inputSelect}>
                  {countries?.length ? countries.map((country, index) =>
                    <option key={index} value={country?.slug}>{country?.title}</option>
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
                  className={errors.city && touched.city ? styles._inputError : styles._inputSelect}>
                  {cities?.length ? cities?.map((city, index) =>
                    <option key={index} value={city?.name}>{city?.name}</option>
                  ) : <option>No Disponible</option>}
                </select>
              </div>
            </div>
          </div>

          <div className={styles._inputRow}>
            <div className={styles._quarterWidth} >
              <div className={styles._inputParent}>
                <label>Código postal</label>
                <input
                  placeholder='Código postal'
                  type='text'
                  name='zipcode'
                  onChange={deliveryform.handleChange}
                  onBlur={deliveryform.handleBlur}
                  value={deliveryform.values.zipcode}
                  className={errors.zipcode && touched.zipcode ? styles._inputError : styles._input} />
              </div>
            </div>

            <div className={styles._quarterWidth} >
              <div className={`${styles._inputParent}`}>
                <label>Municipio</label>
                <select name="municipality"
                  placeholder='Seleccione el país'
                  onChange={(event) => setShippingMethod(event.currentTarget.value)}
                  onBlur={deliveryform.handleBlur}
                  value={deliveryform.values.municipality}
                  className={errors.municipality && touched.municipality ? styles._inputError : styles._inputSelect}>
                  {regions?.length ? regions.filter((region: any) => region?.key?.includes(delivery_data?.selectedLocation)).map((region, index) =>
                    <option key={index} value={region?.key}>{region?.name}  &nbsp;  ${getShipping(region?.key)?.cost}</option>
                  ) : <option>No Disponible</option>}
                </select>
              </div>
            </div>

            <div className={styles._quarterWidth} >
            </div>
          </div>

          <div className={styles._buttonContainer}>
            <div className={styles._btnParent}>
                <button onClick={()=>saveData(deliveryform.values)} className={styles._addAddress}>Ingresar</button>
            </div>
          </div>
        </div>
      }
      </form>
      <div className={styles._btnAdd}>
        <button className={styles._addAddress} onClick={()=>setFormActive(!formActive)}>
          {formActive?'+':'<'}
        </button>
      </div>

    </div>


  )
}

export default DeliveryForm
