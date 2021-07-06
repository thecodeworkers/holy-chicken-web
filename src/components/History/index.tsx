import { useState } from 'react'
import { Navbar } from '@components'
import Head from 'next/head'
import styles from './styles.module.scss'
import { Chiken } from '@images/resources'

const circles = [0, 1, 2, 3]

const History = ({ data }) => {

  const [currentStep, setCurrentStep] = useState(1)

  return (
    <>
      <Head>
        <title>History</title>
      </Head>
      <Navbar data={data?.header} />
      <div className={styles._parent}>

        <div className={styles._leftSide}>
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
          <div className={styles._line}>
            <div className={styles._pointsParent}>
              <div className={styles._circles}>
                {
                  circles.map((res, index) => {

                    const itemIndex = index + 1
                    return (
                      <div className={itemIndex == currentStep ? styles._circleSelected : styles._circle} key={index}>
                        {

                          itemIndex == currentStep &&
                          <div className={styles._chickenParent}>
                            <Chiken />
                          </div>
                        }
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )

}

export default History
