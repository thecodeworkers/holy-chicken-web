import { useState } from 'react';
import styles from './styles.module.scss'
import { GeneralCard, IndividualProductModal } from '@components'
import { useRouter } from 'next/router'
import { Search, Filter } from '@images/icons';
import { paginate } from '@utils'
import { Pagination } from '@components'
import DropDownFilter from '../DropDownFilter';
import SideFilter from '../SideFilter';
import SideFilterMenu from '../SideFilterMenu';
import { useDispatch } from 'react-redux'
import { searchProducts, setShowModal, setCurrentProduct, resetStore } from '@store/actions'

const FirstBanner = ({ content, backup, reference}: any) => {

  const dispatch = useDispatch()
  const router = useRouter()
  const perPage = 12
  const [page, setPage] = useState(1)
  const [show, setShow] = useState(0)
  const [searchValue, setSearchValue] = useState('')

  const navigation = (route: string) => {
    if (route != router.pathname) router.push(route)
  }

  const deployMenu = () => {
    if (show === 0) return setShow(1)
    if (show === 1) return setShow(2)
    if (show === 2) return setShow(1)
  }

  const search = (event) => {
    const value = event.target.value
    setSearchValue(value)
    const valueLower = value.toLowerCase();
    const result = content.filter(((item: any) => item.name.toLowerCase().includes(valueLower)))
    dispatch(searchProducts({ shop: result }))
    setPage(1)
  }

  const openIndividualModal = (item: any) => {
    dispatch(setShowModal({ individualProductModal: true }))
    dispatch(setCurrentProduct({ currentProduct: item }))
    dispatch(resetStore())
  }

  return (
    <>
      <div className={styles._content}ref={reference}>
        <div className={styles._main} >
          <div className={styles._header}>
            <p className={styles._title}>Bienvenido al cielo</p>
            <p className={styles._subtitle}>Arma tu pedacito de cielo como tú quieras.</p>
          </div>

          <div className={styles._shopContainer}>
            <div className={styles._filterContainer}>
              <SideFilter />
            </div>
            <SideFilterMenu show={show} method={deployMenu} />
            <div className={styles._productContainer}>
              <div className={styles._searchContainer}>
                <div className={styles._inputParent}>
                  <input
                    placeholder='Pide tu deseo…'
                    name='search'
                    className={styles._input}
                    value={searchValue}
                    onChange={search}
                  />
                  <div className={styles._imageParent} >
                    <Search color={'#000000'} />
                  </div>
                </div>
                <DropDownFilter />
              </div>
              <div className={styles._responsive}>
                <div className={styles._inputContainer}>
                  <div className={styles._inputParent}>
                    <input
                      placeholder='Pide tu deseo…'
                      name='search'
                      className={styles._input} />
                    <div className={styles._imageParent} >
                      <Search color={'#000000'} />
                    </div>
                  </div>
                </div>
                <div className={styles._filter}>
                  <div className={styles._filterButtonContainer} onClick={deployMenu} >
                    <p className={styles._filterTitle}>Filtro</p>
                    <Filter color={'#000000'} />
                  </div>
                  <DropDownFilter />
                </div>
              </div>

              {
                backup.length ?
                  <div className={styles._cardContainer}>
                    {
                      paginate(backup, page, perPage).map((item, index) => {
                        return (
                          <div
                            className={item.stockStatus == 'OUT_OF_STOCK' ? styles._cardDisabled : styles._card}
                            key={index}
                            onClick={() => item.stockStatus === 'OUT_OF_STOCK' ? null : openIndividualModal(item)}>
                            <GeneralCard
                              name={item?.name}
                              image={item.image?.mediaItemUrl}
                              description={item?.description}
                              price={item?.price?.includes('-') ? item?.price?.split('-')[0] : item?.price}
                              hot={item?.spicy?.isSpicy}
                            />
                          </div>
                        )
                      })
                    }
                  </div> : (
                    <div className={styles._emptyMessage}>
                      <p>Su busqueda no coindice con ningún producto</p>
                    </div>
                  )
              }

              <div className={styles._paginationContainer}>
                {
                  backup.length ? (
                    <Pagination currentPage={page} items={backup} perPage={perPage} changePage={setPage} />
                  ) : null
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
