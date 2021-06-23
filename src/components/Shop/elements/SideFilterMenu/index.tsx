import styles from './styles.module.scss'
import { useSelector } from 'react-redux'
import { wrapper } from '@store'
import { getResources } from '@store/actions'
import { Button } from '@components'
import { useState } from 'react'

const SideFilter = ({ show = 0, method}) => {


  const assignClass = () => {
    if (show === 0) return styles._mainStatic
    if (show === 1) return styles._mainIn
    if (show === 2) return styles._mainOut
  }


  const { resource: { productsCategories } } = useSelector((state: any) => state)
  return (
    <div className={assignClass()}>
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
        <div className={styles._btnParent} onClick={method}>
          <Button color='#000000' textColor='white' text={'Continuar'}></Button>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  ({ store }) => store.dispatch(getResources())
)

export default SideFilter
