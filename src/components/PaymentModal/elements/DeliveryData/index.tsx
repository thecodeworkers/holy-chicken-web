import { useState } from 'react'
import styles from './styles.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import FormikConfig from './formik'
import { Button } from '@components'

const DeliveryData = () => {

  const {resource: { general: { general } } } = useSelector((state: any) => state)
  const dispatch = useDispatch()
  const formik = FormikConfig(dispatch)
  const { errors, touched } = formik
  const [show, setShow] = useState(true)
  const [showAddress, setShowAddress] = useState(false)
  const [date, setDate] = useState('text')
  const [time, setTime] = useState('text')
  const setDelivery = (checked) => {
    if (checked == 'delivery') setShow(true)
    if (checked == 'pickup') setShow(false)
  }

  const showPicukp = (checked) => {
    setShowAddress(checked => !checked)
  }

  return (
    <>
      <div className={styles._titleParent}>
        <p className={styles._title}>Forma de entrega</p>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className={styles._rightMain}>

          <div className={styles._firstRow}>
            <div className={styles._deliveryType}>
              <p className={styles._deliveryTitle}>Seleccione una opción</p>
              <div className={styles._radioContainer}>

                <div className={styles._checkParent} >
                  <input type='checkbox'
                    id={'delivery'}
                    className={styles._radioBtn}
                    defaultChecked={true}
                    onClick={(check) => { setDelivery(check.currentTarget.id) }}>
                  </input>
                  <p className={styles._radioTitle}>Delivery</p>
                </div>
              </div>
              <div className={styles._radioContainer}>

                <div className={styles._checkParent} >
                  <input type='checkbox'
                    id={'pickup'}
                    className={styles._radioBtn}
                    defaultChecked={false}
                    onClick={(check) => { setDelivery(check.currentTarget.id) }}>
                  </input>
                  <p className={styles._radioTitle}>Pick Up</p>
                </div>
              </div>
              {!show ?
              <div className={styles._addressCheckbox}>
                {
                general?.addresses.map((item, index) => {
                  return(
                <div className={styles._radioContainer} key={index}>
                <div className={styles._checkParent} >
                  <input type='checkbox'
                    id={item.local}
                    className={styles._radioBtn}
                    defaultChecked={false}
                    onClick={(check) => { showPicukp(check.currentTarget.id) }}
                  >
                  </input>
                  <div className={styles._addressDescription}>
                  <p className={styles._addressTitle}>{item?.local}</p>
                  {showAddress ? <p className={styles._addressSubtitle}>{item?.address}</p> : null}
                  </div>
                </div>
              </div>
                 )}
                )}
            </div>
             : null
             }
            </div>

            <div className={styles._inputDateRow}>
            <div className={styles._fullContainer}>
                <div className={styles._inputParent}>

                  <input
                    type={date}
                    name='date'
                    placeholder={'00/00/0000'}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.date}
                    onClick={() => setDate('date')}
                    className={errors.date && touched.date ? styles._inputError : styles._inputDate} />
                </div>
              </div>
            </div>
            <div className={styles._inputDateRow}>
            <div className={styles._fullContainer}>
                <div className={`${styles._inputParent} ${styles._separation}`}>

                  <input
                    type={time}
                    name='time'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="00:00 PM"
                    value={formik.values.time}
                    onClick={() => setTime('time')}
                    className={errors.time && touched.time ? styles._inputError : styles._inputDate} />
                </div>
              </div>
            </div>
          </div>

          {show ?
            <>
              <div className={styles._inputRow}>
                <div className={styles._quarterWidth} >
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

                <div className={styles._quarterWidth}>
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


                <div className={styles._quarterWidth}>
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
              </div>

              <div className={styles._inputRow}>
              <div className={styles._fullContainer}>
                  <div className={styles._inputParent}>
                    <label>Direcciónes guardadas</label>
                    <select name="select"
                      placeholder='Seleccione el país'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.country}
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
                      name='phone'
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
                <div className={styles._quarterWidth} >
                  <div className={styles._inputParent}>
                    <label>Punto de Referencia</label>
                    <input
                      placeholder='Introduzca Referencia'
                      type='text'
                      name='reference'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.reference}
                      className={errors.reference && touched.reference ? styles._inputError : styles._input} />
                  </div>
                </div>

                <div className={styles._quarterWidth}>
                  <div className={`${styles._inputParent} ${styles._separation}`}>
                    <label>Pais</label>
                    <select name="select"
                      placeholder='Seleccione el país'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.country}
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
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.city}
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
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.zipcode}
                      className={errors.zipcode && touched.zipcode ? styles._inputError : styles._input} />
                  </div>
                </div>

                <div className={styles._threeQuarterWidth} >
                  <div className={`${styles._inputParent} ${styles._separation}`}>
                    <label>Municipio</label>
                    <select name="select"
                      placeholder='Seleccione el país'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.city}
                      className={errors.city && touched.city ? styles._inputError : styles._input}>
                      <option>Chacao</option>
                      </select>
                  </div>
                </div>

              </div>
            </> : null
          }

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

export default DeliveryData
