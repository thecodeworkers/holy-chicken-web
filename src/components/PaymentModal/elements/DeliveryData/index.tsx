import { useState, useEffect } from 'react'
import styles from './styles.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from '@components'
import {DeliveryForm, PickupForm} from './elements'

const DeliveryData = () => {

  const { resource: { general: { general } } } = useSelector((state: any) => state)

  const dispatch = useDispatch()
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

  const changeInput = () => {
    return setDate('date')
  }

  return (
    <>
      <div className={styles._titleParent}>
        <p className={styles._title}>Forma de entrega</p>
      </div>

      <div className={styles._rightMain}>
      <div className={styles._firstColumn}>
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
            </div>
            <div className={styles._inputDateRow}>
            <div className={styles._fullContainer}>
              <div className={styles._inputParent}>

                <input
                  type={date}
                  name='date'
                  placeholder={'00/00/00'}
                  className={styles._inputDate}
                  // onChange={deliveryform.handleChange}
                  // onBlur={deliveryform.handleChange}
                  // value={deliveryform.values.date}
                 />
              </div>
            </div>
          </div>
          <div className={styles._inputDateRow}>
            <div className={styles._fullContainer}>
              <div className={`${styles._inputParent} ${styles._separation}`}>

                <input
                  type={time}
                  name='time'
                  className={styles._inputDate}
                  placeholder="00:00 PM"
                  onFocus={() => setTime('time')}
                  onClick={() => setTime('time')}
                  autoFocus={time == 'time' ? true : false}
                />
              </div>
            </div>
          </div>
          </div>

            {show ?
            <DeliveryForm/>
            :
            <PickupForm />
          }

          </div>
        </div>

    </>
  )
}

export default DeliveryData
