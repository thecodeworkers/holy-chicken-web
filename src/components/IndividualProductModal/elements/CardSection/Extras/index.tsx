import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setExtras, setSelection, setSpecials } from '@store/actions';
import Counter from '../Counter'
import styles from './styles.module.scss'

const CheckBoxes = ({ option, index, nodeIndex, currentSelection, setCurrentSelection }) => {
  const {
    blessing,
    sauce,
    blessingAddons,
    sauceAddons
  } = useSelector((state: any) => state.product)

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

            const currentIndex = currentSelection.findIndex(_ => (_.nodeIndex == nodeIndex && _.index == index))

            if (currentIndex > -1) {
              currentSelection.splice(currentIndex, 1)
              setCurrentSelection(currentSelection)
            } else {
              currentSelection.push({ nodeIndex, index })
              setCurrentSelection(currentSelection)
            }

            if (nodeIndex == 0) {
              if (blessing == 'N/A' && isChecked) {
                dispatch(setSelection({ blessing: currentValue }))
                return
              }

              if (blessing != 'N/A' && !isChecked) {
                if (!blessingAddons.length) {
                  dispatch(setSelection({ blessing: 'N/A' }))
                  return
                }

                const index = blessingAddons.findIndex((addon: any) => addon.extra == currentValue)
                if (index > -1) blessingAddons.splice(index, 1)
                dispatch(setSpecials({ blessingAddons }))

                return
              }

              if (blessing != 'N/A' && isChecked) {
                blessingAddons.push({ extra: currentValue, price: 0.5 })
                dispatch(setSpecials({ blessingAddons }))

                return ;
              }
            }

            if (nodeIndex == 1) {
              if (sauce == 'N/A' && isChecked) {
                dispatch(setSelection({ sauce: currentValue }))
                return
              }

              if (sauce != 'N/A' && !isChecked) {
                if (!sauceAddons.length) {
                  dispatch(setSelection({ sauce: 'N/A' }))
                  return
                }

                const index = sauceAddons.findIndex((addon: any) => addon.extra == currentValue)
                if (index > -1) sauceAddons.splice(index, 1)
                dispatch(setSpecials({ sauceAddons }))

                return
              }

              if (sauce != 'N/A' && isChecked) {
                sauceAddons.push({ extra: currentValue, price: 0.5 })
                dispatch(setSpecials({ sauceAddons }))

                return ;
              }
            }
          }}
        ></input>
        <p>{option}</p>
      </div>
    </div>
  )
}

const Extras = ({ extras }) => {
  const [currentSelection, setCurrentSelection] = useState([])
  const { addons } = useSelector((state: any) => state.product)

  const dispatch = useDispatch();

  return (
    <div className={styles._cardParent}>
      <div>
        <p className={styles._title}>Extras</p>
      </div>

      <div className={styles._webParent}>
        {
          extras.map((node, nodeIndex) => (
            <div key={nodeIndex}>
              <p className={styles._littleTitleCard}>{node?.name}</p>
              {
                node?.options.map((option, index) => {
                  return  (
                    <div key={index} className={styles._row}>
                      {
                        option != 'N/A' ? (
                          <>
                            <CheckBoxes
                              option={option}
                              index={index}
                              nodeIndex={nodeIndex}
                              setCurrentSelection={setCurrentSelection}
                              currentSelection={currentSelection}
                            />
                            <div className={styles._column}>
                              <Counter
                                stock={30}
                                active={currentSelection.some(_ => (_.nodeIndex == nodeIndex && _.index == index))}
                                changeNumber={(action) => {
                                  if (action == 'add') {
                                    addons.push({ extra: option, price: 0.5 })
                                    dispatch(setExtras(addons))
                                  }

                                  if (action == 'remove') {
                                    const index = addons.findIndex((addon: any) => addon.extra == option)
                                    if (index > -1) addons.splice(index, 1)
                                    dispatch(setExtras(addons))
                                  }
                                }}
                              />
                            </div>

                            <div className={styles._column}>
                              <div className={styles._priceParent}>
                                <p>$0.50</p>
                              </div>
                            </div>
                          </>
                        ) : null
                      }
                    </div>
                  )
                })
              }

            </div>
          ))
        }
      </div>

      {/* RESPONSIVEEEEEEEEEE */}
      <div className={styles._responsiveParent}>
        {
          extras.map((node, nodeIndex) => (
            <div key={nodeIndex}>
              <p className={styles._littleTitle}>{node?.name}</p>
              {
                node?.options.map((option, index) => (
                  <div key={index} className={styles._responsiveRow}>
                    {
                      option != 'N/A' ? (
                        <>
                          <CheckBoxes
                              option={option}
                              index={index}
                              nodeIndex={nodeIndex}
                              setCurrentSelection={setCurrentSelection}
                              currentSelection={currentSelection}
                            />

                          <div className={styles._newParent}>
                            <div className={styles._column}>
                              <Counter
                                stock={30}
                                active={currentSelection.some(_ => (_.nodeIndex == nodeIndex && _.index == index))}
                                changeNumber={(action) => {
                                  if (action == 'add') {
                                    addons.push({ extra: option, price: 0.5 })
                                    dispatch(setExtras(addons))
                                  }

                                  if (action == 'remove') {
                                    const index = addons.findIndex((addon: any) => addon.extra == option)
                                    if (index > -1) addons.splice(index, 1)
                                    dispatch(setExtras(addons))
                                  }
                                }}
                              />
                            </div>

                            <div className={styles._column}>
                              <div className={styles._priceParentReponsive}>
                                <p>$0.50</p>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : null
                    }
                  </div>
                ))
              }
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Extras
