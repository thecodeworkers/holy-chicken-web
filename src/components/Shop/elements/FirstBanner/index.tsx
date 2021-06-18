import { useState, useEffect } from 'react';
import styles from './styles.module.scss'
import { GeneralCard } from '@components'
import { useRouter } from 'next/router'
import { Search, Filter } from '@images/icons';
import { paginate } from '@utils'
import { Pagination } from '@components'
import  DropDownFilter  from '../DropDownFilter';
import  SideFilter  from '../SideFilter';

const FirstBanner = ({ content }) => {

  const [showSide, setShowSide] = useState(false)
  const router = useRouter()
  const perPage = 9
  const [page, setPage] = useState(1)

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
           <SideFilter />
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
              <DropDownFilter/>
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
              <div className={styles._filtersContainer}>
                <div className={styles._filterButtonContainer} onClick={() => setShowSide(true)}>
                  <p className={styles._filterTitle}>Filtro</p>
                  <Filter color={'#000000'} />
                </div>
                <DropDownFilter/>

              </div>
            </div>
            <div className={styles._cardContainer}>
              {
                paginate(content, page, perPage).map((item, index) => {
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
            <div className={styles._paginationContainer}>
              {
                content.length ? (
                  <Pagination currentPage={page} items={content} perPage={perPage} changePage={setPage} />
                ) : null
              }
            </div>
          </div>

        </div>
      </div>
    </div>



  )
}

export default FirstBanner
