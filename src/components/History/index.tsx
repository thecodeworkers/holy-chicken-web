import { useState, useEffect } from 'react'
import { Navbar, Button, Footer } from '@components'
import Head from 'next/head'
import styles from './styles.module.scss'
import { Chiken } from '@images/resources'
import { Search } from '@images/icons';
import { OpenModal, OrderModal, ResponsiveHistory } from './elements'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserData } from '@store/actions'
import { parseDate, parseHour } from './functions'

const circles = [
  { label: 'Confirmando pago', value: 1 },
  { label: 'Por entregar', value: 2 },
  { label: 'Orden en vía', value: 3},
  { label: 'Orden Entregada', value: 4 }
]

const trackStatus = {
  making: 2,
  forShipping: 2,
  delivered: 3,
  processing: 1,
  received: 4
}

const History = ({ data }) => {
  const dispatch = useDispatch()
  const { auth, resource: { products }, guest: { tmpOrders } } = useSelector((state: any) => state)

  const [currentStep, setCurrentStep] = useState(1)
  const [show, setShow] = useState(false)
  const [showOrder, setShowOrder] = useState(false)
  const [label, setLabel] = useState('Preparando pedido')
  const [currentProduct, setCurrentProduct] = useState([])
  const [historyCopy, setHistoryCopy] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [orderInput, setOrderInput] = useState('')
  const [currentOrder, setCurrentOrder] = useState<any>({})

  const ordersArray = auth?.login?.login?.customer?.orders?.nodes
    ? auth?.login?.login?.customer?.orders?.nodes
    : tmpOrders?.orders?.nodes?.product
      ? tmpOrders?.orders?.nodes?.product
      : []

  const user = auth?.login?.login

  const userInfo = user?.user
  const phone = user?.customer?.billing?.phone

  const showModal = () => setShow(show => !show)

  const showOrderModal = (product) => {
    setShowOrder(showOrder => !showOrder)
    if (product) setCurrentProduct(product)
  }

  const changeStep = (step, label) => {
    setCurrentStep(step)
    setLabel(label)
  }

  const search = (event) => {
    const value = event.target.value
    setSearchValue(value)
    const valueLower = value.toLowerCase()
    const newOrdersArray = filterOrders()
    const result = newOrdersArray.filter(((item: any) => item.orderNumber.toLowerCase().includes(valueLower)))
    setHistoryCopy(result)
  }

  useEffect(() => {
    if (ordersArray.length) {
      const newOrdersArray = filterOrders()

      setHistoryCopy(newOrdersArray)
      setOrderInput(`#${ordersArray[0].orderNumber}`)
      setCurrentOrder(ordersArray[0])
      return
    }

    setOrderInput('000')
  }, [ordersArray])

  const changeOrderInput = (event) => {
    const value = event.target.value
    setOrderInput(value)
    const match = ordersArray.find(element => element.orderNumber == value)

    if (match) setCurrentOrder(match)
  }

  useEffect(() => {
    updateOrders()
  }, [])

  const updateOrders = () => dispatch(updateUserData())

  const filterOrders = () => {
    const newOrdersArray = ordersArray.filter(order => {
      const status = order.status.toLowerCase()
      return status != 'pending' && status != 'processing'
    })

    return newOrdersArray
  }

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
                <li>{userInfo?.firstName} {userInfo?.lastName}</li>
                <li>{userInfo?.email}</li>
                <li>{phone}</li>
              </ul>
            </div>

            <div className={styles._orderRefreshParent}>
              <div className={styles._orderParent}>
                <p>Orden</p>
                <input
                  onChange={changeOrderInput}
                  className={styles._input}
                  value={orderInput}
                  readOnly={true}
                >
                </input>
              </div>

              <div className={styles._refreshImgParent}>
              <img
                src="/images/icons/refresh.png"
                alt=""
                width={20}
                height={20}
                onClick={() => updateOrders()}
              />
              </div>
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
                      let trustedCurrentStep = trackStatus[currentOrder?.trackOrder?.step || 'processing'];

                      console.log(trustedCurrentStep)

                      if (currentOrder?.metaData) {
                        const metadata = currentOrder?.metaData
                        const step = metadata.find(_ => _.key == 'step')

                        console.log(currentOrder)

                        trustedCurrentStep = trackStatus[step?.value || 'processing']
                      }

                      return (
                        <div key={index}>
                          <div className={itemIndex == trustedCurrentStep ? styles._circleSelected : styles._circle} onClick={() => {
                            // changeStep(itemIndex, res.label)
                          }}>

                            <div className={styles._labelParent}>
                              <p className={styles._text}>{res.label}</p>
                            </div>

                            {
                              itemIndex == trustedCurrentStep &&
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
            <Button color='#000' textColor='#FFF' text='Órdenes Abiertas' method={showModal} flag />

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
                              <Button color='#000' textColor='#FFF' text='pedidos' height='2rem' method={() => showOrderModal({ ...product, total })} />
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
      <OpenModal show={show} method={showModal} data={ordersArray} />
      <OrderModal show={showOrder} method={showOrderModal} data={currentProduct} />
    </>
  )
}

export default History
