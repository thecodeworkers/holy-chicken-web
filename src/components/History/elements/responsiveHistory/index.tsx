import { useState, useEffect } from 'react'
import styles from './styles.module.scss'
import { Search } from '@images/icons'
import { Button } from '@components'
import { useSelector } from 'react-redux'
import { parseHour, parseDate } from '../../functions'

const ResponsiveHistory = ({ modalMethod }) => {

  const { auth, guest: { tmpOrders } } = useSelector((state: any) => state)

  const ordersArray = auth?.login?.login?.customer?.orders?.nodes
                        ? auth?.login?.login?.customer?.orders?.nodes
                        : tmpOrders?.orders?.nodes
                        ? tmpOrders?.orders?.nodes
                        : []

  const [showData, setShowData] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [historyCopy, setHistoryCopy] = useState([])

  const changeStatus = () => setShowData(showData => !showData)

  const search = (event) => {

    const value = event.target.value
    if(!value.length) setHistoryCopy(ordersArray)
    setSearchValue(value)
    const valueLower = value.toLowerCase()
    const result = ordersArray.filter(((item: any) => item.orderNumber.toLowerCase().includes(valueLower)))
    setHistoryCopy(result)
  }

  useEffect(() => {
    if (ordersArray.length) setHistoryCopy(ordersArray)
  }, [ordersArray])

  return (
    <div className={styles._panel}>

      <div className={auth?.isAuth ? styles._rowTitle : styles._rowTitleOpacity} onClick={auth?.isAuth && changeStatus}>

        <div className={styles._columnOne} >
          <p className={styles._title}>Historial</p>
        </div>

        <div className={styles._columnTwo}>
          <div className={!showData ? styles._arrowParent : styles._downArrow}>
            <img src='images/icons/arrow-up.svg' width='20px'></img>
          </div>
        </div>

      </div>

      <div className={auth?.isAuth && ordersArray.length ? styles._fieldParent : styles._fieldParentOpacity}>
        <input
          placeholder='Escribe el número de orden'
          name='search'
          className={styles._searchInput}
          onChange={search}
          value={searchValue}
          readOnly={auth?.isAuth && ordersArray.length ? false : true }
        />
        <div className={styles._imageParent} >
          <Search color={'#000000'} />
        </div>
      </div>

      {
        auth?.isAuth ?
          <div className={styles._table}>
            {
              showData &&
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
            }

            {
              showData && historyCopy.length ?
                historyCopy.map((item, index) => {

                  const product = item?.lineItems
                  return (
                    <div className={styles._row} key={index}>
                      <div>
                        <p>{item?.orderNumber}</p>
                      </div>

                      <div>
                        <p>{parseDate(item?.date)}</p>
                      </div>
                      <div>
                        <p>{parseHour(item?.date)}</p>
                      </div>

                      <div>
                        <Button color='#000' textColor='#FFF' text='pedidos' height='2rem' method={() => modalMethod(product)} />
                      </div>
                    </div>
                  )
                }) : ( <div className={styles._textParent}>
                   { showData && <p>No existen registros</p> }
                </div> )
            }
          </div> : (
          <div className={styles._textParent}>
            <p>Debe iniciar sesión para visualizar su historial</p>
          </div> )
      }

    </div>
  )

}

export default ResponsiveHistory
