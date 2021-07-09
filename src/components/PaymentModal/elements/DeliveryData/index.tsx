import { useState, useEffect } from 'react'
import styles from './styles.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from '@components'
import { DeliveryForm, PickupForm } from './elements'
import { getFullTime, getHHMM, now } from '@utils'
import { setStep } from '@store/actions'

const DeliveryData = () => {

  const { paymentStep: { delivery_data } } = useSelector((state: any) => state)

  const dispatch = useDispatch()
  const [shippingMethod, setShippingMethod] = useState('pickup')
  const [dateTime, setDateTime] = useState(getFullTime(now(), '-'))
  const [time, setTime] = useState(getHHMM(now()))

  const setDelivery = (value) => {
    setShippingMethod(value)
    dispatch(setStep({ delivery_data: { ...delivery_data, type: value } }))
  }

  const setDate = (value) => {
    setDateTime(getFullTime(value, '-'))
    dispatch(setStep({ delivery_data: { ...delivery_data, date: value } }))
  }

  const setNewTime = (value) => {
    setTime(value)
    dispatch(setStep({ delivery_data: { ...delivery_data, time: value } })
    )
  }

  useEffect(() => {
    if (delivery_data?.type) setShippingMethod(delivery_data.type)
    if (!delivery_data?.type) dispatch(setStep({ delivery_data: { ...delivery_data, type: shippingMethod } }))
  }, [])

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
                  <input type='radio'
                    value='pickup'
                    name='shippingMethod'
                    className={styles._radioBtn}
                    checked={shippingMethod === 'pickup'}
                    onChange={(check) => { setDelivery(check.currentTarget.value) }}>
                  </input>
                  <p className={styles._radioTitle}>Pick Up</p>
                </div>
              </div>
              <div className={styles._radioContainer}>

                <div className={styles._checkParent} >
                  <input type='radio'
                    name='shippingMethod'
                    value='delivery'
                    className={styles._radioBtn}
                    checked={shippingMethod === 'delivery'}
                    onChange={(check) => { setDelivery(check.currentTarget.value) }}>
                  </input>
                  <p className={styles._radioTitle}>Delivery</p>
                </div>
              </div>
            </div>
            <div className={styles._inputDateRow}>
              <div className={styles._fullContainer}>
                <div className={styles._inputParent}>
                  <input
                    type='date'
                    name='date'
                    value={dateTime}
                    placeholder={'00/00/0000'}
                    min={getFullTime(now(), '-', 1)}
                    className={styles._inputDate}
                    onChange={(event) => setDate(event.currentTarget.value)}
                  />
                </div>
              </div>
            </div>
            <div className={styles._inputDateRow}>
              <div className={styles._fullContainer}>
                <div className={`${styles._inputParent} ${styles._separation}`}>

                  <input
                    type='time'
                    name='time'
                    className={styles._inputDate}
                    placeholder="00:00 PM"
                    value={time}
                    onChange={(event) => setNewTime(event.currentTarget.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {shippingMethod === 'delivery' ?
            <DeliveryForm />
            :
            <PickupForm />
          }
        </div>
      </div>
    </>
  )
}

export default DeliveryData
