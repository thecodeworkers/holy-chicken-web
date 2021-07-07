import { useState, useEffect} from 'react'
import styles from './styles.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import pickupConfig from './formik'
import { Button } from '@components'

const PickupForm = () => {

  const {resource: { general: { general } } } = useSelector((state: any) => state)
  const dispatch = useDispatch()
  const pickupform = pickupConfig(dispatch)
  const { errors, touched } = pickupform
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

  const changeInput= () =>{
   return setDate('date')
  }

  useEffect(() => {
    console.log(pickupform.values);

  }, [])



  return (
      <form onSubmit={pickupform.handleSubmit}>
        <div className={styles._rightMain}>
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
