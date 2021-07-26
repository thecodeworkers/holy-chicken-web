import styles from './styles.module.scss'
import { parseDate, parseHour } from '../../functions'

const statusMessage = {
  pending: 'Pendiente',
  processing: 'Procesando',
  'on-hold': 'En espera',
  completed: 'Completada',
  cancelled: 'Cancelada',
  refunded: 'Reembolsada',
  failed: 'Fallida'
}

const OpenModal = ({ show, method, data, setCurrentOrder, currentOrder }) => {

  const orders = data.filter(order => {
    const status = order.status.toLowerCase()
    return status == 'pending' || status == 'processing'
  })

  return (
    <div className={ show ? styles._background : styles._hidden}>
      <div className={`_generalCard ${styles._card}`}>

        <div className={styles._imgParent} onClick={method}>
          <img src='images/icons/circle-arrow.svg' width='25px' height='25px'></img>
        </div>

        <p className={styles._title}>Ordenes abiertas</p>


        <div className={styles._ordersParent}>
        {
          orders.length ?
          orders.map((item, index) => {
            return (
              <div className={styles._itemParent} key={index}>
                <input
                  type='radio'
                  className={styles._radioBtn}
                  readOnly
                  checked={item?.orderNumber == currentOrder?.orderNumber ? true : false}
                  onChange={() => setCurrentOrder(item)}
                />

                <div className={styles._column}>
                  <div className={styles._block}>
                    <div className={styles._row}>
                      <p className={styles._bold}>Orden</p>
                      <p>{`#${item.orderNumber}`}</p>
                    </div>

                    <div className={styles._row}>
                      <p>Fecha</p>
                      <p>{parseDate(item.date)}</p>
                    </div>

                    <div className={styles._row}>
                      <p>Hora</p>
                      <p>{parseHour(item.date)}</p>
                    </div>

                    <div className={styles._row}>
                      <p className={styles._bold}>Status</p>
                      <p>{statusMessage[item.status]}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          }) : <p className={styles._text}>No existen ordenes abiertas</p>
        }
        </div>

      </div>
    </div>
  )
}

export default OpenModal
