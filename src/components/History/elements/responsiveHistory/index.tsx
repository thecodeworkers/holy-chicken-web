import { useState } from 'react'
import styles from './styles.module.scss'
import { Search } from '@images/icons'
import { Button } from '@components'
import { useSelector } from 'react-redux'

const orders = [
  {
    number: '#000',
    date: '00/00/00',
    hour: '00:00PM'
  },
  {
    number: '#000',
    date: '00/00/00',
    hour: '00:00PM'
  },
  {
    number: '#000',
    date: '00/00/00',
    hour: '00:00PM'
  },
  {
    number: '#000',
    date: '00/00/00',
    hour: '00:00PM'
  },
  {
    number: '#000',
    date: '00/00/00',
    hour: '00:00PM'
  },
  {
    number: '#000',
    date: '00/00/00',
    hour: '00:00PM'
  },
  {
    number: '#000',
    date: '00/00/00',
    hour: '00:00PM'
  },
  {
    number: '#000',
    date: '00/00/00',
    hour: '00:00PM'
  },
  {
    number: '#000',
    date: '00/00/00',
    hour: '00:00PM'
  }
]

const ResponsiveHistory = ({ modalMethod }) => {

  const [showData, setShowData] = useState(false)

  const changeStatus = () => setShowData(showData => !showData)

  return (
    <div className={styles._panel}>

      <div className={styles._rowTitle} onClick={changeStatus}>

        <div className={styles._columnOne} >
          <p className={styles._title}>Historial</p>
        </div>

        <div className={styles._columnTwo}>
          <img src='images/icons/arrow-up.svg' width='20px'></img>
        </div>

      </div>

      <div className={styles._fieldParent}>
        <input
          placeholder='Escribe el número de orden'
          name='search'
          className={styles._searchInput}
        />
        <div className={styles._imageParent} >
          <Search color={'#000000'} />
        </div>
      </div>

      {
        showData &&
        <div className={styles._table}>
          <div className={styles._row}>
            <div>
              <p className={styles._headerText}>Orden</p>
            </div>

            <div >
              <p className={styles._headerText}>Fecha</p>
            </div>

            <div>
              <p className={styles._headerText}>Hora</p>
            </div>

            <div>
              <p className={styles._headerText}>Tu carrito</p>
            </div>
          </div>

          {
            orders.map((item, index) => {
              return (
                <div className={styles._row} key={index}>
                  <div>
                    <p>{item.number}</p>
                  </div>

                  <div>
                    <p>{item.date}</p>
                  </div>
                  <div>
                    <p>{item.hour}</p>
                  </div>

                  <div>
                    <Button color='#000' textColor='#FFF' text='pedidos' height='2rem' method={modalMethod} />
                  </div>
                </div>
              )
            })
          }
        </div>
      }

    </div>
  )

}

export default ResponsiveHistory
