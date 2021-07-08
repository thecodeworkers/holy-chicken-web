import styles from './styles.module.scss'

const OrderModal = ({ show, method }) => {
  return (
    <div className={show ? styles._background : styles._hidden}>
      <div className={`_generalCard ${styles._card}`}>
        <div className={styles._imgParent} onClick={method}>
          <img src='images/icons/circle-arrow.svg' width='25px' height='25px'></img>
        </div>

        <p className={styles._title}>Pedidos</p>

        <div className={styles._products}>
          {
            Array.from(Array(5).keys()).map((item, index) => {
              return (
                <div className={styles._row} key={index}>
                  <div className={styles._columnOne}>
                    <img src='images/resources/burguer.png' width='70px'></img>
                  </div>

                  <div className={styles._columnTwo}>
                    <p>Not so holy</p>
                    <p>210 gramos de pollo crispy marinado con picante</p>
                  </div>

                  <div className={styles._columnThree}>
                    <p>7$</p>
                  </div>
                </div>
              )
            })
          }
        </div>

        <div className={styles._footer}>
          <div className={styles._footerParent}>
            <p>Total estimado</p>
            <p>$11.5</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderModal
