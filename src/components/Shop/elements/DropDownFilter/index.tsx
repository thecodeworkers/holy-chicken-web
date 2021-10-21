import { useState } from 'react';
import styles from './styles.module.scss'
import { LeftArrow, DownArrow } from '@images/icons';
import { orderProducts } from '@store/actions'
import { useDispatch } from 'react-redux'

const DropDownFilter = ({ }) => {

  const [show, setShow] = useState(false)
  const dispatch = useDispatch()

  const [checked, setChecked] = useState(2)


  const sortBy = (value, checkNumber) => {
    setChecked(checkNumber)
    dispatch(orderProducts(value))
  }

  const showDropDown = (event) => {

    const { target } = event
    if (target.id == 'drop' ||
      target.id == 'title' ||
      target.id == 'left-arrow' ||
      target.id == 'down-arrow') {
      setShow(show => !show)
    }

  }

  return (
    <div className={styles._dropDown} onClick={showDropDown} id={'drop'} >
      <p className={styles._filterTitle} ><strong id={'title'}>Ordenar por</strong></p>
      <div className={styles._arrowContainer} >
        {!show ? <LeftArrow id={'left-arrow'} color={'#000000'}/> :  <DownArrow  id={'down-arrow'} color={'#000000'}/>}
      </div>
      {show ?
        <div className={styles._drop}>
          <div className={styles._dropDownContent}>
            <label className={styles._checkContent} htmlFor='outstanding'>
              <div className={styles._checkParent}>
                <input type='checkbox' name='outstanding' id='outstanding' checked={ checked == 1 ? true : false } onClick={() => sortBy('outstanding', 1)} className={styles._radioBtn}></input>
              </div>
              <p className={styles._dropTitle}>Destacados</p>
            </label>
            <label className={styles._checkContent} htmlFor='lowestCost'>
              <div className={styles._checkParent}>
                <input type='checkbox' name='lowestCost' id='lowestCost' checked={ checked == 2 ? true : false } onClick={() => sortBy('lowestCost', 2)}  className={styles._radioBtn} ></input>
              </div>
              <p className={styles._dropTitle}>Precio de menor a mayor</p>
            </label>
            <label className={styles._checkContent} htmlFor='highestCost'>
              <div className={styles._checkParent}>
                <input type='checkbox' name='highestCost' id='highestCost' checked={ checked == 3 ? true : false }onClick={() => sortBy('highestCost', 3)} className={styles._radioBtn}></input>
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
