import { useState, useEffect } from 'react'
import styles from './styles.module.scss'
import { useSelector } from 'react-redux'
import FormikConfig from './formik'
import { Button } from '@components'
import loadConfig from 'next/dist/next-server/server/config'

const data: Array<any> = [
  {
    name: 'Zelle',
    account_name: 'Holy Chicken LLC',
    email: 'pagos@theholychicken.com'
  },
  {
    name: 'Pago movil',
    phone: '+58 414-8065668',
    bank_name: 'Banco mercantil',
    identification: 'J500469381',
    email: 'Infoholychicken@gmail.com',
  },
  {
    name: 'Transferencia',
    account_name: 'Grupo Holy Foods, C.A.',
    bank_name: 'Banco mercantil',
    account_number: '01050014111014703344',
    identification: 'J500469381',
    email: 'Infoholychicken@gmail.com',
  },
  {
    name: 'Efectivo',
    message: 'En caso de no disponer del monto exacto en efectivo, te ofrecemos las siguientes opciones:',
    advice_one: '1- Recibir vuelto en efectivo, sujeto a nuestra disponibilidad.',
    advice_two: '1- Recibir vuelto en efectivo, sujeto a nuestra disponibilidad.',
  },
  {
    name: 'Tarjeta Internacional',
  },
]
const PaymentMethod = () => {

  const { intermitence: { paymentModal }, resource: { general: { general }, paymentMethods } } = useSelector((state: any) => state)

  console.log(paymentMethods);

  const formik = FormikConfig()
  const { errors, touched } = formik
  const mapedData =  Array.from(Array(data.length).fill(false))
  const [show, setShow]:any = useState(mapedData)

  const [showAddress, setShowAddress] = useState(false)


  const pushDataStatus = (data) => {
    const pushStatus = data.map((res, mapIndex) => {
      return data[mapIndex].status = false
    })
    return data
  }

  const showPicukp = (mapIndex) => {
    let newArray = show
    newArray[mapIndex] = true

    data[mapIndex].status = true
    setShow([false, false, false, false, true])
    //  setShow([...show, show[mapIndex] = true])
  }
  const buildTexts = (data) => {
    const dynamicText = Object.entries(data).map(([key, value]) => {
      if (key != 'name') return value
    })

    dynamicText.splice(0, 1)
    return dynamicText
  }


  useEffect(() => {


  }, [])

  return (
    <>
      <div className={styles._titleParent}>
        <p className={styles._title}>Forma de entrega</p>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className={styles._rightMain}>

          <div className={styles._firstRow}>
            <div className={styles._deliveryType}>
              <p className={styles._deliveryTitle}>Seleccione una opción</p>
              {
                pushDataStatus(data).map((res, mapIndex) => {
                  console.log(data[mapIndex].status, 'RESPUES');

                  return (
                    <div className={styles._radioContainer} key={mapIndex} >
                      <div className={styles._checkParent} >
                        <input type='checkbox'
                          className={styles._radioBtn}
                          checked={show[mapIndex]}
                          onChange={(check) => { showPicukp(mapIndex) }}>
                        </input>
                        <div className={styles._addressDescription}>

                          <p className={styles._radioTitle}>{res.name}</p>
                          {showAddress ?
                            <ul className={styles._list}>
                              {
                                buildTexts(res).map((item: string, index: number) => {
                                  return <li className={styles._listItem} key={index}>{item}</li>
                                })
                              }
                            </ul>
                            : null}
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>

          </div>


          <div className={styles._buttonContainer}>
            <div className={styles._btnParent}>
              <Button
                color='#000'
                text='Ingresar'
                textColor='#FFF'
                type='submit' flag />
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default PaymentMethod
