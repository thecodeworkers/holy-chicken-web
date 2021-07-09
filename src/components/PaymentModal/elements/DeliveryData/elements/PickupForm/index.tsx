import { useState, useEffect } from 'react'
import styles from './styles.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from '@components'
import { setStep, updateShippingMethod } from '@store/actions'
import { filter } from '@utils'

const PickupForm = () => {

  const { resource: { general: { general } }, paymentStep: { delivery_data }, cart: { cartProducts } } = useSelector((state: any) => state)
  const dispatch = useDispatch()
  const [pickupMethod, setPickupMethod] = useState('')

  const getShipping = (label) => {
    if (cartProducts?.availableShippingMethods) {
      const shippingMethods = cartProducts?.availableShippingMethods[0]?.rates || []
      const filterMethod = filter(shippingMethods, label, 'label')
      if (filterMethod[0]) return filterMethod[0]
    }
    return ''
  }
  const setLocation = (value) => {
    setPickupMethod(value)
    dispatch(setStep({ delivery_data: { ...delivery_data, location: value, valid: true } }))
  }

  const nextstep = () => {
    if (pickupMethod) dispatch(setStep({ step: 3 }))
  }

  const setDefaultForm = () => {
    if (delivery_data?.location) setPickupMethod(delivery_data.location)
    dispatch(updateShippingMethod(getShipping('Pickup').id))
  }

  useEffect(() => {
    setDefaultForm()
  }, [])



  return (
    <>
      <div className={styles._rightMain}>
        <div className={styles._addressCheckbox}>
          {
            general?.addresses.map((item, index) => {
              return (
                <div className={styles._radioContainer} key={index}>
                  <div className={styles._checkParent} >
                    <input type='checkbox'
                      value={item.local}
                      checked={pickupMethod === item.local}
                      className={styles._radioBtn}
                      onChange={(check) => { setLocation(check.currentTarget.value) }}
                    >
                    </input>
                    <div className={styles._addressDescription}>
                      <p className={styles._addressTitle}>{item?.local}</p>
                      {pickupMethod === item.local ? <p className={styles._addressSubtitle}>{item?.address}</p> : null}
                    </div>
                  </div>
                </div>
              )
            }
            )}
        </div>
      </div>

      <div className={styles._buttonContainer}>
        <div className={styles._btnParent}>
          <Button
            color='#000'
            text='Ingresar'
            textColor='#FFF'
            method={() => nextstep()} flag />
        </div>
      </div>
    </>
  )
}

export default PickupForm
