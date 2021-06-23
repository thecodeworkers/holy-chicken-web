import {useEffect } from 'react';
import styles from './styles.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { wrapper } from '@store'
import { getResources, setProductFilter } from '@store/actions'

const SideFilter = () => {

  const { resource: { productCategories }} = useSelector((state: any) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setProductFilter({ categories: [] }))
  }, [])

  const setFilter = (checked, type, value) => {
    const data = productCategories
    if (checked) data[type].push(value)
    if (!checked) data[type].splice(data[type].indexOf(value), 1)
    dispatch(setProductFilter(data))
  }

  const { resource: { productsCategories } } = useSelector((state: any) => state)
  return (
    <div className={styles._container}>
      {
        productsCategories.map((item, index) => {
          return (
            <div className={styles._row} key={index}>
              <p className={styles._littleTitle}>{item.name}</p>
              <div className={styles._checkParent} onClick={(check) => { setFilter(check, 'categories', item.slug) }}>
                <input type='radio' className={styles._radioBtn} defaultChecked={false}></input>
              </div>
            </div>
          )
        })
      }
    </div>

  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  ({ store }) => store.dispatch(getResources())
)

export default SideFilter
