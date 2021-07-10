import React, { useState, useEffect } from 'react'
import styles from './styles.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { UserData, DeliveryData, PaymentMethod, BillingData, LoadingModal } from './elements'
import { setShowModal, setStep } from '@store/actions'
const PaymentModal = () => {

  const { intermitence: { paymentModal }, paymentStep: { user_data, delivery_data, step, payment_data, confirmProcess }, cart: { cartProducts } } = useSelector((state: any) => state)
  const dispatch = useDispatch()
  const [currentStep, setCurrentStep] = useState(step)
  useEffect(() => {
    setCurrentStep(step)
  }, [step])

  const newStep = (newData) => {
    switch (newData) {
      case 2:
        if (user_data?.valid)
          dispatch(setStep({ step: newData }))
        break;
      case 3:
        if (delivery_data?.valid)
          dispatch(setStep({ step: newData }))
        break;
      case 4:
        if (payment_data?.valid)
          dispatch(setStep({ step: newData }))
        break;
      default:
        dispatch(setStep({ step: newData }))
        break;
    }
  }

  const slider = (param) => {
    switch (param) {
      case 1:
        return <UserData />
      case 2:
        return <DeliveryData />

      case 3:
        return <PaymentMethod />

      case 4:
        return <BillingData />

      default:
        return null
    }
  }

  return (

    <div className={paymentModal ? styles._main : styles._hidden} id={'paymentModal'}>
      {!confirmProcess ? (
        <div className={styles._modal}>

          <div className={styles._leftSection}>
            <div className={styles._closeParent}>
              <img onClick={() => dispatch(setShowModal({ paymentModal: false }))} src='images/icons/close.svg' width='20px' height='20px'></img>
            </div>

            <div className={styles._leftBody}>
              <div className={styles._stepContainer}>
                <div className={styles._checkParent}>
                  <div onClick={() => newStep(1)} className={currentStep === 1 ? styles._radioBtnChecked : styles._radioBtn}></div>
                  <p>Tus Datos</p>
                </div>
                <div className={styles._stepData}>
                  {user_data?.name ?
                    <p>{`${user_data.name},
                ${user_data.lastname},
                ${user_data.identification},
                ${user_data.email}`}</p>
                    : <p>Nombre, Apellido, Cedula, Email</p>
                  }
                </div>
              </div>

              <div>
                <div className={styles._checkParent}>
                  <div onClick={() => newStep(2)} className={currentStep === 2 ? styles._radioBtnChecked : styles._radioBtn}></div>
                  <p>Formas de entrega</p>
                </div>
                <div className={styles._stepData}>
                  {delivery_data?.type ? <p>{delivery_data?.type}</p> : <p>Tipo de entrega</p>}
                </div>
              </div>
              <div>
                <div className={styles._checkParent}>
                  <div onClick={() => newStep(3)} className={currentStep === 3 ? styles._radioBtnChecked : styles._radioBtn}></div>
                  <p>Formas de pago</p>
                </div>
                <div className={styles._stepData}>
                  {payment_data?.type ? <p>{payment_data?.type}</p> : <p>Forma de Pago</p>}
                </div>
              </div>
              <div>
                <div className={styles._checkParent}>
                  <div onClick={() => newStep(4)} className={currentStep === 4 ? styles._radioBtnChecked : styles._radioBtn}></div>
                  <p>Facturacion</p>
                </div>

              </div>
            </div>
            <div className={styles._totalParent}>
              <p className={styles._parentTitle}>Total</p>
              <p className={styles._parentTitle}>{cartProducts.total}</p>
            </div>
          </div>
          <div className={styles._rightSection}>
            {slider(currentStep)}
          </div>
        </div>) : <LoadingModal />
      }
    </div>
  )
}

export default PaymentModal
