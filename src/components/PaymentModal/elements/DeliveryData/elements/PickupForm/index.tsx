import { useState, useEffect } from 'react'
import styles from './styles.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import pickupConfig from './formik'
import { Button } from '@components'

const PickupForm = () => {

  const { resource: { general: { general } } } = useSelector((state: any) => state)
  const dispatch = useDispatch()
  const pickupform = pickupConfig(dispatch)
  const { errors, touched } = pickupform
  const [pickupMethod, setPickupMethod] = useState('')

  return (
    <form onSubmit={pickupform.handleSubmit}>
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
                      onChange={(check) => { setPickupMethod(check.currentTarget.value) }}
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
            type={'submit'} flag />
        </div>
      </div>


    </form>
  )
}

export default PickupForm
