import { useState, useEffect } from 'react'
import styles from './styles.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from '@components'
import { setStep } from '@store/actions'

const PickupForm = () => {

  const { resource: { general: { general } }, paymentStep: { delivery_data } } = useSelector((state: any) => state)
  const dispatch = useDispatch()
  const [pickupMethod, setPickupMethod] = useState('')

  const setLocation = (value) => {
    setPickupMethod(value)
    dispatch(setStep({ delivery_data: { ...delivery_data, location: value } }))
  }

  const nextstep = () => {
    if (pickupMethod) dispatch(setStep({ step: 3 }))
  }

  const setDefaultForm = () => {
    if (delivery_data?.location) setPickupMethod(delivery_data.location)
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
            method={() => nextstep()} />
        </div>
      </div>
    </>
  )
}

export default PickupForm
