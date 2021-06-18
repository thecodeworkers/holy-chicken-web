import { useState } from 'react';
import styles from './styles.module.scss'
import { useRouter } from 'next/router'
import { LeftArrow } from '@images/icons';


const DropDownFilter = ({ }) => {

  const [show, setShow] = useState(false)
  const router = useRouter()

  const navigation = (route: string) => {
    if (route != router.pathname) router.push(route)
  }

  const showDropDown = () => setShow(show => !show)

  return (
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
  )
}

export default DropDownFilter
