import styles from './styles.module.scss'

const orders = [
  {
    order: '#001',
    date: '00/00/00',
    hour: '00:00 PM',
    status: 'Por confirmar'
  },
  {
    order: '#001',
    date: '00/00/00',
    hour: '00:00 PM',
    status: 'Por confirmar'
  },
  {
    order: '#003',
    date: '00/00/00',
    hour: '00:00 PM',
    status: 'Por confirmar'
  }
]

const OpenModal = ({ show, method }) => {

  return (
    <div className={ show ? styles._background : styles._hidden}>
      <div className={`_generalCard ${styles._card}`}>

        <div className={styles._imgParent} onClick={method}>
          <img src='images/icons/circle-arrow.svg' width='25px' height='25px'></img>
        </div>

        <p className={styles._title}>Ordenes abiertas</p>

        {
          orders.map((item, index) => {
            return (
              <div className={styles._itemParent} key={index}>
                <input
                  type='checkbox'
                  className={styles._radioBtn}
                  defaultChecked={false}
                />

                <div className={styles._column}>
                  <div className={styles._block}>
                    <div className={styles._row}>
                      <p className={styles._bold}>Orden</p>
                      <p>{item.order}</p>
                    </div>

                    <div className={styles._row}>
                      <p>Fecha</p>
                      <p>{item.date}</p>
                    </div>

                    <div className={styles._row}>
                      <p>Hora</p>
                      <p>{item.hour}</p>
                    </div>

                    <div className={styles._row}>
                      <p className={styles._bold}>Status</p>
                      <p>{item.status}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default OpenModal
