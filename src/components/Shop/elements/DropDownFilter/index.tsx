import { useState } from 'react';
import styles from './styles.module.scss'
import { useRouter } from 'next/router'
import { LeftArrow, DownArrow } from '@images/icons';
import { orderProducts } from '@store/actions'
import { useDispatch } from 'react-redux'

const DropDownFilter = ({ }) => {

  const [show, setShow] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()

  const navigation = (route: string) => {
    if (route != router.pathname) router.push(route)
  }

  const sortBy = (value) => {
    dispatch(orderProducts(value))
  }

  const showDropDown = () => setShow(show => !show)

  return (
    <div className={styles._dropDown} onClick={showDropDown} >
      <p className={styles._filterTitle}><strong>Ordenar por</strong></p>
      <div className={styles._arrowContainer}>
        {!show ? <LeftArrow color={'#000000'} /> : <DownArrow color={'#000000'} />}
      </div>
      {show ?
        <div className={styles._drop}>
          <div className={styles._dropDownContent}>
            <label className={styles._checkContent} htmlFor='outstanding'>
              <div className={styles._checkParent}>
                <input type='checkbox' name='outstanding' id='outstanding' onClick={() => sortBy('outstanding')} className={styles._radioBtn}></input>
              </div>
              <p className={styles._dropTitle}>Destacados</p>
            </label>
            <label className={styles._checkContent} htmlFor='lowestCost'>
              <div className={styles._checkParent}>
                <input type='checkbox' name='lowestCost' id='lowestCost' onClick={() => sortBy('lowestCost')} className={styles._radioBtn} ></input>
              </div>
              <p className={styles._dropTitle}>Precio de menor a mayor</p>
            </label>
            <label className={styles._checkContent} htmlFor='highestCost'>
              <div className={styles._checkParent}>
                <input type='checkbox' name='highestCost' id='highestCost' onClick={() => sortBy('highestCost')} className={styles._radioBtn}></input>
              </div>
              <p className={styles._dropTitle}>Precio de mayor a menor</p>
            </label>
          </div>
        </div>
        : null
      }
    </div>
  )
}

export default DropDownFilter
