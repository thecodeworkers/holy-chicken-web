import { useState } from 'react';
import styles from './styles.module.scss'
import { useRouter } from 'next/router'
import { LeftArrow, DownArrow} from '@images/icons';
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
                {!show ? <LeftArrow color={'#000000'}/> : <DownArrow color={'#000000'}/>}
                </div>
                  {show ?
                  <div className={styles._drop}>
                    <div className={styles._dropDownContent}>
                      <div className={styles._checkContent}>
                        <div className={styles._checkParent}>
                          <input type='checkbox'  onClick={()=> sortBy('desc')} className={styles._radioBtn} defaultChecked={false}></input>
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
                  : null
                }
              </div>
  )
}

export default DropDownFilter
