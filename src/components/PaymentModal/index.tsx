import React, { useState, useEffect } from 'react'
import styles from './styles.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { UserData, DeliveryData, PaymentMethod, BillingData, LoadingModal } from './elements'
import { setShowModal, setStep } from '@store/actions'
import Button from '../Button'
const PaymentModal = () => {

  const { intermitence: { paymentModal }, paymentStep: { user_data, delivery_data, step, payment_data, confirmProcess, error }, cart: { cartProducts } } = useSelector((state: any) => state)
  const dispatch = useDispatch()
  const [currentStep, setCurrentStep] = useState(step)
  useEffect(() => {
    setCurrentStep(step)
  }, [step])

  useEffect(() => {
    dispatch(setStep({ loading: false, confirmProcess: false }))
  }, [])

  useEffect(() => {
    if (payment_data?.type?.toLowerCase() === 'tarjeta de credito' && payment_data?.form?.cardValid) dispatch(setStep({ payment_data: {}, step: 3 }))
  }, [payment_data?.type])

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

  const closeError = () => {
    dispatch(setStep({ error: false }))
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
      {error ? (
        <div className={styles._modal}>
          <div className={styles._errorContainer}>
            <h2 className={styles._errorTitle}>Error al procesar su pedido</h2>
            <p className={styles._errorBody}>Ha ocurrido un error al procesar su pedido</p>
            <p className={styles._errorBody}>Por favor comparta el siguiente mensaje con atencion al cliente</p>
            <p className={styles._errorBody}>{error}</p>
            <div className={styles._buttonError}>

              <Button text={'Cerrar'} method={closeError}
                color='#000'
                textColor='#FFF' />
            </div>
          </div>
        </div>
      ) :
        !confirmProcess ? (
          <div className={styles._modal}>
            <div className={styles._leftSection}>
              <div className={styles._closeParent}>
                <img onClick={() => dispatch(setShowModal({ paymentModal: false }))} src='images/icons/close.svg' width='20px' height='20px'></img>
              </div>

              <div className={styles._leftBody}>
                <div className={styles._stepContainer}>
                  <div className={styles._checkParent} onClick={() => newStep(1)} >
                    <div className={currentStep === 1 ? styles._radioBtnChecked : styles._radioBtn}></div>
                    <p>Tus Datos</p>
                  </div>
                  <div className={styles._stepData}>
                    {user_data?.name ?
                      <p>{`${user_data.name},
                ${user_data?.lastname},
                ${user_data?.identification},
                ${user_data?.email}`}</p>
                      : <p>Nombre, Apellido, Cedula, Email</p>
                    }
                  </div>
                </div>

                <div>
                  <div className={styles._checkParent} onClick={() => newStep(2)}>
                    <div className={currentStep === 2 ? styles._radioBtnChecked : styles._radioBtn}></div>
                    <p>Formas de entrega</p>
                  </div>
                  <div className={styles._stepData}>
                    {delivery_data?.type ? <p>{delivery_data?.type}</p> : <p>Tipo de entrega</p>}
                  </div>
                </div>
                <div>
                  <div className={styles._checkParent} onClick={() => newStep(3)}>
                    <div className={currentStep === 3 ? styles._radioBtnChecked : styles._radioBtn}></div>
                    <p>Formas de pago</p>
                  </div>
                  <div className={styles._stepData}>
                    {payment_data?.type ? <p>{payment_data?.type}</p> : <p>Forma de Pago</p>}
                  </div>
                </div>
                <div>
                  <div className={styles._checkParent} onClick={() => newStep(4)}>
                    <div className={currentStep === 4 ? styles._radioBtnChecked : styles._radioBtn}></div>
                    <p>Facturación</p>
                  </div>

                </div>
              </div>
              <div className={styles._totalParent}>
                <p className={styles._parentTitle}>Total</p>
                <p className={styles._parentTitle}>{cartProducts?.total}  <span className={styles._bs}>~ {cartProducts?.totalBs || "Bs.0,00"}</span></p>
              </div>
            </div>
            <div className={styles._rightSection}>
              {slider(currentStep)}
            </div>
          </div>
        ) : <LoadingModal />
      }
    </div>
  )
}

export default PaymentModal
