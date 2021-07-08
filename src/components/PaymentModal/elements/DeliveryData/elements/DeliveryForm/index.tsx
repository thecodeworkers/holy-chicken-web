import { useState, useEffect } from 'react'
import styles from './styles.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import deliveryConfig from './formik'
import { Button } from '@components'

const DeliveryForm = () => {

  const { resource: { general: { general } } } = useSelector((state: any) => state)
  const dispatch = useDispatch()
  const deliveryform = deliveryConfig(dispatch)
  const { errors, touched } = deliveryform
  const [showAddress, setShowAddress] = useState(false)
  const [date, setDate] = useState('text')
  const [time, setTime] = useState('text')

  const showPicukp = (checked) => {
    setShowAddress(checked => !checked)
  }

  const changeInput = () => {
    return setDate('date')
  }


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
              <select name="select"
                placeholder='Seleccione el país'
                onChange={deliveryform.handleChange}
                onBlur={deliveryform.handleBlur}
                value={deliveryform.values.country}
                className={errors.country && touched.country ? styles._inputError : styles._input}>
                <option>Venezuela</option>
              </select>
            </div>
          </div>


          <div className={styles._quarterWidth}>
            <div className={`${styles._inputParent} ${styles._separation}`}>
              <label>Ciudad</label>
              <select name="select"
                placeholder='Seleccione el país'
                onChange={deliveryform.handleChange}
                onBlur={deliveryform.handleBlur}
                value={deliveryform.values.city}
                className={errors.city && touched.city ? styles._inputError : styles._input}>
                <option>Caracas</option>
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
              <select name="select"
                placeholder='Seleccione el país'
                onChange={deliveryform.handleChange}
                onBlur={deliveryform.handleBlur}
                value={deliveryform.values.city}
                className={errors.city && touched.city ? styles._inputError : styles._input}>
                <option>Chacao</option>
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
