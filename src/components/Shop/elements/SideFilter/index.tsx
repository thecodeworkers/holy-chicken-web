import styles from './styles.module.scss'
import { useSelector } from 'react-redux'
import { wrapper } from '@store'
import { getResources } from '@store/actions'

const SideFilter = () => {

  const { resource: { productsCategories } } = useSelector((state: any) => state)
  return (
    <div className={styles._container}>
      {
        productsCategories.map((item, index) => {
          return (
            <div className={styles._row} key={index}>
              <p className={styles._littleTitle}>{item.name}</p>
              <div className={styles._checkParent}>
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
