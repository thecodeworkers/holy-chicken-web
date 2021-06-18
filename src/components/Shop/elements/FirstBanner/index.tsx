import { useState, useEffect } from 'react';
import styles from './styles.module.scss'
import { GeneralCard } from '@components'
import { useRouter } from 'next/router'
import { Search, Filter, LeftArrow } from '@images/icons';
import { paginate } from '@utils'
import { Pagination } from '@components'

const FirstBanner = ({ content, filters }) => {

  const [show, setShow] = useState(false)
  const router = useRouter()
  const perPage = 9
  const [page, setPage] = useState(1)

  const navigation = (route: string) => {
    if (route != router.pathname) router.push(route)
  }

  const showDropDown = () => setShow(show => !show)

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

              {
                filters.map((item, index) => {
                  return (
                    <>
                      {item.id != "dGVybToxNQ==" ?
                        <div className={styles._row} key={index}>
                          <p className={styles._littleTitle}>{item.name}</p>
                          <div className={styles._checkParent}>
                            <input type='radio' className={styles._radioBtn} defaultChecked={false}></input>
                          </div>
                        </div> : null
                      }
                    </>
                  )

                })
              }

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
              <div className={styles._dropDown} onClick={showDropDown} >
                <p className={styles._filterTitle}><strong>Ordernar por</strong></p>
                  <LeftArrow color={'#000000'} />
                  {show &&
                  <div className={styles._drop}>
                    <div className={styles._dropDownContent}>
                      <div className={styles._checkContent}>
                        <div className={styles._checkParent}>
                          <input type='radio' className={styles._radioBtn} defaultChecked={false}></input>
                        </div>
                        <p className={styles._dropTitle}>Destacados</p>
                        </div>
                        <div className={styles._checkContent}>
                        <div className={styles._checkParent}>
                          <input type='radio' className={styles._radioBtn} defaultChecked={false}></input>
                        </div>
                        <p className={styles._dropTitle}>Precio de menor a mayor</p>
                        </div>
                        <div className={styles._checkContent}>
                        <div className={styles._checkParent}>
                          <input type='radio' className={styles._radioBtn} defaultChecked={false}></input>
                        </div>
                        <p className={styles._dropTitle}>Precio de mayor a menor</p>
                    </div>
                    </div>
                  </div>
                }
              </div>

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
                <div className={styles._filterButtonContainer}>
                  <p className={styles._filterTitle}>Filtro</p>
                  <Filter color={'#000000'} />
                </div>
                <div className={styles._dropDown}>
                  <p className={styles._filterTitle}>Ordernar por</p>
                  <LeftArrow color={'#000000'} />
                </div>

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
