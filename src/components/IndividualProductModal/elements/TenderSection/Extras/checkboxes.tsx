import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTenderExtras, setTenderSelection } from '@store/actions';
import Counter from '../Counter'
import styles from './styles.module.scss'


const CheckBoxes = ({ option, index, currentSelection, setCurrentSelection }) => {

  const { currentExtra, tenderExtras } = useSelector((state: any) => state.tenderProduct)
  const dispatch = useDispatch();

  return (
    <div className={styles._column}>
      <div className={styles._checkParent}>
        <input
          type='checkbox'
          className={styles._radioBtn}
          value={option}
          onChange={(event) => {
            const target = event.target
            const isChecked = target.checked
            const currentValue = target.value

            const currentIndex = currentSelection.findIndex(_ => _.index == index)

            if (currentIndex > -1) {
              currentSelection.splice(currentIndex, 1)
              setCurrentSelection(currentSelection)
            } else {
              currentSelection.push({ index })
              setCurrentSelection(currentSelection)
            }

            if (currentExtra == 'N/A' && isChecked) {
              dispatch(setTenderSelection({ currentExtra: currentValue }))


              if (currentExtra != 'N/A' && !isChecked) {
                if (!tenderExtras.length) {
                  dispatch(setTenderSelection({ currentExtra: 'N/A' }))
                  return
                }
              }
            }
          }}
        ></input>
        <p>{option}</p>
      </div>
    </div>
  )
}

export default CheckBoxes
