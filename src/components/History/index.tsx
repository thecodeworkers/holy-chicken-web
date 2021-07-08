import { useState } from 'react'
import { Navbar, Button, Footer } from '@components'
import Head from 'next/head'
import styles from './styles.module.scss'
import { Chiken } from '@images/resources'
import { Search } from '@images/icons';
import { OpenModal } from './elements'

const circles = [
  { label: 'Preparando pedido' },
  { label: 'Por entregar' },
  { label: 'Orden en vía' },
  { label: 'Orden Entregada' }
]

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

const History = ({ data }) => {

  const [ currentStep, setCurrentStep ] = useState(4)
  const [ show, setShow ] = useState(false)

  const showModal = () => setShow(show => !show)

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
              <input className={styles._input} readOnly value='#000'></input>
            </div>
          </div>

          <div className={styles._lineParent}>
            <div className={styles._line}>
              <div className={styles._pointsParent}>
                <div className={styles._circles}>
                  {
                    circles.map((res, index) => {

                      const itemIndex = index + 1

                      return (
                        <>
                          <div className={itemIndex == currentStep ? styles._circleSelected : styles._circle} key={index}>

                            <div className={styles._labelParent}>
                              <p className={styles._text}>{res.label}</p>
                            </div>

                            {
                              itemIndex == currentStep &&
                              <div className={styles._chickenParent}>
                                <Chiken />
                              </div>
                            }
                          </div>
                        </>
                      )
                    })
                  }
                </div>
              </div>
            </div>
          </div>

          <div className={styles._btnParent}>
            <Button color='#000' textColor='#FFF' text='Órdenes Abiertas' />
          </div>
        </div>

        <div className={styles._rightSide}>
          <div className={styles._card}>
            <p className={styles._cardTitle}>Historial</p>
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
                        <Button color='#000' textColor='#FFF' text='pedidos' height='2rem' method={showModal} />
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>

      <Footer data={data?.footer} content={data?.socialNetworks}  />
      <OpenModal show={show} method={showModal}/>
    </>
  )

}

export default History
