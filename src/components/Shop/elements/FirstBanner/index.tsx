import { useState, useEffect } from 'react';
import styles from './styles.module.scss'
import { GeneralCard } from '@components'
import { useRouter } from 'next/router'
import { Search } from '@images/icons';

const FirstBanner = ({ content }) => {

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
          <div className={styles._container}>
            <div className={styles._row}>
              <p className={styles._littleTitle}>Desayunos</p>
              <div className={styles._checkParent}>
                <input type='radio' className={styles._radioBtn} defaultChecked={false}></input>
              </div>
            </div>
            <div className={styles._row}>
              <p className={styles._littleTitle}>Holy Sánduches</p>
              <div className={styles._checkParent}>
                <input type='radio' className={styles._radioBtn} defaultChecked={false}></input>
              </div>
            </div>
            <div className={styles._row}>
              <p className={styles._littleTitle}>Holy Tenders</p>
              <div className={styles._checkParent}>
                <input type='radio' className={styles._radioBtn} defaultChecked={false}></input>
              </div>
            </div>
            </div>
          </div>
          <div className={styles._productContainer}>
            <div className={styles._searchContainer}>
            <div className={styles._inputParent}>
              <input
                placeholder='Pide tu deseo…'
                name='search'
                className={styles._input} />
              <div className={styles._imageParent} >
                <Search color={'#000000'} />
              </div>
            </div>
            <div className={styles._dropDown}>
              <p>Ordernar por</p>
            </div>
            </div>
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
