import { useState, useEffect } from 'react';
import styles from './styles.module.scss'
import { GeneralCard } from '@components'
import { useRouter } from 'next/router'

const FirstBanner = ({content }) => {

  const router = useRouter()


  const navigation = (route: string) => {
    if (route != router.pathname) router.push(route)
  }

  return (
    <div className={styles._content}>
      <div className={styles._main}>
        <div className={styles._header}>
          <p className={styles._title}>Bienvenido al cielo</p>
          <p className={styles._subtitle}>Arma tu pedacito de cielo como tú quieras.</p>
        </div>

        <div className={styles._shopContainer}>
          <div className={styles._filterContainer}>
            <p>filtro</p>
          </div>
          <div className={styles._productContainer}>
            <div className={styles._cardContainer}>
            {
                content.map((item, index) => {
                  return (
                    <div className={styles._card} key={index}>
                      <GeneralCard
                        name={item?.name}
                        image={item.image?.mediaItemUrl}
                        description={item?.description}
                        price={item?.price} />
                    </div>
                  )

                })
              }
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default FirstBanner
