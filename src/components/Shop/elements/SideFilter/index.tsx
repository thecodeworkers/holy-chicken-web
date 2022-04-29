import { useEffect } from 'react';
import styles from './styles.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { wrapper } from '@store'
import { getResources, setProductFilter } from '@store/actions'
import Item from './Item';

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

  const orderCategories = (categoryA, categoryB) => {
    const catA = categoryA.slug.split('-')

    const numberA = Number(catA[catA.length - 1])
    const catB = categoryB.slug.split('-')

    const numberB = Number(catB[catB.length - 1])

    return numberA - numberB
  }
  return (
    <div className={styles._container}>
      {
        productsCategories.sort(orderCategories).map((item, index) => {
          return <Item setFilter={setFilter} item={item} key={index} />
        })
      }
    </div>

  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  ({ store }) => store.dispatch(getResources())
)

export default SideFilter
