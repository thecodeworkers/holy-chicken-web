import React, { useState } from 'react';
import styles from './styles.module.scss'

const Item = ({ setFilter, item }) => {
  const [checked, setChecked] = useState(false)
  return (
    <div className={styles._row} onClick={() => {
      setFilter(!checked, 'categories', item.slug)
      setChecked(!checked)
    }}>
      <p className={styles._littleTitle}>{item.name}</p>
      <div className={styles._checkParent} >
        <input type='checkbox'
          className={styles._radioBtn} checked={checked} readOnly                               >
        </input>
      </div>
    </div>
  )
}

export default Item
