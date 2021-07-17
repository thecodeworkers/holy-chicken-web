import { useEffect } from 'react';
import styles from './styles.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { wrapper } from '@store'
import { getResources, setProductFilter } from '@store/actions'

const SideFilter = () => {

  const { resource: { filter, productsCategories } } = useSelector((state: any) => state)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setProductFilter({ categories: [] }))
  }, [])

  const setFilter = (checked, type, value) => {
    const data = filter
    if (checked) data[type].push(value)
    if (!checked) data[type].splice(data[type].indexOf(value), 1)
    dispatch(setProductFilter(data))
  }

  return (
    <div className={styles._container}>
      {
        productsCategories.map((item, index) => {
          return (
            <div className={styles._row} key={index}>
              <p className={styles._littleTitle}>{item.name}</p>
              <div className={styles._checkParent} >
                <input type='checkbox'
                  onClick={(check) => {
                    setFilter(check.currentTarget.checked,
                      'categories', item.slug)
                  }} className={styles._radioBtn}
                  defaultChecked={false}>
                </input>
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
