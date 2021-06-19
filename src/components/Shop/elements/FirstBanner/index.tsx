import { useState, useEffect } from 'react';
import styles from './styles.module.scss'
import { GeneralCard } from '@components'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { setShowModal, setCurrentProduct } from '@store/actions'
import { IndividualProductModal } from '@components'

const FirstBanner = ({ content }) => {

  const router = useRouter()
  const dispatch = useDispatch()

  const { cart } = useSelector((state: any) => state)

  const navigation = (route: string) => {
    if (route != router.pathname) router.push(route)
  }

  const openIndividualModal = (item: any) =>  {

    console.log(item)
    dispatch(setShowModal({ individualProductModal: true }))
    dispatch(setCurrentProduct({ currentProduct: item }))
  }

  // useEffect(() => {
  //   console.log(cart)
  // }, [])

  return (
    <>
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
                    <div className={styles._card} key={index} onClick={() => openIndividualModal(item)}>
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
    <IndividualProductModal />
    </>
  )
}

export default FirstBanner
