import { useState, useEffect } from 'react';
import styles from './styles.module.scss'
import { GeneralCard, Button, Stepper } from '@components'

const SecondBanner = ({ data }) => {

  console.log(data);
  const locations = data?.locations
  const times = data?.schedules?.times
  return (
    <div className={styles._content}>

      <p className={styles._blackTitle}>{data?.title}</p>

      <p className={styles._blackSubtitle}>{data?.subtitle}</p>

      <div className={styles._addressContainer}>
        <div className={styles._address}>

          {
            locations.map((item, index) => {
              return (
                <div className={styles._locate} key={index}>
                  <p className={styles._title}>{item?.title}</p>

                  <p className={styles._subtitle}>{item?.address}</p>
                </div>

              )
            }
            )}

        </div>
        <div className={styles._address}>
          <p className={styles._title}>{data?.email?.title}</p>
          <p className={styles._subtitle}>{data?.email?.content}</p>
        </div>
        <div className={styles._address}>
          <p className={styles._title}>{data?.phone?.title}</p>
          <p className={styles._subtitle}>{data?.phone?.content}</p>
        </div>
        <div className={styles._address}>
          <p className={styles._title}>{data?.schedules?.title}</p>
          {
            times.map((item, index) => {
              return (
                <div className={styles._times} key={index}>
                  <p className={styles._subtitle}>{item?.day}</p>

                  <p className={styles._subtitle}>{item?.hour}</p>
                </div>

              )
            }
            )}
        </div>
      </div>
      <div className={styles._buttonContainer} >
      <Button color='#FD8C2E' textColor='white' text={data.button.title}></Button>
      </div>

    </div>




  )
}

export default SecondBanner
