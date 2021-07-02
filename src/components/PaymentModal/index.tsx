import styles from './styles.module.scss'
import { useSelector } from 'react-redux'
import { UserData, DeliveryData, PaymentMethod, BillingData } from './elements'

const PaymentModal = () => {

  const { intermitence: { paymentModal } , paymentStep: { step } } = useSelector((state: any) => state)

  const currentStep= step

  const slider = (param) => {
    switch (param) {
      case 1:
        return <UserData  />

      case 2:
        return <DeliveryData  />

      case 3:
        return <PaymentMethod  />

      case 4:
        return <BillingData />

      default:
        return null
    }
  }


  return (

    <div className={paymentModal ? styles._main : styles._hidden} id={'paymentModal'}>
      <div className={styles._modal}>

        <div className={styles._leftSection}>
          <div className={styles._closeParent}>
            <img src='images/icons/circle-arrow.svg' width='25px' height='25px'></img>
          </div>

          <div className={styles._leftBody}>
            <div className={styles._stepContainer}>
              <div className={styles._checkParent}>
                <div className={styles._radioBtn}></div>
                <p>Tus Datos</p>
              </div>
              <div className={styles._stepData}>
                <p>Nombre, apellido</p>
              </div>
            </div>

            <div>
              <div className={styles._checkParent}>
                <div className={styles._radioBtn}></div>
                <p>Formas de entrega</p>
              </div>
              <div className={styles._stepData}>
                <p>Delivery</p>
              </div>
            </div>
            <div>
              <div className={styles._checkParent}>
                <div className={styles._radioBtn}></div>
                <p>Formas de pago</p>
              </div>
              <div className={styles._stepData}>
                <p>Zelle</p>
              </div>
            </div>
            <div>
              <div className={styles._checkParent}>
                <div className={styles._radioBtn}></div>
                <p>Facturacion</p>
              </div>
              <div className={styles._stepData}>
                <p>0055</p>
              </div>
            </div>
          </div>
          <div className={styles._totalParent}>
            <p className={styles._parentTitle}>Total</p>
            <p className={styles._parentTitle}>24$</p>
          </div>
        </div>
        <div className={styles._rightSection}>
        {slider(currentStep)}
        </div>
      </div>
    </div>
  )
}

export default PaymentModal
