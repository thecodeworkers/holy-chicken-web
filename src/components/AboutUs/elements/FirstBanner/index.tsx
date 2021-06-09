import { useState, useEffect } from 'react';
import styles from './styles.module.scss'
import { GeneralCard, Button, Stepper } from '@components'
import { useRouter } from 'next/router'
import { Timeline } from 'antd';

const FirstBanner = ({ data }) => {

  const router = useRouter()
  const navigation = (route: string) => {
    if (route != router.pathname) router.push(route)
  }

  return (

    <div className={styles._content}>
      <div className={styles._road}>

        {
          data?.road.map((item, index) => {

            return (
              <div  key={index}>
                 <div className={index === 0 ? styles._lineFather : styles._lineFatherTwo}>
                  <div className={index === 0 ? styles._line : styles._linetwo}> </div>
                </div>

                {index % 2 == 0 ?

                  <div className={styles._leftHistory}>


                    <div className={styles._imageLeftContainer}>
                      <img className={styles._image} src={item?.image.mediaItemUrl} />
                    </div>

                    <div className={styles._textLeftContainer}>
                      {index == 0 ? <p className={styles._title}>{data.title}</p> : null}
                      <p className={styles._textContent}>{item?.content}</p>
                    </div>
                  </div>

                  :

                  <div className={styles._rightHistory}>
                    <div className={styles._textRightContainer}>
                      <p className={styles._textContent}>{item?.content}</p>
                    </div>

                    <div className={styles._imageRightContainer}>
                      <img className={styles._image} src={item?.image.mediaItemUrl} />
                    </div>
                  </div>

                }

              </div>
            )
          }
          )
        }
      </div>
    </div>
  )
}

export default FirstBanner
