import { useState, useEffect } from 'react'
import { Navbar, Button, Footer } from '@components'
import Head from 'next/head'
import styles from './styles.module.scss'
import { Chiken } from '@images/resources'
import { Search } from '@images/icons';
import { OpenModal, OrderModal, ResponsiveHistory } from './elements'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserData } from '@store/actions'

const circles = [
  { label: 'Por entregar' },
  { label: 'Orden en vía' },
  { label: 'Confirmando pago' },
  { label: 'Orden Entregada' }
]

const History = ({ data }) => {
  const dispatch = useDispatch()
  const { auth, resource: { products } } = useSelector((state: any) => state)

  const [currentStep, setCurrentStep] = useState(4)
  const [show, setShow] = useState(false)
  const [showOrder, setShowOrder] = useState(false)
  const [label, setLabel] = useState('Preparando pedido')
  const [currentProduct, setCurrentProduct] = useState([])
  const [historyCopy, setHistoryCopy] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [orderInput, setOrderInput] = useState('')
  const [currentOrder, setCurrentOrder] = useState('')

  const ordersArray = auth?.login?.login?.customer?.orders?.nodes ?? []

  const showModal = () => setShow(show => !show)

  const showOrderModal = (product) => {
    setShowOrder(showOrder => !showOrder)
    if (product) setCurrentProduct(product)
  }

  const changeStep = (step, label) => {
    setCurrentStep(step)
    setLabel(label)
  }

  const parseDate = (date) => {
    const newDate = new Date(date)
    const day = newDate.getDate()
    const month = newDate.getMonth() + 1
    const year = newDate.getFullYear()

    return `${month}/${day}/${year}`
  }

  const parseHour = (date) => {
    const newDate = new Date(date)
    let hours = newDate.getHours()
    let minutes: any = newDate.getMinutes()
    let ampm = hours >= 12 ? 'PM' : 'AM '
    hours = hours % 12
    hours = hours ? hours : 12
    minutes = minutes < 10 ? `0${minutes}` : minutes
    let strTime = `${hours}:${minutes} ${ampm}`
    return strTime
  }

  const search = (event) => {
    const value = event.target.value
    setSearchValue(value)
    const valueLower = value.toLowerCase()
    const result = ordersArray.filter(((item: any) => item.orderNumber.toLowerCase().includes(valueLower)))
    setHistoryCopy(result)
  }

  useEffect(() => {
    if (ordersArray.length) {
      setHistoryCopy(ordersArray)
      setOrderInput(`#${ordersArray[0].orderNumber}`)
      return
    }

    setOrderInput('#000')
  }, [ordersArray])

  const changeOrderInput = (event) => {
    const value = event.target.value
    setOrderInput(value)
    const match = ordersArray.find(element => element.orderNumber == value)
    if (match) setCurrentOrder(match)
  }

  useEffect(()=>{
    dispatch(updateUserData())
  },[])

  return (
    <>
      <Head>
        <title>History</title>
      </Head>
      <Navbar data={data?.header} />
      <div className={styles._parent}>

        <div className={styles._leftSide}>
          <div>
            <div className={styles._infoParent}>
              <ul className={styles._list}>
                <li>Nombre y apellido</li>
                <li>email@email.com</li>
                <li>000-00000000</li>
              </ul>
            </div>

            <div className={styles._orderParent}>
              <p>Orden</p>
              <input
                onChange={changeOrderInput}
                className={styles._input}
                value={orderInput}
              >
              </input>
            </div>
          </div>

          <div className={styles._lineParent}>
            <div className={styles._responsiveChicken}>
              <Chiken id='chicken-one' />
            </div>

            <p className={styles._chickenLabel}>{label}</p>

            <div className={styles._line}>

              <div className={styles._pointsParent}>
                <div className={styles._circles}>
                  {
                    circles.map((res, index) => {

                      const itemIndex = index + 1

                      return (
                        <div key={index}>
                          <div className={itemIndex == currentStep ? styles._circleSelected : styles._circle} onClick={() => changeStep(itemIndex, res.label)}>

                            <div className={styles._labelParent}>
                              <p className={styles._text}>{res.label}</p>
                            </div>

                            {
                              itemIndex == currentStep &&
                              <div className={styles._chickenParent}>
                                <Chiken id='chicken-two' />
                              </div>
                            }
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </div>
          </div>

          <div className={styles._btnParent}>
            <Button color='#000' textColor='#FFF' text='Órdenes Abiertas' method={showModal} />
          </div>
        </div>

        <div className={styles._rightSide}>
          <div className={styles._card}>
            <p className={auth?.isAuth ? styles._cardTitle : styles._cardTitleOpacity}>Historial</p>
            <div className={styles._fieldParent}>
              <input
                placeholder='Escribe el número de orden'
                name='search'
                className={auth?.isAuth ? styles._searchInput : styles._searchInputOpacity}
                readOnly={auth?.isAuth ? false : true}
                value={searchValue}
                onChange={search}
              />
              <div className={styles._imageParent} >
                <Search color={'#000000'} />
              </div>
            </div>

            {
              auth?.isAuth ?
                (<div className={styles._table}>
                  <div className={styles._row}>
                    <div>
                      <p className={styles._headerText}>Orden</p>
                    </div>

                    <div>
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
                    historyCopy.length ?
                      historyCopy.map((item, index) => {

                        const product = item?.lineItems
                        const total = item.total

                        return (
                          <div className={styles._row} key={index}>
                            <div>
                              <p>{`#${item.orderNumber}`}</p>
                            </div>

                            <div>
                              <p>{parseDate(item.date)}</p>
                            </div>
                            <div>
                              <p>{parseHour(item.date)}</p>
                            </div>

                            <div>
                              <Button color='#000' textColor='#FFF' text='pedidos' height='2rem' method={() => showOrderModal( { ...product, total })} />
                            </div>
                          </div>
                        )
                      }) : (
                        <div className={styles._textParent}>
                          <p>No existen registros</p>
                        </div>
                      )
                  }
                </div>) : (
                  <div className={styles._textParent}>
                    <p>Debe iniciar sesión para visualizar su historial</p>
                  </div>
                )
            }

          </div>
        </div>
      </div>

      <div className={styles._panelParent}>
        <ResponsiveHistory modalMethod={showOrderModal} />
      </div>

      <Footer data={data?.footer} content={data?.socialNetworks} />
      <OpenModal show={show} method={showModal} />
      <OrderModal show={showOrder} method={showOrderModal} data={currentProduct} />
    </>
  )
}

export default History
